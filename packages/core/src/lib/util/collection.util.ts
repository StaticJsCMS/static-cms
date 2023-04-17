import get from 'lodash/get';
import { useMemo } from 'react';

import { COMMIT_AUTHOR, COMMIT_DATE } from '@staticcms/core/constants/commitProps';
import {
  IDENTIFIER_FIELDS,
  INFERABLE_FIELDS,
  SORTABLE_FIELDS,
} from '@staticcms/core/constants/fieldInference';
import { formatExtensions } from '@staticcms/core/formats/formats';
import consoleError from '../consoleError';
import { summaryFormatter } from '../formatters';
import { keyToPathArray } from '../widgets/stringTemplate';
import { selectField } from './field.util';
import { selectMediaFolder } from './media.util';

import type { Backend } from '@staticcms/core/backend';
import type {
  BaseField,
  Collection,
  CollectionFile,
  Collections,
  Config,
  Entry,
  Field,
  FilesCollection,
  InferredField,
  ObjectField,
  SortableField,
} from '@staticcms/core/interface';

export function fileForEntry<EF extends BaseField>(
  collection: Collection<EF> | undefined | null,
  slug?: string,
): CollectionFile<EF> | undefined {
  if (!collection || !('files' in collection)) {
    return undefined;
  }

  const files = collection.files;
  if (!slug) {
    return files?.[0];
  }
  return files && files.filter(f => f?.name === slug)?.[0];
}

export function selectFields<EF extends BaseField>(
  collection: Collection<EF>,
  slug?: string,
): Field<EF>[] {
  if ('fields' in collection) {
    return collection.fields;
  }

  const file = fileForEntry(collection, slug);
  return file ? file.fields : [];
}

export function selectFolderEntryExtension<EF extends BaseField>(collection: Collection<EF>) {
  return (collection.extension || formatExtensions[collection.format ?? 'frontmatter']).replace(
    /^\./,
    '',
  );
}

export function selectFileEntryLabel<EF extends BaseField>(
  collection: Collection<EF>,
  slug: string,
) {
  if ('fields' in collection) {
    return undefined;
  }

  const file = fileForEntry(collection, slug);
  return file && file.label;
}

export function selectEntryPath<EF extends BaseField>(collection: Collection<EF>, slug: string) {
  if ('fields' in collection) {
    const folder = collection.folder.replace(/\/$/, '');

    if (collection.nested) {
      if (collection.nested.path?.index_file) {
        return `${folder}/${slug}.${selectFolderEntryExtension(collection)}`;
      }
    }

    return `${folder}/${slug}.${selectFolderEntryExtension(collection)}`;
  }

  const file = fileForEntry(collection, slug);
  return file && file.file;
}

export function selectEntrySlug<EF extends BaseField>(collection: Collection<EF>, path: string) {
  if ('fields' in collection) {
    const folder = (collection.folder as string).replace(/\/$/, '');
    const slug = path
      .split(folder + '/')
      .pop()
      ?.replace(new RegExp(`\\.${selectFolderEntryExtension(collection)}$`), '');

    return slug;
  }

  const file = collection.files.filter(f => f?.file === path)?.[0];
  return file && file.name;
}

export function selectAllowNewEntries<EF extends BaseField>(collection: Collection<EF>) {
  if ('fields' in collection) {
    return collection.create ?? true;
  }

  return false;
}

export function selectAllowDeletion<EF extends BaseField>(collection: Collection<EF>) {
  if ('fields' in collection) {
    return collection.delete ?? true;
  }

  return false;
}

export function selectTemplateName<EF extends BaseField>(collection: Collection<EF>, slug: string) {
  if ('fields' in collection) {
    return collection.name;
  }

  return slug;
}

export function selectEntryCollectionTitle<EF extends BaseField>(
  collection: Collection<EF>,
  entry: Entry,
): string {
  // prefer formatted summary over everything else
  const summaryTemplate = collection.summary;
  if (summaryTemplate) {
    return summaryFormatter(summaryTemplate, entry, collection);
  }

  // if the collection is a file collection return the label of the entry
  if ('files' in collection && collection.files) {
    const label = selectFileEntryLabel(collection, entry.slug);
    if (label) {
      return label;
    }
  }

  // try to infer a title field from the entry data
  const entryData = entry.data;
  const titleField = selectInferredField(collection, 'title');
  const result = titleField && get(entryData, keyToPathArray(titleField));

  // if the custom field does not yield a result, fallback to 'title'
  if (!result && titleField !== 'title') {
    return get(entryData, keyToPathArray('title'));
  }

  return result;
}

