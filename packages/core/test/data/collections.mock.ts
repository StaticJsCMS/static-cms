import type {
  BaseField,
  Collection,
  CollectionFile,
  Field,
  FilesCollection,
  FolderCollection,
} from '@staticcms/core/interface';

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
