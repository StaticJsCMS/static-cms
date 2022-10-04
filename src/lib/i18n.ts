import { set, groupBy, escapeRegExp } from 'lodash';

import { selectEntrySlug } from '../reducers/collections';
import { getIn, setIn } from './util/objectUtil';

import type { Collection, Entry, EntryDraft, EntryField } from '../interface';
import type { EntryDraftState } from '../reducers/entryDraft';

export const I18N = 'i18n';

export enum I18N_STRUCTURE {
  MULTIPLE_FOLDERS = 'multiple_folders',
  MULTIPLE_FILES = 'multiple_files',
  SINGLE_FILE = 'single_file',
}

export enum I18N_FIELD {
  TRANSLATE = 'translate',
  DUPLICATE = 'duplicate',
  NONE = 'none',
}

export function hasI18n(collection: Collection) {
  return I18N in collection;
}

type I18nInfo = {
  locales: string[];
  defaultLocale: string;
  structure: I18N_STRUCTURE;
};

export function getI18nInfo(collection: Collection) {
  if (!hasI18n(collection)) {
    return {};
  }
  const { structure, locales, default_locale: defaultLocale } = collection.i18n;
  return { structure, locales, defaultLocale } as I18nInfo;
}

export function getI18nFilesDepth(collection: Collection, depth: number) {
  const { structure } = getI18nInfo(collection) as I18nInfo;
  if (structure === I18N_STRUCTURE.MULTIPLE_FOLDERS) {
    return depth + 1;
  }
  return depth;
}

export function isFieldTranslatable(field: EntryField, locale: string, defaultLocale: string) {
  const isTranslatable = locale !== defaultLocale && field.i18n === I18N_FIELD.TRANSLATE;
  return isTranslatable;
}

export function isFieldDuplicate(field: EntryField, locale: string, defaultLocale: string) {
  const isDuplicate = locale !== defaultLocale && field.i18n === I18N_FIELD.DUPLICATE;
  return isDuplicate;
}

export function isFieldHidden(field: EntryField, locale: string, defaultLocale: string) {
  const isHidden = locale !== defaultLocale && field.i18n === I18N_FIELD.NONE;
  return isHidden;
}

export function getLocaleDataPath(locale: string) {
  return [I18N, locale, 'data'];
}

export function getDataPath(locale: string, defaultLocale: string) {
  const dataPath = locale !== defaultLocale ? getLocaleDataPath(locale) : ['data'];
  return dataPath;
}

export function getFilePath(
  structure: I18N_STRUCTURE,
  extension: string,
  path: string,
  slug: string,
  locale: string,
) {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      return path.replace(`/${slug}`, `/${locale}/${slug}`);
    case I18N_STRUCTURE.MULTIPLE_FILES:
      return path.replace(new RegExp(`${escapeRegExp(extension)}$`), `${locale}.${extension}`);
    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return path;
  }
}

export function getLocaleFromPath(structure: I18N_STRUCTURE, extension: string, path: string) {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS: {
      const parts = path.split('/');
      // filename
      parts.pop();
      // locale
      return parts.pop();
    }
    case I18N_STRUCTURE.MULTIPLE_FILES: {
      const parts = path.slice(0, -`.${extension}`.length);
      return parts.split('.').pop();
    }
    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return '';
  }
}

export function getFilePaths(
  collection: Collection,
  extension: string,
  path: string,
  slug: string,
) {
  const { structure, locales } = getI18nInfo(collection) as I18nInfo;

  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return [path];
  }

  const paths = locales.map(locale =>
    getFilePath(structure as I18N_STRUCTURE, extension, path, slug, locale),
  );

  return paths;
}

export function normalizeFilePath(structure: I18N_STRUCTURE, path: string, locale: string) {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      return path.replace(`${locale}/`, '');
    case I18N_STRUCTURE.MULTIPLE_FILES:
      return path.replace(`.${locale}`, '');
    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return path;
  }
}

