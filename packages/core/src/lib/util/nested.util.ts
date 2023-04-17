import trim from 'lodash/trim';
import { basename, dirname, extname, join } from 'path';

import { sanitizeSlug } from '../urlHelper';
import { selectEntryCollectionTitle, selectFolderEntryExtension } from './collection.util';
import { isEmpty, isNotEmpty } from './string.util';

import type { Collection, Config, Entry } from '@staticcms/core/interface';

export function selectCustomPath(
  entry: Entry,
  collection: Collection,
  rootSlug: string | undefined,
  config: Config | undefined,
): string | undefined {
  if (!('nested' in collection) || !collection.nested?.path) {
    return undefined;
  }

  const indexFile = collection.nested.path.index_file;
  const extension = selectFolderEntryExtension(collection);

  const slug = entry.meta?.path ?? getNestedSlug(collection, entry, rootSlug, config);

  const customPath = join(collection.folder, slug, `${indexFile}.${extension}`);
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

export function getNestedSlug(
  collection: Collection,
  entry: Entry,
  slug: string | undefined,
  config: Config | undefined,
) {
  if ('nested' in collection && collection.nested?.path) {
    if (isNotEmpty(entry.slug)) {
      return entry.slug.replace(new RegExp(`/${collection.nested.path.index_file}$`, 'g'), '');
    } else if (slug) {
      let summarySlug = selectEntryCollectionTitle(collection, entry);
      if (isEmpty(summarySlug)) {
        summarySlug = `new-${collection.label_singular ?? collection.label}`;
      }

      return `${customPathFromSlug(collection, slug)}/${sanitizeSlug(
        summarySlug.toLowerCase(),
        config?.slug,
      )}`;
    }
  }

  return '';
}
