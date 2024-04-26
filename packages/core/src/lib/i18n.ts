import escapeRegExp from 'lodash/escapeRegExp';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

import { fileForEntry, selectEntrySlug } from './util/collection.util';
import set from './util/set.util';

import type {
  BaseField,
  CollectionWithDefaults,
  Entry,
  EntryData,
  Field,
  I18nInfo,
  I18nStructure,
  ObjectValue,
  ValueOrNestedValue,
  i18nCollection,
} from '../interface';
import type { EntryDraftState } from '../reducers/entryDraft';

export const I18N_STRUCTURE_MULTIPLE_FOLDERS = 'multiple_folders';
export const I18N_STRUCTURE_MULTIPLE_FILES = 'multiple_files';
export const I18N_STRUCTURE_SINGLE_FILE = 'single_file';

export const I18N_FIELD_TRANSLATE = 'translate';
export const I18N_FIELD_DUPLICATE = 'duplicate';
export const I18N_FIELD_NONE = 'none';

export function hasI18n<EF extends BaseField>(
  collection: CollectionWithDefaults<EF> | i18nCollection<EF>,
): collection is i18nCollection<EF> {
  return Boolean('i18n' in collection && collection.i18n);
}

export function getI18nInfo<EF extends BaseField>(collection: i18nCollection<EF>): I18nInfo;
export function getI18nInfo<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
): I18nInfo | null;
export function getI18nInfo<EF extends BaseField>(
  collection: CollectionWithDefaults<EF> | i18nCollection<EF>,
): I18nInfo | null {
  if (!hasI18n(collection) || typeof collection.i18n !== 'object') {
    return null;
  }
  return collection.i18n as I18nInfo;
}

export function getI18nFilesDepth<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
  depth: number,
) {
  const i18nInfo = getI18nInfo(collection);
  if (i18nInfo) {
    const { structure } = i18nInfo;
    if (structure === I18N_STRUCTURE_MULTIPLE_FOLDERS) {
      return depth + 1;
    }
  }

  return depth;
}

export function isFieldTranslatable(field: Field, locale?: string, defaultLocale?: string) {
  return locale !== defaultLocale && field.i18n === I18N_FIELD_TRANSLATE;
}

export function isFieldDuplicate(field: Field, locale?: string, defaultLocale?: string) {
  return locale !== defaultLocale && field.i18n === I18N_FIELD_DUPLICATE;
}

export function isFieldHidden(field: Field, locale?: string, defaultLocale?: string) {
  return locale !== defaultLocale && field.i18n === I18N_FIELD_NONE;
}

export function getLocaleDataPath(locale: string) {
  return ['i18n', locale, 'data'];
}

export function getDataPath(locale: string, defaultLocale: string | undefined) {
  return locale !== defaultLocale ? getLocaleDataPath(locale) : ['data'];
}

export function getFilePath(
  structure: I18nStructure,
  extension: string,
  path: string,
  slug: string,
  locale: string,
) {
  switch (structure) {
    case I18N_STRUCTURE_MULTIPLE_FOLDERS:
      return path.replace(`/${slug}`, `/${locale}/${slug}`);
    case I18N_STRUCTURE_MULTIPLE_FILES:
      return path.replace(new RegExp(`${escapeRegExp(extension)}$`), `${locale}.${extension}`);
    case I18N_STRUCTURE_SINGLE_FILE:
    default:
      return path;
  }
}

export function getLocaleFromPath(structure: I18nStructure, extension: string, path: string) {
  switch (structure) {
    case I18N_STRUCTURE_MULTIPLE_FOLDERS: {
      const parts = path.split('/');
      // filename
      parts.pop();
      // locale
      return parts.pop();
    }
    case I18N_STRUCTURE_MULTIPLE_FILES: {
      const parts = path.slice(0, -`.${extension}`.length);
      return parts.split('.').pop();
    }
    case I18N_STRUCTURE_SINGLE_FILE:
    default:
      return '';
  }
}

export function getFilePaths<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
  extension: string,
  path: string,
  slug: string,
): string[] {
  const i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    return [];
  }

  const { structure, locales } = i18nInfo;

  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    return [path];
  }

  const paths = locales.map(locale =>
    getFilePath(structure as I18nStructure, extension, path, slug, locale),
  );

  return paths;
}

export function normalizeFilePath(
  structure: I18nStructure,
  path: string,
  locale: string | undefined,
) {
  if (!locale) {
    return path;
  }

  switch (structure) {
    case I18N_STRUCTURE_MULTIPLE_FOLDERS:
      return path.replace(`${locale}/`, '');
    case I18N_STRUCTURE_MULTIPLE_FILES:
      return path.replace(`.${locale}`, '');
    case I18N_STRUCTURE_SINGLE_FILE:
    default:
      return path;
  }
}

export interface i18nFile {
  newPath?: string | undefined;
  path: string;
  slug: string;
  raw: string;
}

