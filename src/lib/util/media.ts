import { dirname, join } from 'path';
import trim from 'lodash/trim';

import { folderFormatter } from '../formatters';
import { joinUrlPath } from '../urlHelper';
import { basename, isAbsolutePath } from '../util';

import type { CmsConfig, CmsField, Collection, CollectionFile, Entry } from '../../interface';

export const DRAFT_MEDIA_FILES = 'DRAFT_MEDIA_FILES';

function getFileField(collectionFiles: CollectionFile[], slug: string | undefined) {
  const file = collectionFiles.find(f => f?.name === slug);
  return file;
}

function hasCustomFolder(
  folderKey: 'media_folder' | 'public_folder',
  collection: Collection | undefined | null,
  slug: string | undefined,
  field: CmsField | undefined,
) {
  if (!collection) {
    return false;
  }

  if (field && field[folderKey]) {
    return true;
  }

  if (collection.files) {
    const file = getFileField(collection.files, slug);
    if (file && file[folderKey]) {
      return true;
    }
  }

  if (collection[folderKey]) {
    return true;
  }

  return false;
}

function evaluateFolder(
  folderKey: 'media_folder' | 'public_folder',
  config: CmsConfig,
  c: Collection,
  entryMap: Entry | undefined,
  field: CmsField | undefined,
) {
  let currentFolder = config[folderKey]!;

  const collection = { ...c };
  // add identity template if doesn't exist
  if (!collection[folderKey]) {
    collection[folderKey] = `{{${folderKey}}}`;
  }

  if (collection.files) {
    // files collection evaluate the collection template
    // then move on to the specific file configuration denoted by the slug
    currentFolder = folderFormatter(
      collection[folderKey]!,
      entryMap,
      collection,
      currentFolder,
      folderKey,
      config.slug,
    );

    const f = getFileField(collection.files!, entryMap?.slug);
    if (f) {
      const file = { ...f };
      if (!file[folderKey]) {
        // add identity template if doesn't exist
        file[folderKey] = `{{${folderKey}}}`;
      }

      // evaluate the file template and keep evaluating until we match our field
      currentFolder = folderFormatter(
        file[folderKey]!,
        entryMap,
        collection,
        currentFolder,
        folderKey,
        config.slug,
      );

      if (field) {
        const fieldFolder = traverseFields(
          folderKey,
          config,
          collection,
          entryMap,
          field,
          file.fields! as CmsField[],
          currentFolder,
        );

        if (fieldFolder !== null) {
          currentFolder = fieldFolder;
        }
      }
    }
  } else {
    // folder collection, evaluate the collection template
    // and keep evaluating until we match our field
    currentFolder = folderFormatter(
      collection[folderKey]!,
      entryMap,
      collection,
      currentFolder,
      folderKey,
      config.slug,
    );

    if (field) {
      const fieldFolder = traverseFields(
        folderKey,
        config,
        collection,
        entryMap,
        field,
        collection.fields! as CmsField[],
        currentFolder,
      );

      if (fieldFolder !== null) {
        currentFolder = fieldFolder;
      }
    }
  }

  return currentFolder;
}

function traverseFields(
  folderKey: 'media_folder' | 'public_folder',
  config: CmsConfig,
  collection: Collection,
  entryMap: Entry | undefined,
  field: CmsField,
  fields: CmsField[],
  currentFolder: string,
): string | null {
  const matchedField = fields.filter(f => f === field)[0];
  if (matchedField) {
    return folderFormatter(
      matchedField[folderKey] ? matchedField[folderKey]! : `{{${folderKey}}}`,
      entryMap,
      collection,
      currentFolder,
      folderKey,
      config.slug,
    );
  }

  for (const f of fields) {
    const field = { ...f };
    if (!field[folderKey]) {
      // add identity template if doesn't exist
      field[folderKey] = `{{${folderKey}}}`;
    }
    const folder = folderFormatter(
      field[folderKey]!,
      entryMap,
      collection,
      currentFolder,
      folderKey,
      config.slug,
    );
    let fieldFolder = null;
    if ('fields' in field && field.fields) {
      fieldFolder = traverseFields(
        folderKey,
        config,
        collection,
        entryMap,
        field,
        field.fields,
        folder,
      );
    } else if ('field' in field && field.field) {
      fieldFolder = traverseFields(
        folderKey,
        config,
        collection,
        entryMap,
        field,
        [field.field],
        folder,
      );
    } else if ('types' in field && field.types) {
      fieldFolder = traverseFields(
        folderKey,
        config,
        collection,
        entryMap,
        field,
        field.types,
        folder,
      );
    }
    if (fieldFolder != null) {
      return fieldFolder;
    }
  }

  return null;
}

export function selectMediaFolder(
  config: CmsConfig,
  collection: Collection | undefined | null,
  entryMap: Entry | undefined,
  field: CmsField | undefined,
) {
  const name = 'media_folder';
  let mediaFolder = config[name];

  const customFolder = hasCustomFolder(name, collection, entryMap?.slug, field);

  if (customFolder) {
    const folder = evaluateFolder(name, config, collection!, entryMap, field);
    if (folder.startsWith('/')) {
      // return absolute paths as is
      mediaFolder = join(folder);
    } else {
      const entryPath = entryMap?.path;
      mediaFolder = entryPath
        ? join(dirname(entryPath), folder)
        : join(collection!.folder as string, DRAFT_MEDIA_FILES);
    }
  }

  return trim(mediaFolder, '/');
}

export function selectMediaFilePublicPath(
  config: CmsConfig,
  collection: Collection | null,
  mediaPath: string,
  entryMap: Entry | undefined,
  field: CmsField | undefined,
) {
  if (isAbsolutePath(mediaPath)) {
    return mediaPath;
  }

  const name = 'public_folder';
  let publicFolder = config[name]!;

  const customFolder = hasCustomFolder(name, collection, entryMap?.slug, field);

  if (customFolder) {
    publicFolder = evaluateFolder(name, config, collection!, entryMap, field);
  }

  if (isAbsolutePath(publicFolder)) {
    return joinUrlPath(publicFolder, basename(mediaPath));
  }

  return join(publicFolder, basename(mediaPath));
}

export function selectMediaFilePath(
  config: CmsConfig,
  collection: Collection | null,
  entryMap: Entry | undefined,
  mediaPath: string,
  field: CmsField | undefined,
) {
  if (isAbsolutePath(mediaPath)) {
    return mediaPath;
  }

  const mediaFolder = selectMediaFolder(config, collection, entryMap, field);

  return join(mediaFolder, basename(mediaPath));
}
