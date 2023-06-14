import { createMockEntry } from '@staticcms/test/data/entry.mock';
import filterEntries from '../filter.util';

import type { Entry } from '@staticcms/core/interface';

describe('filterEntries', () => {
  const mockEnglishEntry = createMockEntry({
    path: 'path/to/file-1.md',
    data: {
      language: 'en',
      tags: ['tag-1', 'tag-2', 'fish-catfish'],
      draft: true,
      numbers: [1, 5],
    },
  });

  const mockFrenchEntry = createMockEntry({
    path: 'path/to/file-2.md',
    data: {
      language: 'fr',
      tags: ['tag-1', 'tag-4'],
      draft: false,
      numbers: [5, 6],
    },
  });

  const mockIndexEntry = createMockEntry({
    path: 'path/to/index.md',
    data: {
      language: 'gr',
      tags: ['tag-1', 'tag-4'],
      draft: false,
      numbers: [5, 6],
    },
  });

  const mockUnderscoreIndexEntry = createMockEntry({
    path: 'path/to/_index.md',
    data: {
      language: 'gr',
      tags: ['tag-1', 'tag-3'],
      draft: false,
      numbers: [1],
    },
  });

  const mockRandomFileNameEntry = createMockEntry({
    path: 'path/to/someOtherFile.md',
    data: {
      language: 'gr',
      tags: ['tag-3'],
      draft: false,
      numbers: [8],
    },
  });

  const mockTags1and4Entry = createMockEntry({
    path: 'path/to/thatOtherPost.md',
    data: {
      language: 'gr',
      tags: ['tag-1', 'tag-4', 'fish-pike'],
      draft: true,
      numbers: [4, 8],
    },
  });

  const mockNestedEntry = createMockEntry({
    path: 'path/to/nested-object-field.md',
    data: {
      nested: {
        object: {
          field: 'yes',
        },
      },
    },
  });

  const entries: Entry[] = [
    mockEnglishEntry,
    mockFrenchEntry,
    mockIndexEntry,
    mockUnderscoreIndexEntry,
    mockRandomFileNameEntry,
    mockTags1and4Entry,
    mockNestedEntry,
  ];

  describe('field rules', () => {
    it('should filter fields', () => {
      expect(filterEntries(entries, { field: 'language', value: 'en' })).toEqual([
        mockEnglishEntry,
      ]);

      expect(filterEntries(entries, { field: 'language', value: 'fr' })).toEqual([mockFrenchEntry]);

      expect(filterEntries(entries, { field: 'language', value: 'gr' })).toEqual([
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);

      expect(filterEntries(entries, { field: 'draft', value: true })).toEqual([
        mockEnglishEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter fields if multiple filter values are provided (must match only one)', () => {
      expect(filterEntries(entries, { field: 'language', value: ['en', 'fr'] })).toEqual([
        mockEnglishEntry,
        mockFrenchEntry,
      ]);
    });

    it('should filter fields based on pattern', () => {
      // Languages with an r in their name
      expect(filterEntries(entries, { field: 'language', pattern: 'r' })).toEqual([
        mockFrenchEntry,
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter fields if field value is an array (must include value)', () => {
      expect(filterEntries(entries, { field: 'tags', value: 'tag-4' })).toEqual([
        mockFrenchEntry,
        mockIndexEntry,
        mockTags1and4Entry,
      ]);

      expect(filterEntries(entries, { field: 'numbers', value: 8 })).toEqual([
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter fields if field value is an array and multiple filter values are provided (must include only one)', () => {
      expect(filterEntries(entries, { field: 'tags', value: ['tag-3', 'tag-4'] })).toEqual([
        mockFrenchEntry,
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);

      expect(filterEntries(entries, { field: 'numbers', value: ['5', '6'] })).toEqual([
        mockEnglishEntry,
        mockFrenchEntry,
        mockIndexEntry,
      ]);
    });

    it('should match all values if matchAll is one (value is an array, multiple filter values are provided)', () => {
      expect(
        filterEntries(entries, { field: 'tags', value: ['tag-1', 'tag-4'], matchAll: true }),
      ).toEqual([mockFrenchEntry, mockIndexEntry, mockTags1and4Entry]);

      expect(
        filterEntries(entries, { field: 'numbers', value: ['5', '6'], matchAll: true }),
      ).toEqual([mockFrenchEntry, mockIndexEntry]);
    });

    it('should filter fields based on pattern when value is an array', () => {
      // Tags containing the word "fish"
      expect(filterEntries(entries, { field: 'tags', pattern: 'fish' })).toEqual([
        mockEnglishEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter based on multiple rules (must match all rules)', () => {
      expect(
        filterEntries(entries, [
          { field: 'tags', value: ['tag-3', 'tag-4'] },
          { field: 'language', value: 'gr' },
        ]),
      ).toEqual([
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter based on multiple rules (must match all rules) (matchAll on)', () => {
      expect(
        filterEntries(entries, [
          { field: 'tags', value: ['tag-1', 'tag-4'], matchAll: true },
          { field: 'language', value: 'gr' },
        ]),
      ).toEqual([mockIndexEntry, mockTags1and4Entry]);
    });
  });

  describe('file rule', () => {
    it('should filter based on file name', () => {
      expect(filterEntries(entries, { pattern: '^index.md$' })).toEqual([mockIndexEntry]);

      expect(filterEntries(entries, { pattern: '^_index.md$' })).toEqual([
        mockUnderscoreIndexEntry,
      ]);

      expect(filterEntries(entries, { pattern: 'index.md$' })).toEqual([
        mockIndexEntry,
        mockUnderscoreIndexEntry,
      ]);

      // File names containing the word file (case insensitive)
      expect(filterEntries(entries, { pattern: '[fF][iI][lL][eE]' })).toEqual([
        mockEnglishEntry,
        mockFrenchEntry,
        mockRandomFileNameEntry,
      ]);
    });

    it('should filter based on multiple rules (must match all rules)', () => {
      // File names containing the word file (case insensitive)
      expect(
        filterEntries(entries, [{ pattern: '[fF][iI][lL][eE]' }, { pattern: 'some' }]),
      ).toEqual([mockRandomFileNameEntry]);
    });
  });

  describe('combined field and file rule', () => {
    it('should filter based on multiple rules (must match all rules)', () => {
      expect(
        filterEntries(entries, [{ pattern: 'index.md$' }, { field: 'tags', value: 'tag-3' }]),
      ).toEqual([mockUnderscoreIndexEntry]);
    });
  });

  describe('nested fields', () => {
    it('should filter based on multiple rules (must match all rules)', () => {
      expect(filterEntries(entries, [{ field: 'nested.object.field', value: 'yes' }])).toEqual([
        mockNestedEntry,
      ]);
    });
  });
});
