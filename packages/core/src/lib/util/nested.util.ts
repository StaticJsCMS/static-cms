import trim from 'lodash/trim';
import { basename, dirname, extname, join } from 'path';

import { selectFolderEntryExtension } from './collection.util';

import type { Collection, Entry } from '@staticcms/core/interface';

export function selectCustomPath(entry: Entry, collection: Collection): string | undefined {
  if (!('nested' in collection) || !collection.nested?.path || !entry.meta) {
    return undefined;
  }

  const indexFile = collection.nested.path.index_file;
  const extension = selectFolderEntryExtension(collection);
  const customPath = join(collection.folder, entry.meta.path, `${indexFile}.${extension}`);
  return customPath;
}

export function customPathFromSlug(collection: Collection, slug: string): string {
  if (!('nested' in collection) || !collection.nested) {
    return '';
  }

  if (collection.nested.path) {
    if ('nested' in collection && collection.nested?.path) {
      return slug.replace(new RegExp(`/${collection.nested.path.index_file}$`, 'g'), '');
    }
  }

  return slug;
}

export function slugFromCustomPath(collection: Collection, customPath: string): string {
  if (!('folder' in collection)) {
    return '';
  }

  const folderPath = collection.folder;
  const entryPath = customPath.toLowerCase().replace(folderPath.toLowerCase(), '');
  const slug = join(dirname(trim(entryPath, '/')), basename(entryPath, extname(customPath)));
  return slug;
}
