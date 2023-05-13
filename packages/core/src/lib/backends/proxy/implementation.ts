import { APIError, basename, blobToFileObj, unsentRequest } from '@staticcms/core/lib/util';
import AuthenticationPage from './AuthenticationPage';

import type {
  BackendEntry,
  BackendClass,
  Config,
  DisplayURL,
  ImplementationEntry,
  ImplementationFile,
  PersistOptions,
  User,
  ImplementationMediaFile,
} from '@staticcms/core/interface';
import type { Cursor } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';

async function serializeAsset(assetProxy: AssetProxy) {
  const base64content = await assetProxy.toBase64!();
  return { path: assetProxy.path, content: base64content, encoding: 'base64' };
}

type MediaFile = {
  id: string;
  content: string;
  encoding: string;
  name: string;
  path: string;
};

function deserializeMediaFile({ id, content, encoding, path, name }: MediaFile) {
  let byteArray = new Uint8Array(0);
  if (encoding !== 'base64') {
    console.error(`Unsupported encoding '${encoding}' for file '${path}'`);
  } else {
    const decodedContent = atob(content);
    byteArray = new Uint8Array(decodedContent.length);
    for (let i = 0; i < decodedContent.length; i++) {
      byteArray[i] = decodedContent.charCodeAt(i);
    }
  }
  const blob = new Blob([byteArray]);
  const file = blobToFileObj(name, blob);
  const url = URL.createObjectURL(file);
  return { id, name, path, file, size: file.size, url, displayURL: url };
}

export default class ProxyBackend implements BackendClass {
  proxyUrl: string;
  mediaFolder?: string;
  publicFolder?: string;
  options: {};
  branch: string;

  constructor(config: Config, options = {}) {
    if (!config.backend.proxy_url) {
      throw new Error('The Proxy backend needs a "proxy_url" in the backend configuration.');
    }

    this.branch = config.backend.branch || 'main';
    this.proxyUrl = config.backend.proxy_url;
    this.mediaFolder = config.media_folder;
    this.publicFolder = config.public_folder;
    this.options = options;
  }

  isGitBackend() {
    return false;
  }

  status() {
    return Promise.resolve({ auth: { status: true }, api: { status: true, statusPage: '' } });
  }

  authComponent() {
    return AuthenticationPage;
  }

  restoreUser() {
    return this.authenticate();
  }

  authenticate() {
    return Promise.resolve() as unknown as Promise<User>;
  }

  logout() {
    return null;
  }

  getToken() {
    return Promise.resolve('');
  }

  async request<T>(payload: { action: string; params: Record<string, unknown> }): Promise<T> {
    const response = await unsentRequest.fetchWithTimeout(this.proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ branch: this.branch, ...payload }),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      throw new APIError(json.error, response.status, 'Proxy');
    }
  }

  entriesByFolder(
    folder: string,
    extension: string,
    depth: number,
  ): Promise<ImplementationEntry[]> {
    return this.request({
      action: 'entriesByFolder',
      params: { branch: this.branch, folder, extension, depth },
    });
  }

  entriesByFiles(files: ImplementationFile[]): Promise<ImplementationEntry[]> {
    return this.request({
      action: 'entriesByFiles',
      params: { branch: this.branch, files },
    });
  }

  getEntry(path: string): Promise<ImplementationEntry> {
    return this.request({
      action: 'getEntry',
      params: { branch: this.branch, path },
    });
  }

  async persistEntry(entry: BackendEntry, options: PersistOptions): Promise<void> {
    const assets = await Promise.all(entry.assets.map(serializeAsset));
    return this.request({
      action: 'persistEntry',
      params: {
        branch: this.branch,
        dataFiles: entry.dataFiles,
        assets,
        options: { ...options },
      },
    });
  }

  async getMedia(
    mediaFolder = this.mediaFolder,
    folderSupport?: boolean,
    publicFolder = this.publicFolder,
  ) {
    const files: { path: string; url: string; isDirectory: boolean }[] = await this.request({
      action: 'getMedia',
      params: { branch: this.branch, mediaFolder, publicFolder },
    });

    const filteredFiles = folderSupport ? files : files.filter(f => !f.isDirectory);

    return filteredFiles.map(({ url, path, isDirectory }) => {
      const id = url;
      const name = basename(path);

      return { id, name, displayURL: { id, path: url }, path, isDirectory };
    });
  }

  async getMediaFile(path: string): Promise<ImplementationMediaFile> {
    const file = await this.request<MediaFile>({
      action: 'getMediaFile',
      params: {
        branch: this.branch,
        path,
      },
    });
    return deserializeMediaFile(file);
  }

  getMediaDisplayURL(displayURL: DisplayURL): Promise<string> {
    if (typeof displayURL === 'string') {
      return Promise.resolve(displayURL);
    }

    return Promise.resolve(displayURL.path);
  }

  async persistMedia(assetProxy: AssetProxy, options: PersistOptions) {
    const asset = await serializeAsset(assetProxy);
    const file: MediaFile = await this.request({
      action: 'persistMedia',
      params: { branch: this.branch, asset, options: { commitMessage: options.commitMessage } },
    });

    return deserializeMediaFile(file);
  }

  deleteFiles(paths: string[], commitMessage: string) {
    return this.request({
      action: 'deleteFiles',
      params: { branch: this.branch, paths, options: { commitMessage } },
    });
  }

  traverseCursor(): Promise<{ entries: ImplementationEntry[]; cursor: Cursor }> {
    throw new Error('Not supported');
  }

  allEntriesByFolder(
    folder: string,
    extension: string,
    depth: number,
  ): Promise<ImplementationEntry[]> {
    return this.entriesByFolder(folder, extension, depth);
  }
}
