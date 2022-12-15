import flow from 'lodash/flow';
import get from 'lodash/get';
import { dirname } from 'path';
import { parse } from 'what-the-diff';

import {
  APIError,
  basename,
  Cursor,
  localForage,
  readFile,
  readFileMetadata,
  requestWithBackoff,
  responseParser,
  then,
  throwOnConflictingBranches,
  unsentRequest,
} from '@staticcms/core/lib/util';

import type { DataFile, PersistOptions } from '@staticcms/core/interface';
import type { ApiRequest, FetchError } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';

interface Config {
  apiRoot?: string;
  token?: string;
  branch?: string;
  repo?: string;
  requestFunction?: (req: ApiRequest) => Promise<Response>;
  hasWriteAccess?: () => Promise<boolean>;
}

interface CommitAuthor {
  name: string;
  email: string;
}

type BitBucketFile = {
  id: string;
  type: string;
  path: string;
  commit?: { hash: string };
};

type BitBucketSrcResult = {
  size: number;
  page: number;
  pagelen: number;
  next: string;
  previous: string;
  values: BitBucketFile[];
};

type BitBucketUser = {
  username: string;
  display_name: string;
  nickname: string;
  links: {
    avatar: {
      href: string;
    };
  };
};

type BitBucketBranch = {
  name: string;
  target: { hash: string };
};

type BitBucketCommit = {
  hash: string;
  author: {
    raw: string;
    user: {
      display_name: string;
      nickname: string;
    };
  };
  date: string;
};

export const API_NAME = 'Bitbucket';

function replace404WithEmptyResponse(err: FetchError) {
  if (err && err.status === 404) {
    console.info('This 404 was expected and handled appropriately.');
    return { size: 0, values: [] as BitBucketFile[] } as BitBucketSrcResult;
  } else {
    return Promise.reject(err);
  }
}

export default class API {
  apiRoot: string;
  branch: string;
  repo: string;
  requestFunction: (req: ApiRequest) => Promise<Response>;
  repoURL: string;
  commitAuthor?: CommitAuthor;

  constructor(config: Config) {
    this.apiRoot = config.apiRoot || 'https://api.bitbucket.org/2.0';
    this.branch = config.branch || 'main';
    this.repo = config.repo || '';
    this.requestFunction = config.requestFunction || unsentRequest.performRequest;
    // Allow overriding this.hasWriteAccess
    this.hasWriteAccess = config.hasWriteAccess || this.hasWriteAccess;
    this.repoURL = this.repo ? `/repositories/${this.repo}` : '';
  }

  buildRequest = (req: ApiRequest) => {
    const withRoot = unsentRequest.withRoot(this.apiRoot)(req);
    if ('cache' in withRoot) {
      return withRoot;
    } else {
      const withNoCache = unsentRequest.withNoCache(withRoot);
      return withNoCache;
    }
  };

