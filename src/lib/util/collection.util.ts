import { join } from 'path';

import { FILES, FOLDER } from '../../constants/collectionTypes';
import { formatExtensions } from '../../formats/formats';

import type { Collection, CollectionFile } from '../../interface';

const selectors = {
  [FOLDER]: {
    entryExtension(collection: Collection) {
      return (collection.extension || formatExtensions[collection.format ?? 'frontmatter']).replace(
        /^\./,
        '',
      );
    },
    fields(collection: Collection) {
      return collection.fields;
    },
    entryPath(collection: Collection, slug: string) {
      const folder = (collection.folder as string).replace(/\/$/, '');
      return `${folder}/${slug}.${this.entryExtension(collection)}`;
    },
    entrySlug(collection: Collection, path: string) {
      const folder = (collection.folder as string).replace(/\/$/, '');
      const slug = path
        .split(folder + '/')
        .pop()
        ?.replace(new RegExp(`\\.${this.entryExtension(collection)}$`), '');

      return slug;
    },
    allowNewEntries(collection: Collection) {
      return collection.create;
    },
    allowDeletion(collection: Collection) {
      return collection.delete ?? true;
    },
    templateName(collection: Collection) {
      return collection.name;
    },
  },
  [FILES]: {
    fileForEntry(collection: Collection, slug?: string) {
      const files = collection.files;
      if (!slug) {
        return files?.[0];
      }
      return files && files.filter(f => f?.name === slug)?.[0];
    },
    fields(collection: Collection, slug?: string) {
      const file = this.fileForEntry(collection, slug);
      return file && file.fields;
    },
    entryPath(collection: Collection, slug: string) {
      const file = this.fileForEntry(collection, slug);
      return file && file.file;
    },
    entrySlug(collection: Collection, path: string) {
      const file = (collection.files as CollectionFile[]).filter(f => f?.file === path)?.[0];
      return file && file.name;
    },
    entryLabel(collection: Collection, slug: string) {
      const file = this.fileForEntry(collection, slug);
      return file && file.label;
    },
    allowNewEntries() {
      return false;
    },
    allowDeletion(collection: Collection) {
      return collection.delete ?? false;
    },
    templateName(_collection: Collection, slug: string) {
      return slug;
    },
  },
};

export function selectHasMetaPath(collection: Collection) {
  return (
    'folder' in collection &&
    collection.type === FOLDER &&
    'meta' in collection &&
    'path' in (collection.meta ?? {})
  );
}

export function selectCustomPath(
  collection: Collection,
  entryDraft: { entry: { meta?: { path?: string | null } | null } },
) {
  if (!selectHasMetaPath(collection)) {
    return;
  }
  const meta = entryDraft.entry.meta;
  const path = meta && meta.path;
  const indexFile = collection.meta?.path?.index_file;
  const extension = selectFolderEntryExtension(collection);
  const customPath = path && join(collection.folder ?? '', path, `${indexFile}.${extension}`);
  return customPath;
}
