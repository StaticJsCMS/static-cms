import attempt from 'lodash/attempt';
import isError from 'lodash/isError';
import take from 'lodash/take';
import unset from 'lodash/unset';
import { basename, dirname } from 'path';
import { v4 as uuid } from 'uuid';

import { Cursor, CURSOR_COMPATIBILITY_SYMBOL } from '@staticcms/core/lib/util';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import AuthenticationPage from './AuthenticationPage';

import type {
  BackendClass,
  BackendEntry,
  Config,
  DisplayURL,
  ImplementationEntry,
  ImplementationFile,
  ImplementationMediaFile,
  User,
} from '@staticcms/core/interface';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';

type RepoFile = { path: string; content: string | AssetProxy; isDirectory?: boolean };
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
  includeFolders?: boolean,
): RepoFile[] {
  if (depth <= 0) {
    return files;
  }

  if (includeFolders) {
    files.unshift({ isDirectory: true, content: '', path });
  }

  Object.keys(tree[folder] || {}).forEach(key => {
    const parts = key.split('.');
    const keyExtension = parts.length > 1 ? parts[parts.length - 1] : '';

    if (isNotEmpty(keyExtension)) {
      const file = (tree[folder] as RepoTree)[key] as RepoFile;
      if (!extension || key.endsWith(`.${extension}`)) {
        files.unshift({ content: file.content, path: `${path}/${key}` });
      }
    } else {
      const subTree = tree[folder] as RepoTree;
      return getFolderFiles(
        subTree,
        key,
        extension,
        depth - 1,
        files,
        `${path}/${key}`,
        includeFolders,
      );
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
      const { path, newPath, raw } = dataFile;

      if (newPath) {
        deleteFile(path, window.repoFiles);
        writeFile(newPath, raw, window.repoFiles);
      } else {
        writeFile(path, raw, window.repoFiles);
      }
    });
    entry.assets.forEach(a => {
      writeFile(a.path, a, window.repoFiles);
    });
    return Promise.resolve();
  }

  async getMedia(
    mediaFolder = this.mediaFolder,
    folderSupport?: boolean,
  ): Promise<ImplementationMediaFile[]> {
    if (!mediaFolder) {
      return [];
    }
    const files = getFolderFiles(
      window.repoFiles,
      mediaFolder.split('/')[0],
      '',
      100,
      undefined,
      undefined,
      folderSupport,
    ).filter(f => {
      return dirname(f.path) === mediaFolder;
    });

    return files.map(f => ({
      name: basename(f.path),
      id: f.path,
      path: f.path,
      displayURL: f.path,
      isDirectory: f.isDirectory ?? false,
    }));
  }

  async getMediaFile(path: string) {
    return {
      id: path,
      displayURL: path,
      path,
      name: basename(path),
      size: 1,
      url: path,
    };
  }

  normalizeAsset(assetProxy: AssetProxy): ImplementationMediaFile {
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