  request = (req: ApiRequest): Promise<Response> => {
    try {
      return requestWithBackoff(this, req);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new APIError(error.message, null, API_NAME);
      }

      throw new APIError('Unknown api error', null, API_NAME);
    }
  };

  responseToJSON = responseParser({ format: 'json', apiName: API_NAME });
  responseToBlob = responseParser({ format: 'blob', apiName: API_NAME });
  responseToText = responseParser({ format: 'text', apiName: API_NAME });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestJSON = (req: ApiRequest) => this.request(req).then(this.responseToJSON) as Promise<any>;
  requestText = (req: ApiRequest) => this.request(req).then(this.responseToText) as Promise<string>;

  user = () => this.requestJSON('/user') as Promise<BitBucketUser>;

  hasWriteAccess = async () => {
    const response = await this.request(this.repoURL);
    if (response.status === 404) {
      throw Error('Repo not found');
    }
    return response.ok;
  };

  getBranch = async (branchName: string) => {
    const branch: BitBucketBranch = await this.requestJSON(
      `${this.repoURL}/refs/branches/${branchName}`,
    );

    return branch;
  };

  branchCommitSha = async (branch: string) => {
    const {
      target: { hash: branchSha },
    }: BitBucketBranch = await this.getBranch(branch);

    return branchSha;
  };

  defaultBranchCommitSha = () => {
    return this.branchCommitSha(this.branch);
  };

  isFile = ({ type }: BitBucketFile) => type === 'commit_file';

  getFileId = (commitHash: string, path: string) => {
    return `${commitHash}/${path}`;
  };

  processFile = (file: BitBucketFile) => ({
    id: file.id,
    type: file.type,
    path: file.path,
    name: basename(file.path),

    // BitBucket does not return file SHAs, but it does give us the
    // commit SHA. Since the commit SHA will change if any files do,
    // we can construct an ID using the commit SHA and the file path
    // that will help with caching (though not as well as a normal
    // SHA, since it will change even if the individual file itself
    // doesn't.)
    ...(file.commit && file.commit.hash ? { id: this.getFileId(file.commit.hash, file.path) } : {}),
  });
  processFiles = (files: BitBucketFile[]) => files.filter(this.isFile).map(this.processFile);

  readFile = async (
    path: string,
    sha?: string | null,
    { parseText = true, branch = this.branch, head = '' } = {},
  ): Promise<string | Blob> => {
    const fetchContent = async () => {
      const node = head ? head : await this.branchCommitSha(branch);
      const content = await this.request({
        url: `${this.repoURL}/src/${node}/${path}`,
        cache: 'no-store',
      }).then<string | Blob>(parseText ? this.responseToText : this.responseToBlob);
      return content;
    };
    const content = await readFile(sha, fetchContent, localForage, parseText);
    return content;
  };

  async readFileMetadata(path: string, sha: string | null | undefined) {
    const fetchFileMetadata = async () => {
      try {
        const { values }: { values: BitBucketCommit[] } = await this.requestJSON({
          url: `${this.repoURL}/commits`,
          params: { path, include: this.branch },
        });
        const commit = values[0];
        return {
          author: commit.author.user
            ? commit.author.user.display_name || commit.author.user.nickname
            : commit.author.raw,
          updatedOn: commit.date,
        };
      } catch (e) {
        return { author: '', updatedOn: '' };
      }
    };
    const fileMetadata = await readFileMetadata(sha, fetchFileMetadata, localForage);
    return fileMetadata;
  }

  async isShaExistsInBranch(branch: string, sha: string) {
    const { values }: { values: BitBucketCommit[] } = await this.requestJSON({
      url: `${this.repoURL}/commits`,
      params: { include: branch, pagelen: '100' },
    }).catch(e => {
      console.info(`Failed getting commits for branch '${branch}'`, e);
      return [];
    });

    return values.some(v => v.hash === sha);
  }

  getEntriesAndCursor = (jsonResponse: BitBucketSrcResult) => {
    const {
      size: count,
      page,
      pagelen: pageSize,
      next,
      previous: prev,
      values: entries,
    } = jsonResponse;
    const pageCount = pageSize && count ? Math.ceil(count / pageSize) : undefined;
    return {
      entries,
      cursor: Cursor.create({
        actions: [...(next ? ['next'] : []), ...(prev ? ['prev'] : [])],
        meta: { page, count, pageSize, pageCount },
        data: { links: { next, prev } },
      }),
    };
  };

  listFiles = async (path: string, depth = 1, pagelen: number, branch: string) => {
    const node = await this.branchCommitSha(branch);
    const result: BitBucketSrcResult = await this.requestJSON({
      url: `${this.repoURL}/src/${node}/${path}`,
      params: {
        max_depth: `${depth}`,
        pagelen: `${pagelen}`,
      },
    }).catch(replace404WithEmptyResponse);
    const { entries, cursor } = this.getEntriesAndCursor(result);

    return { entries: this.processFiles(entries), cursor: cursor as Cursor };
  };

  traverseCursor = async (
    cursor: Cursor,
    action: string,
  ): Promise<{
    cursor: Cursor;
    entries: { path: string; name: string; type: string; id: string }[];
  }> =>
    flow([
      this.requestJSON,
      then(this.getEntriesAndCursor),
      then<
        { cursor: Cursor; entries: BitBucketFile[] },
        { cursor: Cursor; entries: BitBucketFile[] }
      >(({ cursor: newCursor, entries }) => ({
        cursor: newCursor,
        entries: this.processFiles(entries),
      })),
    ])((cursor.data?.links as Record<string, unknown>)[action]);

  listAllFiles = async (path: string, depth: number, branch: string) => {
    const { cursor: initialCursor, entries: initialEntries } = await this.listFiles(
      path,
      depth,
      100,
      branch,
    );
    const entries = [...initialEntries];
    let currentCursor = initialCursor;
    while (currentCursor && currentCursor.actions!.has('next')) {
      const { cursor: newCursor, entries: newEntries } = await this.traverseCursor(
        currentCursor,
        'next',
      );
      entries.push(...newEntries);
      currentCursor = newCursor;
    }
    return this.processFiles(entries);
  };

  async uploadFiles(
    files: { path: string; newPath?: string; delete?: boolean }[],
    {
      commitMessage,
      branch,
      parentSha,
    }: { commitMessage: string; branch: string; parentSha?: string },
  ) {
    const formData = new FormData();
    const toMove: { from: string; to: string; contentBlob: Blob }[] = [];
    files.forEach(file => {
      if (file.delete) {
        // delete the file
        formData.append('files', file.path);
      } else if (file.newPath) {
        const contentBlob = get(file, 'fileObj', new Blob([(file as DataFile).raw]));
        toMove.push({ from: file.path, to: file.newPath, contentBlob });
      } else {
        // add/modify the file
        const contentBlob = get(file, 'fileObj', new Blob([(file as DataFile).raw]));
        // Third param is filename header, in case path is `message`, `branch`, etc.
        formData.append(file.path, contentBlob, basename(file.path));
      }
    });
    for (const { from, to, contentBlob } of toMove) {
      const sourceDir = dirname(from);
      const destDir = dirname(to);
      const filesBranch = parentSha ? this.branch : branch;
      const files = await this.listAllFiles(sourceDir, 100, filesBranch);
      for (const file of files) {
        // to move a file in Bitbucket we need to delete the old path
        // and upload the file content to the new path
        // NOTE: this is very wasteful, and also the Bitbucket `diff` API
        // reports these files as deleted+added instead of renamed
        // delete current path
        formData.append('files', file.path);
        // create in new path
        const content =
          file.path === from
            ? contentBlob
            : await this.readFile(file.path, null, {
                branch: filesBranch,
                parseText: false,
              });
        formData.append(file.path.replace(sourceDir, destDir), content, basename(file.path));
      }
    }

    if (commitMessage) {
      formData.append('message', commitMessage);
    }
    if (this.commitAuthor) {
      const { name, email } = this.commitAuthor;
      formData.append('author', `${name} <${email}>`);
    }

    formData.append('branch', branch);

    if (parentSha) {
      formData.append('parents', parentSha);
    }

    try {
      await this.requestText({
        url: `${this.repoURL}/src`,
        method: 'POST',
        body: formData,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = error.message || '';
        // very descriptive message from Bitbucket
        if (parentSha && message.includes('Something went wrong')) {
          await throwOnConflictingBranches(branch, name => this.getBranch(name), API_NAME);
        }
      }
      throw error;
    }

    return files;
  }

  async persistFiles(
    dataFiles: DataFile[],
    mediaFiles: (
      | {
          fileObj: File;
          size: number;
          sha: string;
          raw: string;
          path: string;
        }
      | AssetProxy
    )[],
    options: PersistOptions,
  ) {
    const files = [...dataFiles, ...mediaFiles];
    return this.uploadFiles(files, { commitMessage: options.commitMessage, branch: this.branch });
  }

  async getDifferences(source: string, destination: string = this.branch) {
    if (source === destination) {
      return [];
    }
    const rawDiff = await this.requestText({
      url: `${this.repoURL}/diff/${source}..${destination}`,
      params: {
        binary: 'false',
      },
    });

    const diffs = parse(rawDiff).map(d => {
      const oldPath = d.oldPath?.replace(/b\//, '') || '';
      const newPath = d.newPath?.replace(/b\//, '') || '';
      const path = newPath || (oldPath as string);
      return {
        oldPath,
        newPath,
        status: d.status,
        newFile: d.status === 'added',
        path,
        binary: d.binary || /.svg$/.test(path),
      };
    });
    return diffs;
  }

  deleteFiles = (paths: string[], message: string) => {
    const body = new FormData();
    paths.forEach(path => {
      body.append('files', path);
    });
    body.append('branch', this.branch);
    if (message) {
      body.append('message', message);
    }
    if (this.commitAuthor) {
      const { name, email } = this.commitAuthor;
      body.append('author', `${name} <${email}>`);
    }

    return this.request(
      unsentRequest.withBody(body, unsentRequest.withMethod('POST', `${this.repoURL}/src`)),
    );
  };
}