export function getI18nFiles<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
  extension: string,
  entryDraft: Entry,
  entryToRaw: (entryDraft: Entry) => string,
  path: string,
  slug: string,
  newPath?: string,
): i18nFile[] {
  const i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    return [];
  }

  const { structure = I18N_STRUCTURE_SINGLE_FILE, default_locale, locales } = i18nInfo;

  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    const data = locales.reduce((map, locale) => {
      const dataPath = getDataPath(locale, default_locale);
      if (map) {
        map[locale] = get(entryDraft, dataPath);
      }
      return map;
    }, {} as EntryData);

    entryDraft.data = data;

    return [
      {
        path: getFilePath(structure, extension, path, slug, locales[0]),
        slug,
        raw: entryToRaw(entryDraft),
        ...(newPath && {
          newPath: getFilePath(structure, extension, newPath, slug, locales[0]),
        }),
      },
    ];
  }

  return locales
    .map(locale => {
      const dataPath = getDataPath(locale, default_locale);
      entryDraft.data = get(entryDraft, dataPath);
      return {
        path: getFilePath(structure, extension, path, slug, locale),
        slug,
        raw: entryDraft.data ? entryToRaw(entryDraft) : '',
        ...(newPath && {
          newPath: getFilePath(structure, extension, newPath, slug, locale),
        }),
      };
    })
    .filter(dataFile => dataFile.raw);
}

export function getI18nBackup(
  collection: CollectionWithDefaults,
  entry: Entry,
  entryToRaw: (entry: Entry) => string,
): Record<
  string,
  {
    raw: string;
  }
> {
  const i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    return {};
  }

  const { locales, default_locale } = i18nInfo;

  const i18nBackup = locales
    .filter(l => l !== default_locale)
    .reduce(
      (acc, locale) => {
        const dataPath = getDataPath(locale, default_locale);
        const data = get(entry, dataPath);
        if (!data) {
          return acc;
        }
        return {
          ...acc,
          [locale]: {
            raw: entryToRaw({
              ...entry,
              data,
            }),
          },
        };
      },
      {} as Record<string, { raw: string }>,
    );

  return i18nBackup;
}

export function formatI18nBackup(
  i18nBackup: Record<string, { raw: string }>,
  formatRawData: (raw: string) => Entry,
) {
  const i18n = Object.entries(i18nBackup).reduce((acc, [locale, { raw }]) => {
    const entry = formatRawData(raw);
    return { ...acc, [locale]: { data: entry.data } };
  }, {});

  return i18n;
}

function mergeValues<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
  structure: I18nStructure,
  defaultLocale: string | undefined,
  values: { locale: string; value: Entry }[],
) {
  let defaultEntry = values.find(e => e.locale === defaultLocale);
  if (!defaultEntry) {
    defaultEntry = values[0];
    console.warn(`[StaticCMS] Could not locale entry for default locale '${defaultLocale}'`);
  }
  const i18n = values
    .filter(e => e.locale !== defaultEntry!.locale)
    .reduce((acc, { locale, value }) => {
      const dataPath = getLocaleDataPath(locale);
      return set(acc, dataPath.join('.'), value.data);
    }, {});

  const path = normalizeFilePath(structure, defaultEntry.value.path, defaultLocale);
  const slug = selectEntrySlug(collection, path) as string;
  const entryValue: Entry = {
    ...defaultEntry.value,
    raw: '',
    ...i18n,
    path,
    slug,
  };

  return entryValue;
}

function mergeSingleFileValue(
  entryValue: Entry,
  defaultLocale: string | undefined,
  locales: string[],
): Entry {
  const data = (defaultLocale ? entryValue.data?.[defaultLocale] ?? {} : {}) as EntryData;
  const i18n = locales
    .filter(l => l !== defaultLocale)
    .map(l => ({ locale: l, value: entryValue.data?.[l] }))
    .filter(e => e.value)
    .reduce((acc, e) => {
      return { ...acc, [e.locale]: { data: e.value } };
    }, {});

  return {
    ...entryValue,
    data,
    i18n,
    raw: '',
  };
}

export async function getI18nEntry<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
  extension: string,
  path: string,
  slug: string,
  getEntryValue: (path: string) => Promise<Entry>,
): Promise<Entry<ObjectValue>> {
  let i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    i18nInfo = {
      structure: I18N_STRUCTURE_SINGLE_FILE,
      locales: [],
      enforce_required_non_default: true,
    };
  }

  const { structure, locales, default_locale } = i18nInfo;

  let entryValue: Entry;
  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    entryValue = mergeSingleFileValue(await getEntryValue(path), default_locale, locales);
  } else {
    const entryValues = await Promise.all(
      locales.map(async locale => {
        const entryPath = getFilePath(structure, extension, path, slug, locale);
        const value = await getEntryValue(entryPath).catch(() => null);
        return { value, locale };
      }),
    );

    const nonNullValues = entryValues.filter(e => e.value !== null) as {
      value: Entry;
      locale: string;
    }[];

    entryValue = mergeValues(collection, structure, default_locale, nonNullValues);
  }

  return entryValue;
}

