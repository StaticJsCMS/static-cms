import { createMockEntry } from '@staticcms/test/data/entry.mock';
import filterEntries from '../filter.util';

import type { Entry } from '@staticcms/core';

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
      expect(filterEntries(entries, { field: 'language', value: 'en' }, undefined)).toEqual([
        mockEnglishEntry,
      ]);

      expect(filterEntries(entries, { field: 'language', value: 'fr' }, undefined)).toEqual([
        mockFrenchEntry,
      ]);

      expect(filterEntries(entries, { field: 'language', value: 'gr' }, undefined)).toEqual([
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);

      expect(filterEntries(entries, { field: 'draft', value: true }, undefined)).toEqual([
        mockEnglishEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter fields if multiple filter values are provided (must match only one)', () => {
      expect(filterEntries(entries, { field: 'language', value: ['en', 'fr'] }, undefined)).toEqual(
        [mockEnglishEntry, mockFrenchEntry],
      );
    });

    it('should filter fields based on pattern', () => {
      // Languages with an r in their name
      expect(filterEntries(entries, { field: 'language', pattern: 'r' }, undefined)).toEqual([
        mockFrenchEntry,
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter fields if field value is an array (must include value)', () => {
      expect(filterEntries(entries, { field: 'tags.*', value: 'tag-4' }, undefined)).toEqual([
        mockFrenchEntry,
        mockIndexEntry,
        mockTags1and4Entry,
      ]);

      expect(filterEntries(entries, { field: 'numbers.*', value: 8 }, undefined)).toEqual([
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter fields if field value is an array and multiple filter values are provided (must include only one)', () => {
      expect(
        filterEntries(entries, { field: 'tags.*', value: ['tag-3', 'tag-4'] }, undefined),
      ).toEqual([
        mockFrenchEntry,
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);

      expect(filterEntries(entries, { field: 'numbers.*', value: ['5', '6'] }, undefined)).toEqual([
        mockEnglishEntry,
        mockFrenchEntry,
        mockIndexEntry,
      ]);
    });

    it('should match all values if matchAll is one (value is an array, multiple filter values are provided)', () => {
      expect(
        filterEntries(
          entries,
          { field: 'tags.*', value: ['tag-1', 'tag-4'], matchAll: true },
          undefined,
        ),
      ).toEqual([mockFrenchEntry, mockIndexEntry, mockTags1and4Entry]);

      expect(
        filterEntries(
          entries,
          { field: 'numbers.*', value: ['5', '6'], matchAll: true },
          undefined,
        ),
      ).toEqual([mockFrenchEntry, mockIndexEntry]);
    });

    it('should filter fields based on pattern when value is an array', () => {
      // Tags containing the word "fish"
      expect(filterEntries(entries, { field: 'tags', pattern: 'fish' }, undefined)).toEqual([
        mockEnglishEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter based on multiple rules (must match all rules)', () => {
      expect(
        filterEntries(
          entries,
          [
            { field: 'tags.*', value: ['tag-3', 'tag-4'] },
            { field: 'language', value: 'gr' },
          ],
          undefined,
        ),
      ).toEqual([
        mockIndexEntry,
        mockUnderscoreIndexEntry,
        mockRandomFileNameEntry,
        mockTags1and4Entry,
      ]);
    });

    it('should filter based on multiple rules (must match all rules) (matchAll on)', () => {
      expect(
        filterEntries(
          entries,
          [
            { field: 'tags.*', value: ['tag-1', 'tag-4'], matchAll: true },
            { field: 'language', value: 'gr' },
          ],
          undefined,
        ),
      ).toEqual([mockIndexEntry, mockTags1and4Entry]);
    });
  });

  describe('file rule', () => {
    it('should filter based on file name', () => {
      expect(filterEntries(entries, { pattern: '^index.md$' }, undefined)).toEqual([
        mockIndexEntry,
      ]);

      expect(filterEntries(entries, { pattern: '^_index.md$' }, undefined)).toEqual([
        mockUnderscoreIndexEntry,
      ]);

      expect(filterEntries(entries, { pattern: 'index.md$' }, undefined)).toEqual([
        mockIndexEntry,
        mockUnderscoreIndexEntry,
      ]);

      // File names containing the word file (case insensitive)
      expect(filterEntries(entries, { pattern: '[fF][iI][lL][eE]' }, undefined)).toEqual([
        mockEnglishEntry,
        mockFrenchEntry,
        mockRandomFileNameEntry,
      ]);
    });

    it('should filter based on multiple rules (must match all rules)', () => {
      // File names containing the word file (case insensitive)
      expect(
        filterEntries(entries, [{ pattern: '[fF][iI][lL][eE]' }, { pattern: 'some' }], undefined),
      ).toEqual([mockRandomFileNameEntry]);
    });
  });

  describe('combined field and file rule', () => {
    it('should filter based on multiple rules (must match all rules)', () => {
      expect(
        filterEntries(
          entries,
          [{ pattern: 'index.md$' }, { field: 'tags.*', value: 'tag-3' }],
          undefined,
        ),
      ).toEqual([mockUnderscoreIndexEntry]);
    });
  });

  describe('nested fields', () => {
    it('should filter based on multiple rules (must match all rules)', () => {
      expect(
        filterEntries(entries, [{ field: 'nested.object.field', value: 'yes' }], undefined),
      ).toEqual([mockNestedEntry]);
    });
  });
});
