import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';
import semaphore from 'semaphore';

import { CmsBackendClass } from '../../interface';
import {
  asyncLock,
  basename,
  entriesByFiles,
  entriesByFolder,
  filterByExtension,
  getBlobSHA,
  getMediaAsBlob,
  getMediaDisplayURL,
} from '../../lib/util';
import API, { API_NAME } from './API';
import AuthenticationPage from './AuthenticationPage';

import type { Semaphore } from 'semaphore';
import type {
  BackendEntry,
  CmsBackendInitializerOptions,
  CmsConfig,
  Credentials,
  DisplayURL,
  ImplementationEntry,
  ImplementationFile,
  ImplementationMediaFile,
  PersistOptions,
  User,
} from '../../interface';
import type { AsyncLock, Cursor } from '../../lib/util';
import type AssetProxy from '../../valueObjects/AssetProxy';

const MAX_CONCURRENT_DOWNLOADS = 10;

function parseAzureRepo(config: CmsConfig) {
  const { repo } = config.backend;

  if (typeof repo !== 'string') {
    throw new Error('The Azure backend needs a "repo" in the backend configuration.');
  }

  const parts = repo.split('/');
  if (parts.length !== 3) {
    throw new Error('The Azure backend must be in a the format of {org}/{project}/{repo}');
  }

  const [org, project, repoName] = parts;
  return {
    org,
    project,
    repoName,
  };
}

export default class Azure extends CmsBackendClass {
  lock: AsyncLock;
  api?: API;
  options: CmsBackendInitializerOptions;
  repo: {
    org: string;
    project: string;
    repoName: string;
  };
  branch: string;
  apiRoot: string;
  apiVersion: string;
  token: string | null;
  mediaFolder: string;

  _mediaDisplayURLSem?: Semaphore;

  constructor(config: CmsConfig, options: CmsBackendInitializerOptions) {
    super(config, options);
    this.options = {
      ...options,
    };

    this.repo = parseAzureRepo(config);
    this.branch = config.backend.branch || 'main';
    this.apiRoot = config.backend.api_root || 'https://dev.azure.com';
    this.apiVersion = config.backend.api_version || '6.1-preview';
    this.token = '';
    this.mediaFolder = trim(config.media_folder, '/');
    this.lock = asyncLock();
  }

  isGitBackend() {
    return true;
  }

  async status(): Promise<{
    auth: { status: boolean };
    api: { status: boolean; statusPage: string };
  }> {
    const auth =
      (await this.api!.user()
        .then(user => !!user)
        .catch(e => {
          console.warn('Failed getting Azure user', e);
          return false;
        })) || false;

    return { auth: { status: auth }, api: { status: true, statusPage: '' } };
  }

  authComponent() {
    return AuthenticationPage;
  }

  restoreUser(user: User) {
    return this.authenticate(user);
  }

  async authenticate(state: Credentials) {
    this.token = state.token as string;
    this.api = new API(
      {
        apiRoot: this.apiRoot,
        apiVersion: this.apiVersion,
        repo: this.repo,
        branch: this.branch,
      },
      this.token,
    );

    const user = await this.api.user();
    return { token: state.token as string, ...user };
  }

  /**
   * Log the user out by forgetting their access token.
   * TODO: *Actual* logout by redirecting to:
   * https://login.microsoftonline.com/{tenantId}/oauth2/logout?client_id={clientId}&post_logout_redirect_uri={baseUrl}
   */
  logout() {
    this.token = null;
    return;
  }

  getToken() {
    return Promise.resolve(this.token);
  }

  async entriesByFolder(folder: string, extension: string, depth: number) {
    const listFiles = async () => {
      const files = await this.api!.listFiles(folder, depth > 1);
      const filtered = files.filter(file => filterByExtension({ path: file.path }, extension));
      return filtered.map(file => ({
        id: file.id,
        path: file.path,
      }));
    };

    const entries = await entriesByFolder(
      listFiles,
      this.api!.readFile.bind(this.api!),
      this.api!.readFileMetadata.bind(this.api),
      API_NAME,
    );
    return entries;
  }

  entriesByFiles(files: ImplementationFile[]) {
    return entriesByFiles(
      files,
      this.api!.readFile.bind(this.api!),
      this.api!.readFileMetadata.bind(this.api),
      API_NAME,
    );
  }

  async getEntry(path: string) {
    const data = (await this.api!.readFile(path)) as string;
    return {
      file: { path },
      data,
    };
  }

  async getMedia() {
    const files = await this.api!.listFiles(this.mediaFolder, false);
    const mediaFiles = await Promise.all(
      files.map(async ({ id, path, name }) => {
        const blobUrl = await this.getMediaDisplayURL({ id, path });
        return { id, name, displayURL: blobUrl, path };
      }),
    );
    return mediaFiles;
  }

  getMediaDisplayURL(displayURL: DisplayURL) {
    this._mediaDisplayURLSem = this._mediaDisplayURLSem || semaphore(MAX_CONCURRENT_DOWNLOADS);
    return getMediaDisplayURL(
      displayURL,
      this.api!.readFile.bind(this.api!),
      this._mediaDisplayURLSem,
    );
  }

  async getMediaFile(path: string) {
    const name = basename(path);
    const blob = await getMediaAsBlob(path, null, this.api!.readFile.bind(this.api!));
    const fileObj = new File([blob], name);
    const url = URL.createObjectURL(fileObj);
    const id = await getBlobSHA(blob);

    return {
      id,
      displayURL: url,
      path,
      name,
      size: fileObj.size,
      file: fileObj,
      url,
    };
  }

  async persistEntry(entry: BackendEntry, options: PersistOptions): Promise<void> {
    const mediaFiles: AssetProxy[] = entry.assets;
    await this.api!.persistFiles(entry.dataFiles, mediaFiles, options);
  }

  async persistMedia(
    mediaFile: AssetProxy,
    options: PersistOptions,
  ): Promise<ImplementationMediaFile> {
    const fileObj = mediaFile.fileObj as File;

    const [id] = await Promise.all([
      getBlobSHA(fileObj),
      this.api!.persistFiles([], [mediaFile], options),
    ]);

    const { path } = mediaFile;
    const url = URL.createObjectURL(fileObj);

    return {
      displayURL: url,
      path: trimStart(path, '/'),
      name: fileObj!.name,
      size: fileObj!.size,
      file: fileObj,
      url,
      id: id as string,
    };
  }

  async deleteFiles(paths: string[], commitMessage: string) {
    await this.api!.deleteFiles(paths, commitMessage);
  }

  traverseCursor(): Promise<{ entries: ImplementationEntry[]; cursor: Cursor }> {
    throw new Error('Not supported');
  }

  allEntriesByFolder(
    _folder: string,
    _extension: string,
    _depth: number,
  ): Promise<ImplementationEntry[]> {
    throw new Error('Not supported');
  }
}
