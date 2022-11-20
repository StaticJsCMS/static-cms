import attempt from 'lodash/attempt';
import isError from 'lodash/isError';
import take from 'lodash/take';
import unset from 'lodash/unset';
import { extname } from 'path';
import uuid from 'uuid/v4';

import { basename, Cursor, CURSOR_COMPATIBILITY_SYMBOL } from '../../lib/util';
import AuthenticationPage from './AuthenticationPage';

import type {
  BackendEntry,
  BackendClass,
  Config,
  DisplayURL,
  ImplementationEntry,
  ImplementationFile,
  User,
} from '../../interface';
import type AssetProxy from '../../valueObjects/AssetProxy';

type RepoFile = { path: string; content: string | AssetProxy };
type RepoTree = { [key: string]: RepoFile | RepoTree };

declare global {
  interface Window {
    repoFiles: RepoTree;
  }
}

window.repoFiles = window.repoFiles || {};

function getFile(path: string, tree: RepoTree) {
  const segments = path.split('/');
  let obj: RepoTree = tree;
  while (obj && segments.length) {
    obj = obj[segments.shift() as string] as RepoTree;
  }
  return (obj as unknown as RepoFile) || {};
}

function writeFile(path: string, content: string | AssetProxy, tree: RepoTree) {
  const segments = path.split('/');
  let obj = tree;
  while (segments.length > 1) {
    const segment = segments.shift() as string;
    obj[segment] = obj[segment] || {};
    obj = obj[segment] as RepoTree;
  }
  (obj[segments.shift() as string] as RepoFile) = { content, path };
}

function deleteFile(path: string, tree: RepoTree) {
  unset(tree, path.split('/'));
}

const pageSize = 10;

function getCursor(
  folder: string,
  extension: string,
  entries: ImplementationEntry[],
  index: number,
  depth: number,
) {
  const count = entries.length;
  const pageCount = Math.floor(count / pageSize);
  return Cursor.create({
    actions: [
      ...(index < pageCount ? ['next', 'last'] : []),
      ...(index > 0 ? ['prev', 'first'] : []),
    ],
    meta: { index, count, pageSize, pageCount },
    data: { folder, extension, index, pageCount, depth },
  });
}

export function getFolderFiles(
  tree: RepoTree,
  folder: string,
  extension: string,
  depth: number,
  files = [] as RepoFile[],
  path = folder,
) {
  if (depth <= 0) {
    return files;
  }

  Object.keys(tree[folder] || {}).forEach(key => {
    if (extname(key)) {
      const file = (tree[folder] as RepoTree)[key] as RepoFile;
      if (!extension || key.endsWith(`.${extension}`)) {
        files.unshift({ content: file.content, path: `${path}/${key}` });
      }
    } else {
      const subTree = tree[folder] as RepoTree;
      return getFolderFiles(subTree, key, extension, depth - 1, files, `${path}/${key}`);
    }
  });

  return files;
}

export default class TestBackend implements BackendClass {
  mediaFolder?: string;
  options: {};

  constructor(config: Config, options = {}) {
    this.options = options;
    this.mediaFolder = config.media_folder;
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

  traverseCursor(cursor: Cursor, action: string) {
    const { folder, extension, index, pageCount, depth } = cursor.data as {
      folder: string;
      extension: string;
      index: number;
      pageCount: number;
      depth: number;
    };
    const newIndex = (() => {
      if (action === 'next') {
        return (index as number) + 1;
      }
      if (action === 'prev') {
        return (index as number) - 1;
      }
      if (action === 'first') {
        return 0;
      }
      if (action === 'last') {
        return pageCount;
      }
      return 0;
    })();
    // TODO: stop assuming cursors are for collections
    const allFiles = getFolderFiles(window.repoFiles, folder, extension, depth);
    const allEntries = allFiles.map(f => ({
      data: f.content as string,
      file: { path: f.path, id: f.path },
    }));
    const entries = allEntries.slice(newIndex * pageSize, newIndex * pageSize + pageSize);
    const newCursor = getCursor(folder, extension, allEntries, newIndex, depth);
    return Promise.resolve({ entries, cursor: newCursor });
  }

  entriesByFolder(folder: string, extension: string, depth: number) {
    const files = folder ? getFolderFiles(window.repoFiles, folder, extension, depth) : [];
    const entries = files.map(f => ({
      data: f.content as string,
      file: { path: f.path, id: f.path },
    }));
    const cursor = getCursor(folder, extension, entries, 0, depth);
    const ret = take(entries, pageSize);
    // TODO Remove
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ret[CURSOR_COMPATIBILITY_SYMBOL] = cursor;
    return Promise.resolve(ret);
  }

  entriesByFiles(files: ImplementationFile[]) {
    return Promise.all(
      files.map(file => ({
        file,
        data: getFile(file.path, window.repoFiles).content as string,
      })),
    );
  }

  getEntry(path: string) {
    return Promise.resolve({
      file: { path, id: null },
      data: getFile(path, window.repoFiles).content as string,
    });
  }

  async persistEntry(entry: BackendEntry) {
    entry.dataFiles.forEach(dataFile => {
      const { path, raw } = dataFile;
      writeFile(path, raw, window.repoFiles);
    });
    entry.assets.forEach(a => {
      writeFile(a.path, a, window.repoFiles);
    });
    return Promise.resolve();
  }

  async getMedia(mediaFolder = this.mediaFolder) {
    if (!mediaFolder) {
      return [];
    }
    const files = getFolderFiles(window.repoFiles, mediaFolder.split('/')[0], '', 100).filter(f =>
      f.path.startsWith(mediaFolder),
    );
    return files.map(f => this.normalizeAsset(f.content as AssetProxy));
  }

  async getMediaFile(path: string) {
    const asset = getFile(path, window.repoFiles).content as AssetProxy;

    const url = asset?.toString() ?? '';
    const name = basename(path);
    const blob = await fetch(url).then(res => res.blob());
    const fileObj = new File([blob], name);

    return {
      id: url,
      displayURL: url,
      path,
      name,
      size: fileObj.size,
      file: fileObj,
      url,
    };
  }

  normalizeAsset(assetProxy: AssetProxy) {
    const fileObj = assetProxy.fileObj as File;
    const { name, size } = fileObj;
    const objectUrl = attempt(window.URL.createObjectURL, fileObj);
    const url = isError(objectUrl) ? '' : objectUrl;
    const normalizedAsset = {
      id: uuid(),
      name,
      size,
      path: assetProxy.path,
      url,
      displayURL: url,
      fileObj,
    };

    return normalizedAsset;
  }

  persistMedia(assetProxy: AssetProxy) {
    const normalizedAsset = this.normalizeAsset(assetProxy);

    writeFile(assetProxy.path, assetProxy, window.repoFiles);

    return Promise.resolve(normalizedAsset);
  }

  deleteFiles(paths: string[]) {
    paths.forEach(path => {
      deleteFile(path, window.repoFiles);
    });

    return Promise.resolve();
  }

  async allEntriesByFolder(
    folder: string,
    extension: string,
    depth: number,
  ): Promise<ImplementationEntry[]> {
    const files = folder ? getFolderFiles(window.repoFiles, folder, extension, depth) : [];

    const entries = files.map(f => ({
      data: f.content as string,
      file: { path: f.path, id: f.path },
    }));

    return Promise.resolve(entries);
  }

  getMediaDisplayURL(_displayURL: DisplayURL): Promise<string> {
    throw new Error('Not supported');
  }
}
