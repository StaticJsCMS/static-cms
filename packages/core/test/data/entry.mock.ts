/* eslint-disable import/prefer-default-export */
import type { Entry } from '@staticcms/core';

export const createMockEntry = (
  options: Omit<Partial<Entry>, 'data'> & Pick<Entry, 'data'>,
): Entry => ({
  collection: 'mock_collection',
  slug: 'slug-value',
  path: '/path/to/entry',
  partial: false,
  raw: JSON.stringify(options.data),
  label: 'Entry',
  isModification: false,
  mediaFiles: [],
  author: 'Some Person',
  updatedOn: '20230-02-09T00:00:00.000Z',
  ...options,
});