export function getI18nFiles(
  collection: Collection,
  extension: string,
  entryDraft: Entry,
  entryToRaw: (entryDraft: Entry) => string,
  path: string,
  slug: string,
  newPath?: string,
) {
  const { structure, defaultLocale, locales } = getI18nInfo(collection) as I18nInfo;

  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    const data = locales.reduce((map, locale) => {
      const dataPath = getDataPath(locale, defaultLocale);
      map[locale] = getIn(entryDraft, dataPath);
      return map;
    }, {} as Record<string, unknown>);

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

  const dataFiles = locales
    .map(locale => {
      const dataPath = getDataPath(locale, defaultLocale);
      entryDraft.data = getIn(entryDraft, dataPath);
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
  return dataFiles;
}

export function getI18nBackup(
  collection: Collection,
  entry: Entry,
  entryToRaw: (entry: Entry) => string,
) {
  const { locales, defaultLocale } = getI18nInfo(collection) as I18nInfo;

  const i18nBackup = locales
    .filter(l => l !== defaultLocale)
    .reduce((acc, locale) => {
      const dataPath = getDataPath(locale, defaultLocale);
      const data = getIn(entry, dataPath);
      if (!data) {
        return acc;
      }
      entry.data = data;
      return { ...acc, [locale]: { raw: entryToRaw(entry) } };
    }, {} as Record<string, { raw: string }>);

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

function mergeValues(
  collection: Collection,
  structure: I18N_STRUCTURE,
  defaultLocale: string,
  values: { locale: string; value: Entry }[],
) {
  let defaultEntry = values.find(e => e.locale === defaultLocale);
  if (!defaultEntry) {
    defaultEntry = values[0];
    console.warn(`Could not locale entry for default locale '${defaultLocale}'`);
  }
  const i18n = values
    .filter(e => e.locale !== defaultEntry!.locale)
    .reduce((acc, { locale, value }) => {
      const dataPath = getLocaleDataPath(locale);
      return set(acc, dataPath, value.data);
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

function mergeSingleFileValue(entryValue: Entry, defaultLocale: string, locales: string[]) {
  const data = entryValue.data[defaultLocale] || {};
  const i18n = locales
    .filter(l => l !== defaultLocale)
    .map(l => ({ locale: l, value: entryValue.data[l] }))
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

export async function getI18nEntry(
  collection: Collection,
  extension: string,
  path: string,
  slug: string,
  getEntryValue: (path: string) => Promise<Entry>,
) {
  const { structure, locales, defaultLocale } = getI18nInfo(collection) as I18nInfo;

  let entryValue: Entry;
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    entryValue = mergeSingleFileValue(await getEntryValue(path), defaultLocale, locales);
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

    entryValue = mergeValues(collection, structure, defaultLocale, nonNullValues);
  }

  return entryValue;
}

export function groupEntries(collection: Collection, extension: string, entries: Entry[]) {
  const { structure, defaultLocale, locales } = getI18nInfo(collection) as I18nInfo;
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return entries.map(e => mergeSingleFileValue(e, defaultLocale, locales));
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

  const groupedEntries = Object.values(grouped).reduce((acc, values) => {
    const entryValue = mergeValues(collection, structure, defaultLocale, values);
    return [...acc, entryValue];
  }, [] as Entry[]);

  return groupedEntries;
}

export function getI18nDataFiles(
  collection: Collection,
  extension: string,
  path: string,
  slug: string,
  diffFiles: { path: string; id: string; newFile: boolean }[],
) {
  const { structure } = getI18nInfo(collection) as I18nInfo;
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return diffFiles;
  }
  const paths = getFilePaths(collection, extension, path, slug);
  const dataFiles = paths.reduce((acc, path) => {
    const dataFile = diffFiles.find(file => file.path === path);
    if (dataFile) {
      return [...acc, dataFile];
    } else {
      return [...acc, { path, id: '', newFile: false }];
    }
  }, [] as { path: string; id: string; newFile: boolean }[]);

  return dataFiles;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function duplicateDefaultI18nFields(collection: Collection, dataFields: any) {
  const { locales, defaultLocale } = getI18nInfo(collection) as I18nInfo;

  const i18nFields = Object.fromEntries(
    locales
      .filter(locale => locale !== defaultLocale)
      .map(locale => [locale, { data: dataFields }]),
  );

  return i18nFields;
}

export function duplicateI18nFields(
  entryDraft: EntryDraftState,
  field: EntryField,
  locales: string[],
  defaultLocale: string,
  fieldPath: string[] = [field.name],
) {
  const value = getIn(entryDraft, ['entry', 'data', ...fieldPath]);
  if (field.i18n === I18N_FIELD.DUPLICATE) {
    locales
      .filter(l => l !== defaultLocale)
      .forEach(l => {
        entryDraft = setIn<EntryDraftState>(
          entryDraft,
          ['entry', ...getDataPath(l, defaultLocale), ...fieldPath],
          value,
        );
      });
  }

  if ('field' in field && !Array.isArray(value)) {
    if (field.field) {
      entryDraft = duplicateI18nFields(entryDraft, field.field, locales, defaultLocale, [
        ...fieldPath,
        field.name,
      ]);
    }
  } else if ('fields' in field && !Array.isArray(value)) {
    field.fields?.forEach(field => {
      entryDraft = duplicateI18nFields(entryDraft, field, locales, defaultLocale, [
        ...fieldPath,
        field.name,
      ]);
    });
  }

  return entryDraft;
}

export function getPreviewEntry(entry: Entry, locale: string, defaultLocale: string) {
  if (locale === defaultLocale) {
    return entry;
  }
  return (entry.data = entry.i18n?.[locale]?.data);
}

export function serializeI18n(
  collection: Collection,
  entry: Entry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serializeValues: (data: any) => any,
) {
  const { locales, defaultLocale } = getI18nInfo(collection) as I18nInfo;

  locales
    .filter(locale => locale !== defaultLocale)
    .forEach(locale => {
      const dataPath = getLocaleDataPath(locale);
      entry = setIn(entry, dataPath, serializeValues(getIn(entry, dataPath)));
    });

  return entry;
}
