import { stripIndent } from 'common-tags';
import flow from 'lodash/flow';
import get from 'lodash/get';
import set from 'lodash/set';
import partialRight from 'lodash/partialRight';
import trimEnd from 'lodash/trimEnd';
import trimStart from 'lodash/trimStart';

import { FILES } from '../constants/collectionTypes';
import { COMMIT_AUTHOR, COMMIT_DATE } from '../constants/commitProps';
import {
  getFileFromSlug,
  selectField,
  selectIdentifier,
  selectInferedField,
} from '../reducers/collections';
import { sanitizeSlug } from './urlHelper';
import { stringTemplate } from './widgets';

import type { CmsConfig, CmsSlug, Collection, Entry } from '../interface';

const {
  compileStringTemplate,
  parseDateFromEntry,
  SLUG_MISSING_REQUIRED_DATE,
  keyToPathArray,
  addFileTemplateFields,
} = stringTemplate;

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
  config: CmsConfig,
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

export function getProcessSegment(slugConfig?: CmsSlug, ignoreValues?: string[]) {
  return (value: string) =>
    ignoreValues && ignoreValues.includes(value)
      ? value
      : flow([value => String(value), prepareSlug, partialRight(sanitizeSlug, slugConfig)])(value);
}

export function slugFormatter(
  collection: Collection,
  entryData: Record<string, unknown>,
  slugConfig?: CmsSlug,
) {
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

export function previewUrlFormatter(
  baseUrl: string,
  collection: Collection,
  slug: string,
  entry: Entry,
  slugConfig?: CmsSlug,
) {
  /**
   * Preview URL can't be created without `baseUrl`. This makes preview URLs
   * optional for backends that don't support them.
   */
  if (!baseUrl) {
    return;
  }

  const basePath = trimEnd(baseUrl, '/');

  const isFileCollection = collection.type === FILES;
  const file = isFileCollection ? getFileFromSlug(collection, entry.slug) : undefined;

  function getPathTemplate() {
    return file?.preview_path ?? collection.preview_path;
  }

  function getDateField() {
    return file?.preview_path_date_field ?? collection.preview_path_date_field;
  }

  /**
   * If a `previewPath` is provided for the collection/file, use it to construct the
   * URL path.
   */
  const pathTemplate = getPathTemplate();

  /**
   * Without a `previewPath` for the collection/file (via config), the preview URL
   * will be the URL provided by the backend.
   */
  if (!pathTemplate) {
    return baseUrl;
  }

  const fields = addFileTemplateFields(entry.path, entry.data, collection.folder);
  const dateFieldName = getDateField() || selectInferedField(collection, 'date');
  const date = parseDateFromEntry(entry, dateFieldName);

  // Prepare and sanitize slug variables only, leave the rest of the
  // `preview_path` template as is.
  const processSegment = getProcessSegment(slugConfig, [fields.dirname as string]);
  let compiledPath;

  try {
    compiledPath = compileStringTemplate(pathTemplate, date, slug, fields, processSegment);
  } catch (err: any) {
    // Print an error and ignore `preview_path` if both:
    //   1. Date is invalid (according to Moment), and
    //   2. A date expression (eg. `{{year}}`) is used in `preview_path`
    if (err.name === SLUG_MISSING_REQUIRED_DATE) {
      console.error(stripIndent`
        Collection "${collection.name}" configuration error:
          \`preview_path_date_field\` must be a field with a valid date. Ignoring \`preview_path\`.
      `);
      return basePath;
    }
    throw err;
  }

  const previewPath = trimStart(compiledPath, ' /');
  return `${basePath}/${previewPath}`;
}

export function summaryFormatter(summaryTemplate: string, entry: Entry, collection: Collection) {
  let entryData = entry.data;
  const date =
    parseDateFromEntry(
      entry,
      selectInferedField(collection, 'date'),
    ) || null;
  const identifier = get(entryData, keyToPathArray(selectIdentifier(collection)));

  entryData = addFileTemplateFields(entry.path, entryData, collection.folder);
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
  slugConfig?: CmsSlug,
) {
  if (!entry || !entry.data) {
    return folderTemplate;
  }

  let fields = set(entry.data, folderKey, defaultFolder);
  fields = addFileTemplateFields(entry.path, fields, collection.folder);

  const date =
    parseDateFromEntry(
      entry,
      selectInferedField(collection, 'date'),
    ) || null;
  const identifier = get(fields, keyToPathArray(selectIdentifier(collection)));
  const processSegment = getProcessSegment(slugConfig, [defaultFolder, fields.dirname as string]);

  const mediaFolder = compileStringTemplate(
    folderTemplate,
    date,
    identifier,
    fields,
    processSegment,
  );

  return mediaFolder;
}
