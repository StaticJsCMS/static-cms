import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';

import { APIError, localForage, readFile, throwOnConflictingBranches } from '../../lib/util';
import API, { API_NAME } from './API';
import introspectionQueryResultData from './fragmentTypes';
import * as mutations from './mutations';
import * as queries from './queries';

import type { NormalizedCacheObject } from 'apollo-cache-inmemory';
import type { MutationOptions, OperationVariables, QueryOptions } from 'apollo-client';
import type { BlobArgs, Config } from './API';

const NO_CACHE = 'no-cache';
const CACHE_FIRST = 'cache-first';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

interface TreeEntry {
  object?: {
    entries: TreeEntry[];
  };
  type: 'blob' | 'tree';
  name: string;
  sha: string;
  blob?: {
    size: number;
  };
}

interface TreeFile {
  path: string;
  id: string;
  size: number;
  type: string;
  name: string;
}

export default class GraphQLAPI extends API {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(config: Config) {
    super(config);

    this.client = this.getApolloClient();
  }

  getApolloClient() {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...headers,
          authorization: this.token ? `token ${this.token}` : '',
        },
      };
    });
    const httpLink = createHttpLink({ uri: `${this.apiRoot}/graphql` });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({ fragmentMatcher }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: NO_CACHE,
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: NO_CACHE,
          errorPolicy: 'all',
        },
      },
    });
  }

  reset() {
    return this.client.resetStore();
  }

  async getRepository(owner: string, name: string) {
    const { data } = await this.query({
      query: queries.repository,
      variables: { owner, name },
      fetchPolicy: CACHE_FIRST, // repository id doesn't change
    });
    return data.repository;
  }

  query(options: QueryOptions<OperationVariables>) {
    return this.client.query(options).catch(error => {
      throw new APIError(error.message, 500, 'GitHub');
    });
  }

  async mutate(options: MutationOptions<OperationVariables>) {
    try {
      const result = await this.client.mutate(options);
      return result;
    } catch (error: any) {
      const errors = error.graphQLErrors;
      if (Array.isArray(errors) && errors.some(e => e.message === 'Ref cannot be created.')) {
        const refName = options?.variables?.createRefInput?.name || '';
        const branchName = trimStart(refName, 'refs/heads/');
        if (branchName) {
          await throwOnConflictingBranches(branchName, name => this.getBranch(name), API_NAME);
        }
      }
      throw new APIError(error.message, 500, 'GitHub');
    }
  }

  async hasWriteAccess() {
    const { repoOwner: owner, repoName: name } = this;
    try {
      const { data } = await this.query({
        query: queries.repoPermission,
        variables: { owner, name },
        fetchPolicy: CACHE_FIRST, // we can assume permission doesn't change often
      });
      // https://developer.github.com/v4/enum/repositorypermission/
      const { viewerPermission } = data.repository;
      return ['ADMIN', 'MAINTAIN', 'WRITE'].includes(viewerPermission);
    } catch (error: any) {
      console.error('Problem fetching repo data from GitHub');
      throw error;
    }
  }

  async user() {
    const { data } = await this.query({
      query: queries.user,
      fetchPolicy: CACHE_FIRST, // we can assume user details don't change often
    });
    return data.viewer;
  }

  async retrieveBlobObject(owner: string, name: string, expression: string, options = {}) {
    const { data } = await this.query({
      query: queries.blob,
      variables: { owner, name, expression },
      ...options,
    });
    // https://developer.github.com/v4/object/blob/
    if (data.repository.object) {
      const { is_binary: isBinary, text } = data.repository.object;
      return { isNull: false, isBinary, text };
    } else {
      return { isNull: true };
    }
  }

  getOwnerAndNameFromRepoUrl(repoURL: string) {
    let { repoOwner: owner, repoName: name } = this;

    if (repoURL === this.originRepoURL) {
      ({ originRepoOwner: owner, originRepoName: name } = this);
    }

    return { owner, name };
  }

  async readFile(
    path: string,
    sha?: string | null,
    {
      branch = this.branch,
      repoURL = this.repoURL,
      parseText = true,
    }: {
      branch?: string;
      repoURL?: string;
      parseText?: boolean;
    } = {},
  ) {
    if (!sha) {
      sha = await this.getFileSha(path, { repoURL, branch });
    }
    const fetchContent = () => this.fetchBlobContent({ sha: sha as string, repoURL, parseText });
    const content = await readFile(sha, fetchContent, localForage, parseText);
    return content;
  }

  async fetchBlobContent({ sha, repoURL, parseText }: BlobArgs) {
    if (!parseText) {
      return super.fetchBlobContent({ sha, repoURL, parseText });
    }
    const { owner, name } = this.getOwnerAndNameFromRepoUrl(repoURL);
    const { isNull, isBinary, text } = await this.retrieveBlobObject(
      owner,
      name,
      sha,
      { fetchPolicy: CACHE_FIRST }, // blob sha is derived from file content
    );

    if (isNull) {
      throw new APIError('Not Found', 404, 'GitHub');
    } else if (!isBinary) {
      return text;
    } else {
      return super.fetchBlobContent({ sha, repoURL, parseText });
    }
  }

  getAllFiles(entries: TreeEntry[], path: string) {
    const allFiles: TreeFile[] = entries.reduce((acc, item) => {
      if (item.type === 'tree') {
        const entries = item.object?.entries || [];
        return [...acc, ...this.getAllFiles(entries, `${path}/${item.name}`)];
      } else if (item.type === 'blob') {
        return [
          ...acc,
          {
            name: item.name,
            type: item.type,
            id: item.sha,
            path: `${path}/${item.name}`,
            size: item.blob ? item.blob.size : 0,
          },
        ];
      }

      return acc;
    }, [] as TreeFile[]);
    return allFiles;
  }

  async listFiles(path: string, { repoURL = this.repoURL, branch = this.branch, depth = 1 } = {}) {
    const { owner, name } = this.getOwnerAndNameFromRepoUrl(repoURL);
    const folder = trim(path, '/');
    const { data } = await this.query({
      query: queries.files(depth),
      variables: { owner, name, expression: `${branch}:${folder}` },
    });

    if (data.repository.object) {
      const allFiles = this.getAllFiles(data.repository.object.entries, folder);
      return allFiles;
    } else {
      return [];
    }
  }

  getBranchQualifiedName(branch: string) {
    return `refs/heads/${branch}`;
  }

  getBranchQuery(branch: string, owner: string, name: string) {
    return {
      query: queries.branch,
      variables: {
        owner,
        name,
        qualifiedName: this.getBranchQualifiedName(branch),
      },
    };
  }

  async getDefaultBranch() {
    const { data } = await this.query({
      ...this.getBranchQuery(this.branch, this.originRepoOwner, this.originRepoName),
    });
    return data.repository.branch;
  }

  async getBranch(branch: string) {
    const { data } = await this.query({
      ...this.getBranchQuery(branch, this.repoOwner, this.repoName),
      fetchPolicy: CACHE_FIRST,
    });
    if (!data.repository.branch) {
      throw new APIError('Branch not found', 404, API_NAME);
    }
    return data.repository.branch;
  }

  async patchRef(type: string, name: string, sha: string) {
    if (type !== 'heads') {
      return super.patchRef(type, name, sha);
    }

    const branch = await this.getBranch(name);
    const { data } = await this.mutate({
      mutation: mutations.updateBranch,
      variables: {
        input: { oid: sha, refId: branch.id },
      },
    });
    return data!.updateRef.branch;
  }

  async getFileSha(path: string, { repoURL = this.repoURL, branch = this.branch } = {}) {
    const { owner, name } = this.getOwnerAndNameFromRepoUrl(repoURL);
    const { data } = await this.query({
      query: queries.fileSha,
      variables: { owner, name, expression: `${branch}:${path}` },
    });

    if (data.repository.file) {
      return data.repository.file.sha;
    }
    throw new APIError('Not Found', 404, API_NAME);
  }
}
