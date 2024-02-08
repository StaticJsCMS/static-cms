import type {
  BaseField,
  Collection,
  CollectionFile,
  CollectionFileWithDefaults,
  CollectionWithDefaults,
  Field,
  FilesCollection,
  FilesCollectionWithDefaults,
  FolderCollection,
  FolderCollectionWithDefaults,
} from '@staticcms/core';

export const createMockFolderCollection = <EF extends BaseField>(
  extra: Partial<Collection<EF>> = {},
  ...fields: Field<EF>[]
): FolderCollection<EF> => ({
  name: 'mock_collection',
  label: 'Mock Collections',
  label_singular: 'Mock Collection',
  description:
    'The description is a great place for tone setting, high level information, and editing guidelines that are specific to a collection.\n',
  folder: 'mock_collection',
  summary: '{{title}}',
  sortable_fields: {
    fields: ['title'],
    default: {
      field: 'title',
    },
  },
  create: true,
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    ...fields,
  ],
  ...extra,
});

export const createMockFolderCollectionWithDefaults = <EF extends BaseField>(
  extra: Partial<CollectionWithDefaults<EF>> = {},
  ...fields: Field<EF>[]
): FolderCollectionWithDefaults<EF> => ({
  ...createMockFolderCollection(extra, ...fields),
  i18n: extra.i18n,
  view_filters: extra.view_filters
    ? {
        ...extra.view_filters,
        filters: extra.view_filters.filters.map(f => ({
          ...f,
          id: `${f.field}__${f.pattern}`,
        })),
      }
    : undefined,
  view_groups: extra.view_groups
    ? {
        ...extra.view_groups,
        groups: extra.view_groups.groups.map(g => ({
          ...g,
          id: `${g.field}__${g.pattern}`,
        })),
      }
    : undefined,
});

export const createMockCollectionFile = <EF extends BaseField>(
  extra: Partial<CollectionFile<EF>> = {},
  ...fields: Field<EF>[]
): CollectionFile<EF> => ({
  name: 'mock_collection',
  label: 'Mock Collections',
  label_singular: 'Mock Collection',
  file: 'mock_collection.md',
  description:
    'The description is a great place for tone setting, high level information, and editing guidelines that are specific to a collection.\n',
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    ...fields,
  ],
  ...extra,
});

export const createMockCollectionFileWithDefaults = <EF extends BaseField>(
  extra: Partial<CollectionFileWithDefaults<EF>> = {},
  ...fields: Field<EF>[]
): CollectionFileWithDefaults<EF> => ({
  ...createMockCollectionFile(extra, ...fields),
  i18n: extra.i18n,
});

export const createMockFilesCollection = <EF extends BaseField>(
  extra: Omit<Partial<FilesCollection<EF>>, 'files'> & Pick<FilesCollection<EF>, 'files'>,
): FilesCollection<EF> => ({
  name: 'mock_collection',
  label: 'Mock Collections',
  label_singular: 'Mock Collection',
  description:
    'The description is a great place for tone setting, high level information, and editing guidelines that are specific to a collection.\n',
  summary: '{{title}}',
  sortable_fields: {
    fields: ['title'],
    default: {
      field: 'title',
    },
  },
  ...extra,
});

export const createMockFilesCollectionWithDefaults = <EF extends BaseField>(
  extra: Omit<Partial<FilesCollectionWithDefaults<EF>>, 'files'> &
    Pick<FilesCollectionWithDefaults<EF>, 'files'>,
): FilesCollectionWithDefaults<EF> => ({
  ...createMockFilesCollection(extra),
  i18n: extra.i18n,
  files: extra.files,
  view_filters: extra.view_filters
    ? {
        ...extra.view_filters,
        filters: extra.view_filters.filters.map(f => ({
          ...f,
          id: `${f.field}__${f.pattern}`,
        })),
      }
    : undefined,
  view_groups: extra.view_groups
    ? {
        ...extra.view_groups,
        groups: extra.view_groups.groups.map(g => ({
          ...g,
          id: `${g.field}__${g.pattern}`,
        })),
      }
    : undefined,
});
