import { Base64 } from 'js-base64';
import { partial, result, trim, trimStart } from 'lodash';
import { basename, dirname } from 'path';

import {
  APIError,
  localForage,
  readFile,
  readFileMetadata,
  requestWithBackoff,
  responseParser,
  unsentRequest,
} from '../../lib/util';

import type { Map } from 'immutable';
import type { AssetProxy, DataFile, PersistOptions } from '../../interface';
import type { ApiRequest } from '../../lib/util';

export const API_NAME = 'Azure DevOps';

const API_VERSION = 'api-version';

type AzureUser = {
  coreAttributes?: {
    Avatar?: { value?: { value?: string } };
    DisplayName?: { value?: string };
    EmailAddress?: { value?: string };
  };
};

type AzureGitItem = {
  objectId: string;
  gitObjectType: AzureObjectType;
  path: string;
};

// This does not match Azure documentation, but it is what comes back from some calls
// PullRequest as an example is documented as returning PullRequest[], but it actually
// returns that inside of this value prop in the json
interface AzureArray<T> {
  value: T[];
}

enum AzureCommitChangeType {
  ADD = 'add',
  DELETE = 'delete',
  RENAME = 'rename',
  EDIT = 'edit',
}

enum AzureItemContentType {
  BASE64 = 'base64encoded',
}

enum AzureObjectType {
  BLOB = 'blob',
  TREE = 'tree',
}

type AzureRef = {
  name: string;
  objectId: string;
};

type AzureCommit = {
  author: {
    date: string;
    email: string;
    name: string;
  };
};

function getChangeItem(item: AzureCommitItem) {
  switch (item.action) {
    case AzureCommitChangeType.ADD:
      return {
        changeType: AzureCommitChangeType.ADD,
        item: { path: item.path },
        newContent: {
          content: item.base64Content,
          contentType: AzureItemContentType.BASE64,
        },
      };
    case AzureCommitChangeType.EDIT:
      return {
        changeType: AzureCommitChangeType.EDIT,
        item: { path: item.path },
        newContent: {
          content: item.base64Content,
          contentType: AzureItemContentType.BASE64,
        },
      };
    case AzureCommitChangeType.DELETE:
      return {
        changeType: AzureCommitChangeType.DELETE,
        item: { path: item.path },
      };
    case AzureCommitChangeType.RENAME:
      return {
        changeType: AzureCommitChangeType.RENAME,
        item: { path: item.path },
        sourceServerItem: item.oldPath,
      };
    default:
      return {};
  }
}

type AzureCommitItem = {
  action: AzureCommitChangeType;
  base64Content?: string;
  text?: string;
  path: string;
  oldPath?: string;
};

interface AzureApiConfig {
  apiRoot: string;
  repo: { org: string; project: string; repoName: string };
  branch: string;
  apiVersion: string;
}

export default class API {
  apiVersion: string;
  token: string;
  branch: string;
  endpointUrl: string;

  constructor(config: AzureApiConfig, token: string) {
    const { repo } = config;
    const apiRoot = trim(config.apiRoot, '/');
    this.endpointUrl = `${apiRoot}/${repo.org}/${repo.project}/_apis/git/repositories/${repo.repoName}`;
    this.token = token;
    this.branch = config.branch;
    this.apiVersion = config.apiVersion;
  }

