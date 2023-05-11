import get from 'lodash/get';

import { COMMIT_AUTHOR, COMMIT_DATE } from '../constants/commitProps';
import { sanitizeSlug } from './urlHelper';
import { selectIdentifier, selectInferredField } from './util/collection.util';
import { selectField } from './util/field.util';
import { set } from './util/object.util';
import { isEmpty } from './util/string.util';
import {
  addFileTemplateFields,
  compileStringTemplate,
  keyToPathArray,
  parseDateFromEntry,
} from './widgets/stringTemplate';

import type {
  BaseField,
  Collection,
  Config,
  Entry,
  EntryData,
  Slug,
  UnknownField,
} from '../interface';

const commitMessageTemplates = {
  create: 'Create {{collection}} “{{slug}}”',
  update: 'Update {{collection}} “{{slug}}”',
  delete: 'Delete {{collection}} “{{slug}}”',
  uploadMedia: 'Upload “{{path}}”',
  deleteMedia: 'Delete “{{path}}”',
} as const;

const variableRegex = /\{\{([^}]+)\}\}/g;

type Options<EF extends BaseField> = {
  slug?: string;
  path?: string;
  collection?: Collection<EF>;
  authorLogin?: string;
  authorName?: string;
};

export function commitMessageFormatter<EF extends BaseField>(
  type: keyof typeof commitMessageTemplates,
  config: Config<EF>,
  { slug, path, collection, authorLogin, authorName }: Options<EF>,
) {
  const templates = { ...commitMessageTemplates, ...(config.backend.commit_messages || {}) };

  return templates[type].replace(variableRegex, (_, variable) => {
    switch (variable) {
      case 'slug':
        return slug || '';
      case 'path':
        return path || '';
      case 'collection':
        return collection ? collection.label_singular || collection.label : '';
      case 'author-login':
        return authorLogin || '';
      case 'author-name':
        return authorName || '';
      default:
        console.warn(
          `[StaticCMS] Ignoring unknown variable “${variable}” in commit message template.`,
        );
        return '';
    }
  });
}

export function prepareSlug(slug: string) {
  return (
    slug
      .trim()
      // Convert slug to lower-case
      .toLocaleLowerCase()

      // Remove single quotes.
      .replace(/[']/g, '')

      // Replace periods with dashes.
      .replace(/[.]/g, '-')
  );
}

export function getProcessSegment(slugConfig?: Slug, ignoreValues?: string[]) {
  return (value: string) =>
    ignoreValues && ignoreValues.includes(value)
      ? value
      : sanitizeSlug(prepareSlug(String(value)), slugConfig);
}

export function slugFormatter<EF extends BaseField = UnknownField>(
  collection: Collection<EF>,
  entryData: EntryData,
  slugConfig?: Slug,
): string {
  if (!('fields' in collection)) {
    return '';
  }

  const slugTemplate = collection.slug || '{{slug}}';

  const identifierField = selectIdentifier(collection);
  if (!identifierField) {
    throw new Error(
      'Collection must have a field name that is a valid entry identifier, or must have `identifier_field` set',
    );
  }

  const identifier = get(entryData, keyToPathArray(identifierField));
  if (isEmpty(identifier)) {
    return '';
  }

  const processSegment = getProcessSegment(slugConfig);
  const date = new Date();
  const slug = compileStringTemplate(slugTemplate, date, identifier, entryData, processSegment);

  if (!('path' in collection)) {
    return slug;
  } else {
    const pathTemplate = prepareSlug(collection.path as string);
    return compileStringTemplate(pathTemplate, date, slug, entryData, (value: string) =>
      value === slug ? value : processSegment(value),
    );
  }
}

export function summaryFormatter<EF extends BaseField>(
  summaryTemplate: string,
  entry: Entry,
  collection: Collection<EF>,
  slugConfig?: Slug,
) {
  const slug = slugFormatter(collection, entry.data, slugConfig);

  let entryData = entry.data;
  const date = parseDateFromEntry(entry, selectInferredField(collection, 'date')) || null;

  entryData =
    addFileTemplateFields(entry.path, entryData, 'folder' in collection ? collection.folder : '') ??
    {};
  // allow commit information in summary template
  if (entry.author && !selectField(collection, COMMIT_AUTHOR)) {
    entryData = set(entryData, COMMIT_AUTHOR, entry.author);
  }
  if (entry.updatedOn && !selectField(collection, COMMIT_DATE)) {
    entryData = set(entryData, COMMIT_DATE, entry.updatedOn);
  }
  const summary = compileStringTemplate(summaryTemplate, date, slug, entryData);
  return summary;
}

export function folderFormatter<EF extends BaseField>(
  folderTemplate: string,
  entry: Entry | null | undefined,
  collection: Collection<EF>,
  defaultFolder: string,
  folderKey: string,
  slugConfig?: Slug,
) {
  if (!entry || !entry.data) {
    return folderTemplate;
  }

  let fields = set(entry.data, folderKey, defaultFolder) as EntryData;
  fields = addFileTemplateFields(
    entry.path,
    fields,
    'folder' in collection ? collection.folder : '',
  );

  const slug = slugFormatter(collection, entry.data, slugConfig);

  const date = parseDateFromEntry(entry, selectInferredField(collection, 'date')) || null;

  const processSegment = getProcessSegment(slugConfig, [defaultFolder, fields?.dirname as string]);

  const mediaFolder = compileStringTemplate(folderTemplate, date, slug, fields, processSegment);

  return mediaFolder;
}
