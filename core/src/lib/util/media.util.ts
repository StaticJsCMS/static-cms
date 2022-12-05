import { dirname, join } from 'path';
import trim from 'lodash/trim';

import { folderFormatter } from '../formatters';
import { joinUrlPath } from '../urlHelper';
import { basename, isAbsolutePath } from '.';

import type {
  Config,
  Field,
  Collection,
  CollectionFile,
  Entry,
  FileOrImageField,
  MarkdownField,
  ListField,
  ObjectField,
} from '@staticcms/core/interface';

export const DRAFT_MEDIA_FILES = 'DRAFT_MEDIA_FILES';

function getFileField(collectionFiles: CollectionFile[], slug: string | undefined) {
  const file = collectionFiles.find(f => f?.name === slug);
  return file;
}

function isMediaField(
  folderKey: 'media_folder' | 'public_folder',
  field: Field | undefined,
): field is FileOrImageField | MarkdownField {
  return Boolean(field && folderKey in field);
}

function hasCustomFolder(
  folderKey: 'media_folder' | 'public_folder',
  collection: Collection | undefined | null,
  slug: string | undefined,
  field: Field | undefined,
): field is FileOrImageField | MarkdownField {
  if (!collection) {
    return false;
  }

  if (!isMediaField(folderKey, field)) {
    return false;
  }

  if (field[folderKey]) {
    return true;
  }

  if ('files' in collection) {
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
  config: Config,
  c: Collection,
  entryMap: Entry | undefined,
  field: FileOrImageField | MarkdownField,
) {
  let currentFolder = config[folderKey]!;

  const collection = { ...c };
  // add identity template if doesn't exist
  if (!collection[folderKey]) {
    collection[folderKey] = `{{${folderKey}}}`;
  }

  if ('files' in collection) {
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
          file.fields! as Field[],
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
        collection.fields! as Field[],
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
  config: Config,
  collection: Collection,
  entryMap: Entry | undefined,
  field: FileOrImageField | MarkdownField | ListField | ObjectField,
  fields: Field[],
  currentFolder: string,
): string | null {
  const matchedField = fields.filter(f => f === field)[0] as
    | FileOrImageField
    | MarkdownField
    | ListField
    | ObjectField
    | undefined;
  if (matchedField && isMediaField(folderKey, matchedField)) {
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
    const childField: Field = { ...f };
    if (isMediaField(folderKey, childField) && !childField[folderKey]) {
      // add identity template if doesn't exist
      childField[folderKey] = `{{${folderKey}}}`;
    }
    const folder = folderFormatter(
      isMediaField(folderKey, childField) ? childField[folderKey] ?? '' : '',
      entryMap,
      collection,
      currentFolder,
      folderKey,
      config.slug,
    );
    let fieldFolder = null;
    if ('fields' in childField && childField.fields) {
      fieldFolder = traverseFields(
        folderKey,
        config,
        collection,
        entryMap,
        childField,
        childField.fields,
        folder,
      );
    } else if ('types' in childField && childField.types) {
      fieldFolder = traverseFields(
        folderKey,
        config,
        collection,
        entryMap,
        childField,
        childField.types,
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
  config: Config,
  collection: Collection | undefined | null,
  entryMap: Entry | undefined,
  field: Field | undefined,
) {
  const name = 'media_folder';
  let mediaFolder = config[name];

  if (hasCustomFolder(name, collection, entryMap?.slug, field)) {
    const folder = evaluateFolder(name, config, collection!, entryMap, field);
    if (folder.startsWith('/')) {
      // return absolute paths as is
      mediaFolder = join(folder);
    } else {
      const entryPath = entryMap?.path;
      mediaFolder = entryPath
        ? join(dirname(entryPath), folder)
        : join(collection && 'folder' in collection ? collection.folder : '', DRAFT_MEDIA_FILES);
    }
  }

  return trim(mediaFolder, '/');
}

export function selectMediaFilePublicPath(
  config: Config,
  collection: Collection | null,
  mediaPath: string,
  entryMap: Entry | undefined,
  field: Field | undefined,
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
  config: Config,
  collection: Collection | null,
  entryMap: Entry | undefined,
  mediaPath: string,
  field: Field | undefined,
) {
  if (isAbsolutePath(mediaPath)) {
    return mediaPath;
  }

  const mediaFolder = selectMediaFolder(config, collection, entryMap, field);

  return join(mediaFolder, basename(mediaPath));
}