  withHeaders = (req: ApiRequest) => {
    const withHeaders = unsentRequest.withHeaders(
      {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      req,
    );
    return withHeaders;
  };

  withAzureFeatures = (req: Map<string, Map<string, string>>) => {
    if (req.hasIn(['params', API_VERSION])) {
      return req;
    }
    const withParams = unsentRequest.withParams(
      {
        [API_VERSION]: `${this.apiVersion}`,
      },
      req,
    );

    return withParams;
  };

  buildRequest = (req: ApiRequest) => {
    const withHeaders = this.withHeaders(req);
    const withAzureFeatures = this.withAzureFeatures(withHeaders);
    if (withAzureFeatures.has('cache')) {
      return withAzureFeatures;
    } else {
      const withNoCache = unsentRequest.withNoCache(withAzureFeatures);
      return withNoCache;
    }
  };

  request = (req: ApiRequest): Promise<Response> => {
    try {
      return requestWithBackoff(this, req);
    } catch (err: any) {
      throw new APIError(err.message, null, API_NAME);
    }
  };

  responseToJSON = responseParser({ format: 'json', apiName: API_NAME });
  responseToBlob = responseParser({ format: 'blob', apiName: API_NAME });
  responseToText = responseParser({ format: 'text', apiName: API_NAME });

  requestJSON = <T>(req: ApiRequest) => this.request(req).then(this.responseToJSON) as Promise<T>;
  requestText = (req: ApiRequest) => this.request(req).then(this.responseToText) as Promise<string>;

  toBase64 = (str: string) => Promise.resolve(Base64.encode(str));
  fromBase64 = (str: string) => Base64.decode(str);

  branchToRef = (branch: string): string => `refs/heads/${branch}`;
  refToBranch = (ref: string): string => ref.slice('refs/heads/'.length);

  user = async () => {
    const result = await this.requestJSON<AzureUser>({
      url: 'https://app.vssps.visualstudio.com/_apis/profile/profiles/me',
      params: { [API_VERSION]: '6.1-preview.2' },
    });

    const name = result.coreAttributes?.DisplayName?.value;
    const email = result.coreAttributes?.EmailAddress?.value;
    const url = result.coreAttributes?.Avatar?.value?.value;
    const user = {
      name: name || email || '',
      avatar_url: `data:image/png;base64,${url}`,
      email,
    };
    return user;
  };

  async readFileMetadata(
    path: string,
    sha: string | null | undefined,
    { branch = this.branch } = {},
  ) {
    const fetchFileMetadata = async () => {
      try {
        const { value } = await this.requestJSON<AzureArray<AzureCommit>>({
          url: `${this.endpointUrl}/commits/`,
          params: {
            'searchCriteria.itemPath': path,
            'searchCriteria.itemVersion.version': branch,
            'searchCriteria.$top': 1,
          },
        });
        const [commit] = value;

        return {
          author: commit.author.name || commit.author.email,
          updatedOn: commit.author.date,
        };
      } catch (error) {
        return { author: '', updatedOn: '' };
      }
    };

    const fileMetadata = await readFileMetadata(sha, fetchFileMetadata, localForage);
    return fileMetadata;
  }

  readFile = (
    path: string,
    sha?: string | null,
    { parseText = true, branch = this.branch } = {},
  ) => {
    const fetchContent = () => {
      return this.request({
        url: `${this.endpointUrl}/items/`,
        params: { version: branch, path },
        cache: 'no-store',
      }).then<Blob | string>(parseText ? this.responseToText : this.responseToBlob);
    };

    return readFile(sha, fetchContent, localForage, parseText);
  };

  listFiles = async (path: string, recursive: boolean, branch = this.branch) => {
    try {
      const { value: items } = await this.requestJSON<AzureArray<AzureGitItem>>({
        url: `${this.endpointUrl}/items/`,
        params: {
          version: branch,
          scopePath: path,
          recursionLevel: recursive ? 'full' : 'oneLevel',
        },
      });

      const files = items
        .filter(item => item.gitObjectType === AzureObjectType.BLOB)
        .map(file => ({
          id: file.objectId,
          path: trimStart(file.path, '/'),
          name: basename(file.path),
        }));
      return files;
    } catch (err: any) {
      if (err && err.status === 404) {
        console.info('This 404 was expected and handled appropriately.');
        return [];
      } else {
        throw err;
      }
    }
  };

  async getRef(branch: string = this.branch) {
    const { value: refs } = await this.requestJSON<AzureArray<AzureRef>>({
      url: `${this.endpointUrl}/refs`,
      params: {
        $top: '1', // There's only one ref, so keep the payload small
        filter: 'heads/' + branch,
      },
    });

    return refs.find(b => b.name == this.branchToRef(branch))!;
  }

  async uploadAndCommit(
    items: AzureCommitItem[],
    comment: string,
    branch: string,
    newBranch: boolean,
  ) {
    const ref = await this.getRef(newBranch ? this.branch : branch);

    const refUpdate = [
      {
        name: this.branchToRef(branch),
        oldObjectId: ref.objectId,
      },
    ];

    const changes = items.map(item => getChangeItem(item));
    const commits = [{ comment, changes }];
    const push = {
      refUpdates: refUpdate,
      commits,
    };

    return this.requestJSON({
      url: `${this.endpointUrl}/pushes`,
      method: 'POST',
      body: JSON.stringify(push),
    });
  }

  async getCommitItems(files: { path: string; newPath?: string }[], branch: string) {
    const items = await Promise.all(
      files.map(async file => {
        const [base64Content, fileExists] = await Promise.all([
          result(file, 'toBase64', partial(this.toBase64, (file as DataFile).raw)),
          this.isFileExists(file.path, branch),
        ]);

        const path = file.newPath || file.path;
        const oldPath = file.path;
        const renameOrEdit =
          path !== oldPath ? AzureCommitChangeType.RENAME : AzureCommitChangeType.EDIT;

        const action = fileExists ? renameOrEdit : AzureCommitChangeType.ADD;
        return {
          action,
          base64Content,
          path,
          oldPath,
        } as AzureCommitItem;
      }),
    );

    // move children
    for (const item of items.filter(i => i.oldPath && i.action === AzureCommitChangeType.RENAME)) {
      const sourceDir = dirname(item.oldPath as string);
      const destDir = dirname(item.path);
      const children = await this.listFiles(sourceDir, true, branch);
      children
        .filter(file => file.path !== item.oldPath)
        .forEach(file => {
          items.push({
            action: AzureCommitChangeType.RENAME,
            path: file.path.replace(sourceDir, destDir),
            oldPath: file.path,
          });
        });
    }

    return items;
  }

  async persistFiles(dataFiles: DataFile[], mediaFiles: AssetProxy[], options: PersistOptions) {
    const files = [...dataFiles, ...mediaFiles];
    const items = await this.getCommitItems(files, this.branch);

    return this.uploadAndCommit(items, options.commitMessage, this.branch, true);
  }

  async deleteFiles(paths: string[], comment: string) {
    const ref = await this.getRef(this.branch);
    const refUpdate = {
      name: ref.name,
      oldObjectId: ref.objectId,
    };

    const changes = paths.map(path =>
      getChangeItem({ action: AzureCommitChangeType.DELETE, path }),
    );
    const commits = [{ comment, changes }];
    const push = {
      refUpdates: [refUpdate],
      commits,
    };

    return this.requestJSON({
      url: `${this.endpointUrl}/pushes`,
      method: 'POST',
      body: JSON.stringify(push),
    });
  }

  async isFileExists(path: string, branch: string) {
    try {
      await this.requestText({
        url: `${this.endpointUrl}/items/`,
        params: { version: branch, path },
        cache: 'no-store',
      });
      return true;
    } catch (error) {
      if (error instanceof APIError && error.status === 404) {
        return false;
      }
      throw error;
    }
  }
}
