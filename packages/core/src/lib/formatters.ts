import get from 'lodash/get';

import { COMMIT_AUTHOR, COMMIT_DATE } from '../constants/commitProps';
import { sanitizeSlug } from './urlHelper';
import { getFields, selectIdentifier, selectInferredField } from './util/collection.util';
import { getField, selectField } from './util/field.util';
import set from './util/set.util';
import { isEmpty } from './util/string.util';
import {
  addFileTemplateFields,
  compileStringTemplate,
  getExplicitFieldReplacement,
  keyToPathArray,
  parseDateFromEntry,
} from './widgets/stringTemplate';

import type {
  BaseField,
  CollectionWithDefaults,
  ConfigWithDefaults,
  Entry,
  EntryData,
  Field,
  Slug,
  UnknownField,
} from '../interface';

const commitMessageTemplates = {
  create: 'Create {{collection}} “{{slug}}”',
  update: 'Update {{collection}} “{{slug}}”',
  delete: 'Delete {{collection}} “{{slug}}”',
  uploadMedia: 'Upload “{{path}}”',
  deleteMedia: 'Delete “{{path}}”',
  openAuthoring: '{{message}}',
} as const;

const variableRegex = /\{\{([^}]+)\}\}/g;

type Options<EF extends BaseField> = {
  slug?: string;
  path?: string;
  collection?: CollectionWithDefaults<EF>;
  authorLogin?: string;
  authorName?: string;
  data?: EntryData;
};

export function commitMessageFormatter<EF extends BaseField>(
  type: keyof typeof commitMessageTemplates,
  config: ConfigWithDefaults<EF>,
  { slug, path, collection, authorLogin, authorName, data }: Options<EF>,
  isOpenAuthoring?: boolean,
) {
  const templates = { ...commitMessageTemplates, ...(config.backend.commit_messages || {}) };
  let explicitReplacement;
  const commitMessage = templates[type].replace(variableRegex, (_, variable) => {
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
        explicitReplacement = getExplicitFieldReplacement(variable, data);
        if (explicitReplacement) {
          return explicitReplacement;
        }
        console.warn(
          `[StaticCMS] Ignoring unknown variable “${variable}” in commit message template.`,
        );
        return '';
    }
  });

  if (!isOpenAuthoring) {
    return commitMessage;
  }

  const message = templates.openAuthoring?.replace(variableRegex, (_, variable: string) => {
    switch (variable) {
      case 'message':
        return commitMessage;
      case 'author-login':
        return authorLogin || '';
      case 'author-name':
        return authorName || '';
      default:
        console.warn(`Ignoring unknown variable “${variable}” in open authoring message template.`);
        return '';
    }
  });

  return message;
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
  collection: CollectionWithDefaults<EF>,
  entryData: EntryData,
  slugConfig: Slug | undefined,
  fields: Field[] | undefined,
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
  const slug = compileStringTemplate(
    slugTemplate,
    date,
    identifier,
    entryData,
    fields,
    processSegment,
  );

  if (!('path' in collection)) {
    return slug;
  } else {
    const pathTemplate = prepareSlug(collection.path as string);
    return compileStringTemplate(pathTemplate, date, slug, entryData, fields, (value: string) =>
      value === slug ? value : processSegment(value),
    );
  }
}

export function summaryFormatter<EF extends BaseField>(
  summaryTemplate: string,
  entry: Entry,
  collection: CollectionWithDefaults<EF>,
  slugConfig?: Slug,
) {
  const collectionFields = getFields(collection, entry.slug) as Field[];

  const slug = slugFormatter(collection, entry.data, slugConfig, collectionFields);

  let entryData = entry.data;

  const dateFieldName = selectInferredField(collection, 'date');
  const dateField = getField(collectionFields, dateFieldName);
  const date = parseDateFromEntry(entry, dateFieldName, dateField) || null;

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

  return compileStringTemplate(summaryTemplate, date, slug, entryData, collectionFields);
}

export function folderFormatter<EF extends BaseField>(
  folderTemplate: string,
  entry: Entry | null | undefined,
  collection: CollectionWithDefaults<EF> | undefined,
  defaultFolder: string,
  folderKey: string,
  slugConfig?: Slug,
) {
  if (!entry || !entry.data || !collection) {
    return folderTemplate;
  }

  let fields = set(entry.data, folderKey, defaultFolder) as EntryData;
  fields = addFileTemplateFields(
    entry.path,
    fields,
    'folder' in collection ? collection.folder : '',
  );

  const collectionFields = getFields(collection, entry.slug) as Field[];

  const dateFieldName = selectInferredField(collection, 'date');
  const dateField = getField(collectionFields, dateFieldName);
  const date = parseDateFromEntry(entry, dateFieldName, dateField) || null;

  const processSegment = getProcessSegment(slugConfig, [defaultFolder, fields?.dirname as string]);

  const mediaFolder = compileStringTemplate(
    folderTemplate,
    date,
    entry.slug,
    fields,
    collectionFields,
    processSegment,
  );

  return mediaFolder;
}