export function selectDefaultSortableFields<EF extends BaseField>(
  collection: Collection<EF>,
  backend: Backend<EF>,
) {
  let defaultSortable = SORTABLE_FIELDS.map((type: string) => {
    const field = selectInferredField(collection, type);
    if (backend.isGitBackend() && type === 'author' && !field) {
      // default to commit author if not author field is found
      return COMMIT_AUTHOR;
    }
    return field;
  }).filter(Boolean);

  if (backend.isGitBackend()) {
    // always have commit date by default
    defaultSortable = [COMMIT_DATE, ...defaultSortable];
  }

  return defaultSortable as string[];
}

export function selectSortableFields(
  collection: Collection | undefined,
  t: (key: string) => string,
): SortableField[] {
  if (!collection) {
    return [];
  }

  const fields = (collection.sortable_fields?.fields ?? [])
    .map(key => {
      if (key === COMMIT_DATE) {
        return { key, field: { name: key, label: t('collection.defaultFields.updatedOn.label') } };
      }
      const field = selectField(collection, key);
      if (key === COMMIT_AUTHOR && !field) {
        return { key, field: { name: key, label: t('collection.defaultFields.author.label') } };
      }

      return { key, field };
    })
    .filter(item => !!item.field)
    .map(item => ({ ...item.field, key: item.key })) as SortableField[];

  return fields;
}

export function selectViewFilters<EF extends BaseField>(collection?: Collection<EF>) {
  return collection?.view_filters;
}

export function selectViewGroups<EF extends BaseField>(collection?: Collection<EF>) {
  return collection?.view_groups;
}

export function selectFieldsComments<EF extends BaseField>(
  collection: Collection<EF>,
  entryMap: Entry,
) {
  let fields: Field<EF>[] = [];
  if ('folder' in collection) {
    fields = collection.fields;
  } else if ('files' in collection) {
    const file = collection.files!.find(f => f?.name === entryMap.slug);
    if (file) {
      fields = file.fields;
    }
  }
  const comments: Record<string, string> = {};
  const names = getFieldsNames(fields);
  names.forEach(name => {
    const field = selectField(collection, name);
    if (field && 'comment' in field) {
      comments[name] = field.comment!;
    }
  });

  return comments;
}
function getFieldsWithMediaFolders<EF extends BaseField>(fields: Field<EF>[]) {
  const fieldsWithMediaFolders = fields.reduce((acc, f) => {
    if ('media_folder' in f) {
      acc = [...acc, f];
    }

    if ('fields' in f) {
      const fields = f.fields ?? [];
      acc = [...acc, ...getFieldsWithMediaFolders(fields)];
    } else if ('types' in f) {
      const types = f.types ?? [];
      acc = [...acc, ...getFieldsWithMediaFolders(types)];
    }

    return acc;
  }, [] as Field[]);

  return fieldsWithMediaFolders;
}

export function getFileFromSlug<EF extends BaseField>(
  collection: FilesCollection<EF>,
  slug: string,
) {
  return collection.files?.find(f => f.name === slug);
}

export function selectFieldsWithMediaFolders<EF extends BaseField>(
  collection: Collection<EF>,
  slug: string,
) {
  if ('folder' in collection) {
    const fields = collection.fields;
    return getFieldsWithMediaFolders(fields);
  } else {
    const fields = getFileFromSlug(collection, slug)?.fields || [];
    return getFieldsWithMediaFolders(fields);
  }

  return [];
}

export function selectMediaFolders<EF extends BaseField>(
  config: Config<EF>,
  collection: Collection<EF>,
  entry: Entry,
) {
  const fields = selectFieldsWithMediaFolders(collection, entry.slug);
  const folders = fields.map(f => selectMediaFolder(config, collection, entry, f));
  if ('files' in collection) {
    const file = getFileFromSlug(collection, entry.slug);
    if (file) {
      folders.unshift(selectMediaFolder(config, collection, entry, undefined));
    }
  } else if ('media_folder' in collection) {
    // stop evaluating media folders at collection level
    const newCollection = { ...collection };
    folders.unshift(selectMediaFolder(config, newCollection, entry, undefined));
  }

  return [...new Set(folders)];
}

export function getFieldsNames<EF extends BaseField>(fields: Field<EF>[] | undefined, prefix = '') {
  let names = fields?.map(f => `${prefix}${f.name}`) ?? [];

  fields?.forEach((f, index) => {
    if ('fields' in f) {
      const fields = f.fields;
      names = [...names, ...getFieldsNames(fields, `${names[index]}.`)];
    } else if ('types' in f) {
      const types = f.types;
      names = [...names, ...getFieldsNames(types, `${names[index]}.`)];
    }
  });

  return names;
}

