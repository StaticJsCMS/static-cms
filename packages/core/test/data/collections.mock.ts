/* eslint-disable import/prefer-default-export */
import type { BaseField, Collection, Field } from '@staticcms/core/interface';

export const createMockCollection = <EF extends BaseField>(
  extra: Partial<Collection<EF>> = {},
  ...fields: Field<EF>[]
): Collection<EF> => ({
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
