import { dirname } from 'path';

import { basename, isAbsolutePath } from '.';
import { folderFormatter } from '../formatters';
import { joinUrlPath } from '../urlHelper';

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
} from '@staticcms/core/interface';

export const DRAFT_MEDIA_FILES = 'DRAFT_MEDIA_FILES';

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
  entryMap: Entry | undefined | null,
  field: MediaField | undefined,
  currentFolder?: string,
) {
  let mediaFolder = folderFormatter(
    config.media_folder ?? '',
    entryMap,
    collection as CollectionWithDefaults,
    config.media_folder ?? '',
    'media_folder',
    config.slug,
  );

  if (currentFolder) {
    mediaFolder = currentFolder;
  } else if (hasCustomFolder('media_folder', collection, entryMap?.slug, field)) {
    const folder = evaluateFolder('media_folder', config, collection!, entryMap, field);
    if (folder.startsWith('/')) {
      mediaFolder = folder;
    } else {
      const entryPath = entryMap?.path;
      mediaFolder = entryPath
        ? joinUrlPath(dirname(entryPath), folder)
        : joinUrlPath(
            collection && 'folder' in collection ? collection.folder : '',
            DRAFT_MEDIA_FILES,
            folder,
          );
    }
  }

  return mediaFolder;
}

export function selectMediaFilePublicPath<EF extends BaseField>(
  config: ConfigWithDefaults<EF>,
  collection: CollectionWithDefaults<EF> | undefined | null,
  mediaPath: string,
  entryMap: Entry | undefined | null,
  field: MediaField | undefined,
  currentFolder?: string,
) {
  if (isAbsolutePath(mediaPath)) {
    return mediaPath;
  }

  let publicFolder = folderFormatter(
    config.public_folder ?? '',
    entryMap,
    collection as CollectionWithDefaults,
    config.public_folder ?? '',
    'public_folder',
    config.slug,
  );

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

  const finalPublicPath = joinUrlPath(selectedPublicFolder, basename(mediaPath));
  if (selectedPublicFolder.startsWith('/')) {
    return `/${finalPublicPath}`;
  }

  return finalPublicPath;
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
    let publicFolder = config['public_folder'] ?? mediaFolder;
    let mediaPathDir = dirname(mediaPath);
    if (mediaPathDir === '.') {
      mediaPathDir = '';
    }

    if (hasCustomFolder('public_folder', collection, entryMap?.slug, field)) {
      publicFolder = evaluateFolder('public_folder', config, collection!, entryMap, field);
    }

    if (mediaPathDir.includes(publicFolder) && mediaPathDir != mediaFolder) {
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
