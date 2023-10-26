import type { Entry } from '../interface';

const {
  expandSearchEntries: actualExpandSearchEntries,
  getEntryField: actualGetEntryField,
  mergeExpandedEntries: actualMergeExpandedEntries,
} = jest.requireActual('@staticcms/core/backend');

export const resolveBackend = jest.fn().mockReturnValue({});

export const currentBackend = jest.fn();

export const expandSearchEntries = jest.fn().mockImplementation(
  (
    entries: Entry[],
    searchFields: string[],
  ): (Entry & {
    field: string;
  })[] => {
    return actualExpandSearchEntries(entries, searchFields);
  },
);

export const getEntryField = jest.fn().mockImplementation((field: string, entry: Entry): string => {
  return actualGetEntryField(field, entry);
});

export const mergeExpandedEntries = jest
  .fn()
  .mockImplementation((entries: (Entry & { field: string })[]): Entry[] => {
    return actualMergeExpandedEntries(entries);
  });