export function traverseFields(
  fields: Field[],
  updater: (field: Field) => Field,
  done = () => false,
) {
  if (done()) {
    return fields;
  }

  return fields.map(f => {
    const field = updater(f as Field);
    if (done()) {
      return field;
    } else if ('fields' in field) {
      field.fields = traverseFields(field.fields ?? [], updater, done);
      return field;
    } else if ('types' in field) {
      field.types = traverseFields(field.types ?? [], updater, done) as ObjectField[];
      return field;
    } else {
      return field;
    }
  });
}

export function updateFieldByKey(
  collection: Collection,
  key: string,
  updater: (field: Field) => Field,
): Collection {
  const selected = selectField(collection, key);
  if (!selected) {
    return collection;
  }

  let updated = false;

  function updateAndBreak(f: Field) {
    const field = f as Field;
    if (field === selected) {
      updated = true;
      return updater(field);
    } else {
      return field;
    }
  }

  if ('fields' in collection) {
    collection.fields = traverseFields(collection.fields ?? [], updateAndBreak, () => updated);
  }

  return collection;
}

export function selectIdentifier<EF extends BaseField>(collection: Collection<EF>) {
  const identifier = collection.identifier_field;
  const identifierFields = identifier ? [identifier, ...IDENTIFIER_FIELDS] : [...IDENTIFIER_FIELDS];
  const fieldNames = getFieldsNames('fields' in collection ? collection.fields ?? [] : []);
  return identifierFields.find(id =>
    fieldNames.find(name => name.toLowerCase().trim() === id.toLowerCase().trim()),
  );
}

export function selectInferredField<EF extends BaseField>(
  collection: Collection<EF>,
  fieldName: string,
) {
  if (fieldName === 'title' && collection.identifier_field) {
    return selectIdentifier(collection);
  }
  const inferableField = (
    INFERABLE_FIELDS as Record<
      string,
      {
        type: string;
        synonyms: string[];
        secondaryTypes: string[];
        fallbackToFirstField: boolean;
        showError: boolean;
      }
    >
  )[fieldName];
  const fields = 'fields' in collection ? collection.fields ?? [] : undefined;
  let field;

  // If collection has no fields or fieldName is not defined within inferables list, return null
  if (!fields || !inferableField) {
    return null;
  }
  // Try to return a field of the specified type with one of the synonyms
  const mainTypeFields = fields
    .filter((f: Field<EF>) => (f.widget ?? 'string') === inferableField.type)
    .map(f => f?.name);
  field = mainTypeFields.filter(f => inferableField.synonyms.indexOf(f as string) !== -1);
  if (field && field.length > 0) {
    return field[0];
  }

  // Try to return a field for each of the specified secondary types
  const secondaryTypeFields = fields
    .filter(f => inferableField.secondaryTypes.indexOf(f.widget ?? 'string') !== -1)
    .map(f => f?.name);
  field = secondaryTypeFields.filter(f => inferableField.synonyms.indexOf(f as string) !== -1);
  if (field && field.length > 0) {
    return field[0];
  }

  // Try to return the first field of the specified type
  if (inferableField.fallbackToFirstField && mainTypeFields.length > 0) {
    return mainTypeFields[0];
  }

  // Coundn't infer the field. Show error and return null.
  if (inferableField.showError) {
    consoleError(
      `The Field ${fieldName} is missing for the collection “${collection.name}”`,
      `Static CMS tries to infer the entry ${fieldName} automatically, but one couldn't be found for entries of the collection “${collection.name}”. Please check your site configuration.`,
    );
  }

  return null;
}

export function useInferredFields(collection: Collection) {
  return useMemo(() => {
    const titleField = selectInferredField(collection, 'title');
    const shortTitleField = selectInferredField(collection, 'shortTitle');
    const authorField = selectInferredField(collection, 'author');

    const iFields: Record<string, InferredField> = {};
    if (titleField) {
      iFields[titleField] = INFERABLE_FIELDS.title;
    }
    if (shortTitleField) {
      iFields[shortTitleField] = INFERABLE_FIELDS.shortTitle;
    }
    if (authorField) {
      iFields[authorField] = INFERABLE_FIELDS.author;
    }
    return iFields;
  }, [collection]);
}

export function getDefaultPath(collections: Collections) {
  if (Object.keys(collections).length === 0) {
    throw new Error('No collections found');
  }

  let options = Object.values(collections).filter(
    collection =>
      collection.hide !== true && (!('files' in collection) || (collection.files?.length ?? 0) > 1),
  );

  if (options.length === 0) {
    options = Object.values(collections);
  }

  return `/collections/${options[0].name}`;
}
