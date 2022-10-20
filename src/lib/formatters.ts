import flow from 'lodash/flow';
import get from 'lodash/get';
import partialRight from 'lodash/partialRight';

import { COMMIT_AUTHOR, COMMIT_DATE } from '../constants/commitProps';
import { sanitizeSlug } from './urlHelper';
import { selectIdentifier, selectInferedField } from './util/collection.util';
import { selectField } from './util/field.util';
import { set } from './util/object.util';
import {
  addFileTemplateFields,
  compileStringTemplate,
  keyToPathArray,
  parseDateFromEntry,
} from './widgets/stringTemplate';

import type { Collection, Config, Entry, EntryData, Slug } from '../interface';

const commitMessageTemplates = {
  create: 'Create {{collection}} “{{slug}}”',
  update: 'Update {{collection}} “{{slug}}”',
  delete: 'Delete {{collection}} “{{slug}}”',
  uploadMedia: 'Upload “{{path}}”',
  deleteMedia: 'Delete “{{path}}”',
} as const;

const variableRegex = /\{\{([^}]+)\}\}/g;

type Options = {
  slug?: string;
  path?: string;
  collection?: Collection;
  authorLogin?: string;
  authorName?: string;
};

export function commitMessageFormatter(
  type: keyof typeof commitMessageTemplates,
  config: Config,
  { slug, path, collection, authorLogin, authorName }: Options,
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
        console.warn(`Ignoring unknown variable “${variable}” in commit message template.`);
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
      : flow([value => String(value), prepareSlug, partialRight(sanitizeSlug, slugConfig)])(value);
}

export function slugFormatter(collection: Collection, entryData: EntryData, slugConfig?: Slug) {
  const slugTemplate = collection.slug || '{{slug}}';

  const identifier = get(entryData, keyToPathArray(selectIdentifier(collection)));
  if (!identifier) {
    throw new Error(
      'Collection must have a field name that is a valid entry identifier, or must have `identifier_field` set',
    );
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

export function summaryFormatter(summaryTemplate: string, entry: Entry, collection: Collection) {
  let entryData = entry.data;
  const date = parseDateFromEntry(entry, selectInferedField(collection, 'date')) || null;
  const identifier = get(entryData, keyToPathArray(selectIdentifier(collection)));

  entryData = addFileTemplateFields(entry.path, entryData, collection.folder) ?? {};
  // allow commit information in summary template
  if (entry.author && !selectField(collection, COMMIT_AUTHOR)) {
    entryData = set(entryData, COMMIT_AUTHOR, entry.author);
  }
  if (entry.updatedOn && !selectField(collection, COMMIT_DATE)) {
    entryData = set(entryData, COMMIT_DATE, entry.updatedOn);
  }
  const summary = compileStringTemplate(summaryTemplate, date, identifier, entryData);
  return summary;
}

export function folderFormatter(
  folderTemplate: string,
  entry: Entry | undefined,
  collection: Collection,
  defaultFolder: string,
  folderKey: string,
  slugConfig?: Slug,
) {
  if (!entry || !entry.data) {
    return folderTemplate;
  }

  let fields = set(entry.data, folderKey, defaultFolder) as EntryData;
  fields = addFileTemplateFields(entry.path, fields, collection.folder);

  const date = parseDateFromEntry(entry, selectInferedField(collection, 'date')) || null;
  const identifier = get(fields, keyToPathArray(selectIdentifier(collection)));
  const processSegment = getProcessSegment(slugConfig, [defaultFolder, fields?.dirname as string]);

  const mediaFolder = compileStringTemplate(
    folderTemplate,
    date,
    identifier,
    fields,
    processSegment,
  );

  return mediaFolder;
}
