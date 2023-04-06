import trim from 'lodash/trim';
import { dirname, join } from 'path';

import { basename, isAbsolutePath } from '.';
import { folderFormatter } from '../formatters';
import { joinUrlPath } from '../urlHelper';

import type {
  BaseField,
  Collection,
  CollectionFile,
  Config,
  Entry,
  Field,
  FileOrImageField,
  ListField,
  MarkdownField,
  MediaField,
  ObjectField,
} from '@staticcms/core/interface';

export const DRAFT_MEDIA_FILES = 'DRAFT_MEDIA_FILES';

function getFileField<EF extends BaseField>(
  collectionFiles: CollectionFile<EF>[],
  slug: string | undefined,
) {
  const file = collectionFiles.find(f => f?.name === slug);
  return file;
}

function isMediaField(
  folderKey: 'media_folder' | 'public_folder',
  field: MediaField | undefined,
): field is FileOrImageField | MarkdownField {
  return Boolean(field && folderKey in field);
}

function hasCustomFolder<EF extends BaseField>(
  folderKey: 'media_folder' | 'public_folder',
  collection: Collection<EF> | undefined | null,
  slug: string | undefined,
  field: MediaField | undefined,
): field is FileOrImageField | MarkdownField {
  if (!collection) {
    return false;
  }

  if (isMediaField(folderKey, field)) {
    if (field[folderKey]) {
      return true;
    }
  }

  if ('files' in collection) {
    const file = getFileField(collection.files, slug);
    if (file && folderKey in file) {
      return true;
    }
  }

  if (folderKey in collection) {
    return true;
  }

  return false;
}

function evaluateFolder<EF extends BaseField>(
  folderKey: 'media_folder' | 'public_folder',
  config: Config<EF>,
  c: Collection<EF>,
  entryMap: Entry | null | undefined,
  field: FileOrImageField | MarkdownField,
) {
  let currentFolder = config[folderKey]!;

  const collection = { ...c };
  // add identity template if doesn't exist
  if (!(folderKey in collection)) {
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
          file.fields,
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
        collection.fields,
        currentFolder,
      );

      if (fieldFolder !== null) {
        currentFolder = fieldFolder;
      }
    }
  }

  return currentFolder;
}

function traverseFields<EF extends BaseField>(
  folderKey: 'media_folder' | 'public_folder',
  config: Config<EF>,
  collection: Collection<EF>,
  entryMap: Entry | null | undefined,
  field: FileOrImageField | MarkdownField | ListField<EF> | ObjectField<EF>,
  fields: Field<EF>[],
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
    const childField: Field<EF> = { ...f };
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

export function selectMediaFolder<EF extends BaseField>(
  config: Config<EF>,
  collection: Collection<EF> | undefined | null,
  entryMap: Entry | null | undefined,
  field: MediaField | undefined,
  currentFolder?: string,
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

  console.log('mediaFolder 1: ' + mediaFolder);

  if (currentFolder) {
    mediaFolder = trim(currentFolder, '/').replace(trim(mediaFolder, '/'), mediaFolder!);
  }

  console.log('mediaFolder 2: ' + mediaFolder);

  return trim(mediaFolder, '/');
}

export function selectMediaFilePublicPath<EF extends BaseField>(
  config: Config<EF>,
  collection: Collection<EF> | null,
  mediaPath: string,
  entryMap: Entry | undefined,
  field: Field<EF> | undefined,
  currentFolder?: string,
) {
  console.log('mediaFIlePublicPath: ' + mediaPath + ' currentFolder: ' + currentFolder);
  if (isAbsolutePath(mediaPath)) {
    return mediaPath;
  }

  let publicFolder = config['public_folder']!;
  let selectedPublicFolder = publicFolder;

  const customPublicFolder = hasCustomFolder('public_folder', collection, entryMap?.slug, field);

  if (customPublicFolder) {
    publicFolder = evaluateFolder('public_folder', config, collection!, entryMap, field);
    selectedPublicFolder = publicFolder;
  }

  if (currentFolder) {
    const customMediaFolder = hasCustomFolder('media_folder', collection, entryMap?.slug, field);
    const mediaFolder = customMediaFolder
      ? evaluateFolder('media_folder', config, collection!, entryMap, field)
      : config['media_folder'];
    selectedPublicFolder = currentFolder.replace(mediaFolder!, publicFolder);
  }

  if (isAbsolutePath(selectedPublicFolder)) {
    return joinUrlPath(selectedPublicFolder, basename(mediaPath));
  }

  return join(selectedPublicFolder, basename(mediaPath));
}

export function selectMediaFilePath(
  config: Config,
  collection: Collection | null,
  entryMap: Entry | null | undefined,
  mediaPath: string,
  field: Field | undefined,
  currentFolder?: string,
) {
  console.log('mediaPath: ' + mediaPath + ' currentFolder: ' + currentFolder);
  if (isAbsolutePath(mediaPath)) {
    console.log('mediaPath absolute');
    return mediaPath;
  }

  const mediaFolder = selectMediaFolder(config, collection, entryMap, field, currentFolder);

  return join(mediaFolder, basename(mediaPath));
}