export function groupEntries<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
  extension: string,
  entries: Entry[],
): Entry[] {
  const i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    return [];
  }

  const { structure, default_locale, locales } = i18nInfo;

  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    return entries.map(e => mergeSingleFileValue(e, default_locale, locales));
  }

  const grouped = groupBy(
    entries.map(e => ({
      locale: getLocaleFromPath(structure, extension, e.path) as string,
      value: e,
    })),
    ({ locale, value: e }) => {
      return normalizeFilePath(structure, e.path, locale);
    },
  );

  return Object.values(grouped).reduce((acc, values) => {
    const entryValue = mergeValues(collection, structure, default_locale, values);
    return [...acc, entryValue];
  }, [] as Entry[]);
}

export function getI18nDataFiles(
  collection: CollectionWithDefaults,
  extension: string,
  path: string,
  slug: string,
  diffFiles: { path: string; id: string; newFile: boolean }[],
): {
  path: string;
  id: string;
  newFile: boolean;
}[] {
  const i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    return [];
  }

  const { structure } = i18nInfo;
  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    return diffFiles;
  }
  const paths = getFilePaths(collection, extension, path, slug);
  const dataFiles = paths.reduce(
    (acc, path) => {
      const dataFile = diffFiles.find(file => file.path === path);
      if (dataFile) {
        return [...acc, dataFile];
      } else {
        return [...acc, { path, id: '', newFile: false }];
      }
    },
    [] as { path: string; id: string; newFile: boolean }[],
  );

  return dataFiles;
}

export function duplicateDefaultI18nFields(
  collection: CollectionWithDefaults,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataFields: any,
): {
  [k: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  };
} {
  const i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    return {};
  }

  const { locales, default_locale } = i18nInfo;

  const i18nFields = Object.fromEntries(
    locales
      .filter(locale => locale !== default_locale)
      .map(locale => [locale, { data: dataFields }]),
  );

  return i18nFields;
}

export function duplicateI18nFields(
  entryDraft: EntryDraftState,
  field: Field,
  locales: string[],
  defaultLocale: string,
  fieldPath: string,
) {
  const value = get(entryDraft, ['entry', 'data', ...fieldPath.split('.')]);
  if (field.i18n === I18N_FIELD_DUPLICATE) {
    locales
      .filter(l => l !== defaultLocale)
      .forEach(l => {
        entryDraft = set(
          entryDraft,
          ['entry', ...getDataPath(l, defaultLocale), fieldPath].join('.'),
          value,
        );
      });
  }

  if ('fields' in field && !Array.isArray(value)) {
    field.fields?.forEach(field => {
      entryDraft = duplicateI18nFields(
        entryDraft,
        field,
        locales,
        defaultLocale,
        `${fieldPath}.${field.name}`,
      );
    });
  }

  return entryDraft;
}

function mergeI18nData(
  field: Field,
  defaultData: ObjectValue | undefined | null,
  i18nData: Partial<ObjectValue> | undefined | null,
): ValueOrNestedValue {
  if (field.widget === 'list') {
    if (field.i18n === true) {
      return i18nData;
    }

    return defaultData;
  }

  if (field.widget === 'object') {
    const objectDefaultData = defaultData?.[field.name] ?? null;
    const objectI18nData = i18nData?.[field.name] ?? null;

    if (
      !Array.isArray(objectDefaultData) &&
      typeof objectDefaultData === 'object' &&
      !(objectDefaultData instanceof Date) &&
      !Array.isArray(objectI18nData) &&
      typeof objectI18nData === 'object' &&
      !(objectI18nData instanceof Date)
    ) {
      for (const childField of field.fields) {
        return mergeI18nData(childField, objectDefaultData, objectI18nData);
      }
    }
  }

  if (field.i18n === 'translate') {
    return i18nData?.[field.name];
  }

  return defaultData?.[field.name];
}

export function getPreviewEntry(
  collection: CollectionWithDefaults,
  entry: Entry,
  locale: string | undefined,
  defaultLocale: string | undefined,
) {
  if (!locale || locale === defaultLocale) {
    return entry;
  }

  let fields: Field[] = [];
  const file = fileForEntry(collection, entry.slug);
  if (file) {
    fields = file.fields;
  } else if ('fields' in collection) {
    fields = collection.fields;
  }

  return {
    ...entry,
    data: fields.reduce((acc, f) => {
      acc[f.name] = mergeI18nData(f, entry.data, entry.i18n?.[locale]?.data);
      return acc;
    }, {} as ObjectValue),
  };
}

export function serializeI18n(
  collection: CollectionWithDefaults,
  entry: Entry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serializeValues: (data: any) => any,
): Entry<ObjectValue> {
  const i18nInfo = getI18nInfo(collection);
  if (!i18nInfo) {
    return entry;
  }

  const { locales, default_locale } = i18nInfo;

  locales
    .filter(locale => locale !== default_locale)
    .forEach(locale => {
      const dataPath = getLocaleDataPath(locale);
      entry = set(entry, dataPath.join('.'), serializeValues(get(entry, dataPath)));
    });

  return entry;
}
