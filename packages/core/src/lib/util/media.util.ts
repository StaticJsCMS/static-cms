import trim from 'lodash/trim';
import { dirname } from 'path';

import { basename, isAbsolutePath } from '.';
import { folderFormatter } from '../formatters';
import { joinUrlPath } from '../urlHelper';
import { createEntryMediaPath } from './entry.util';

import type {
  BaseField,
  CollectionFileWithDefaults,
  CollectionWithDefaults,
  ConfigWithDefaults,
  Entry,
  Field,
  FileOrImageField,
  ListField,
  MarkdownField,
  MediaField,
  ObjectField,
} from '@staticcms/core';

function getFileField<EF extends BaseField>(
  collectionFiles: CollectionFileWithDefaults<EF>[],
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
  collection: CollectionWithDefaults<EF> | undefined | null,
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
  config: ConfigWithDefaults<EF>,
  c: CollectionWithDefaults<EF>,
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
  config: ConfigWithDefaults<EF>,
  collection: CollectionWithDefaults<EF>,
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

  for (const childField of fields) {
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
        field,
        childField.fields,
        folder,
      );
    } else if ('types' in childField && childField.types) {
      fieldFolder = traverseFields(
        folderKey,
        config,
        collection,
        entryMap,
        field,
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
  config: ConfigWithDefaults<EF>,
  collection: CollectionWithDefaults<EF> | undefined | null,
  entry: Entry | undefined | null,
  field: MediaField | undefined,
  currentFolder?: string,
) {
  let mediaFolder = folderFormatter(
    config.media_folder ?? '',
    entry,
    collection as CollectionWithDefaults,
    config.media_folder ?? '',
    'media_folder',
    config.slug,
  );

  if (currentFolder) {
    mediaFolder = currentFolder;
  } else if (hasCustomFolder('media_folder', collection, entry?.slug, field)) {
    const folder = evaluateFolder('media_folder', config, collection!, entry, field);
    if (folder.startsWith('/')) {
      mediaFolder = folder.replace(/^[/]*/g, '');
    } else {
      mediaFolder = createEntryMediaPath(entry, collection, folder);
    }
  }

  return trim(mediaFolder, '/');
}

export function selectMediaFilePublicPath<EF extends BaseField>(
  config: ConfigWithDefaults<EF>,
  collection: CollectionWithDefaults<EF> | undefined | null,
  mediaPath: string,
  entry: Entry | undefined | null,
  field: MediaField | undefined,
  currentFolder?: string,
) {
  if (isAbsolutePath(mediaPath)) {
    return mediaPath;
  }

  let publicFolder = folderFormatter(
    config.public_folder ?? '',
    entry,
    collection as CollectionWithDefaults,
    config.public_folder ?? '',
    'public_folder',
    config.slug,
  );

  let mediaFolder = folderFormatter(
    config.media_folder ?? '',
    entry,
    collection as CollectionWithDefaults,
    config.media_folder ?? '',
    'media_folder',
    config.slug,
  );

  const customPublicFolder = hasCustomFolder('public_folder', collection, entry?.slug, field);
  const customMediaFolder = hasCustomFolder('media_folder', collection, entry?.slug, field);

  if (customPublicFolder) {
    publicFolder = evaluateFolder('public_folder', config, collection!, entry, field);
  }

  if (customMediaFolder) {
    mediaFolder = evaluateFolder('media_folder', config, collection!, entry, field);
  }

  if (publicFolder === '' && mediaFolder === '' && collection && 'folder' in collection) {
    mediaFolder = createEntryMediaPath(entry, collection, mediaFolder);
  }

  if (currentFolder) {
    publicFolder = currentFolder.replace(mediaFolder, publicFolder);
    mediaFolder = currentFolder;
  }

  if (mediaPath.startsWith(mediaFolder)) {
    return mediaPath.replace(mediaFolder, publicFolder);
  } else if (mediaPath.startsWith(trim(mediaFolder, '/'))) {
    return mediaPath.replace(trim(mediaFolder, '/'), publicFolder);
  }

  return mediaPath;
}

export function selectMediaFilePath(
  config: ConfigWithDefaults,
  collection: CollectionWithDefaults | null | undefined,
  entryMap: Entry | null | undefined,
  mediaPath: string,
  field: MediaField | undefined,
  currentFolder?: string,
): string {
  if (isAbsolutePath(mediaPath)) {
    return mediaPath;
  }

  let mediaFolder = selectMediaFolder(config, collection, entryMap, field, currentFolder);
  if (!currentFolder) {
    let publicFolder = trim(config['public_folder'] ?? mediaFolder, '/');
    let mediaPathDir = trim(dirname(mediaPath), '/');
    if (mediaPathDir === '.') {
      mediaPathDir = '';
    }

    if (hasCustomFolder('public_folder', collection, entryMap?.slug, field)) {
      publicFolder = trim(
        evaluateFolder('public_folder', config, collection!, entryMap, field),
        '/',
      );
    }

    if (mediaPathDir.startsWith(publicFolder) && mediaPathDir != mediaFolder) {
      mediaFolder = selectMediaFolder(
        config,
        collection,
        entryMap,
        field,
        publicFolder === '' && mediaPathDir.startsWith(mediaFolder)
          ? mediaPathDir
          : mediaPathDir.replace(publicFolder, mediaFolder),
      );
    }
  }

  return mediaPath.startsWith(mediaFolder)
    ? mediaPath
    : joinUrlPath(mediaFolder, basename(mediaPath));
}
