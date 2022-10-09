import { APIError, blobToFileObj, unsentRequest } from '../../lib/util';
import AuthenticationPage from './AuthenticationPage';

import type {
  BackendEntry,
  CmsBackendClass,
  CmsConfig,
  DisplayURL,
  ImplementationEntry,
  ImplementationFile,
  PersistOptions,
  User,
} from '../../interface';
import type { Cursor } from '../../lib/util';
import type AssetProxy from '../../valueObjects/AssetProxy';

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

export default class ProxyBackend implements CmsBackendClass {
  proxyUrl: string;
  mediaFolder?: string;
  options: {};
  branch: string;

  constructor(config: CmsConfig, options = {}) {
    if (!config.backend.proxy_url) {
      throw new Error('The Proxy backend needs a "proxy_url" in the backend configuration.');
    }

    this.branch = config.backend.branch || 'main';
    this.proxyUrl = config.backend.proxy_url;
    this.mediaFolder = config.media_folder;
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

  async request(payload: { action: string; params: Record<string, unknown> }) {
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

  entriesByFolder(folder: string, extension: string, depth: number) {
    return this.request({
      action: 'entriesByFolder',
      params: { branch: this.branch, folder, extension, depth },
    });
  }

  entriesByFiles(files: ImplementationFile[]) {
    return this.request({
      action: 'entriesByFiles',
      params: { branch: this.branch, files },
    });
  }

  getEntry(path: string) {
    return this.request({
      action: 'getEntry',
      params: { branch: this.branch, path },
    });
  }

  async persistEntry(entry: BackendEntry, options: PersistOptions) {
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

  async getMedia(mediaFolder = this.mediaFolder) {
    const files: MediaFile[] = await this.request({
      action: 'getMedia',
      params: { branch: this.branch, mediaFolder },
    });

    return files.map(deserializeMediaFile);
  }

  async getMediaFile(path: string) {
    const file = await this.request({
      action: 'getMediaFile',
      params: { branch: this.branch, path },
    });
    return deserializeMediaFile(file);
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
    _folder: string,
    _extension: string,
    _depth: number,
  ): Promise<ImplementationEntry[]> {
    throw new Error('Not supported');
  }

  getMediaDisplayURL(_displayURL: DisplayURL): Promise<string> {
    throw new Error('Not supported');
  }
}
