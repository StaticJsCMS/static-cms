import { WorkflowStatus } from '@staticcms/core/constants/publishModes';

import type { Entry, UnpublishedEntry } from '@staticcms/core';

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

export const createMockExpandedEntry = (
  options: Omit<Partial<Entry>, 'data'> & Pick<Entry, 'data'> & { field: string },
): Entry & { field: string } => ({
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

export const createMockUnpublishedEntry = (
  options: Partial<UnpublishedEntry>,
): UnpublishedEntry => ({
  slug: 'unpublished-entry.md',
  collection: 'posts',
  status: WorkflowStatus.DRAFT,
  diffs: [
    { id: 'index.md', path: 'src/posts/index.md', newFile: false },
    { id: 'netlify.png', path: 'netlify.png', newFile: true },
  ],
  updatedAt: '20230-02-09T00:00:00.000Z',
  ...options,
});
