import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { isHidden } from '../field.util';
import { I18N_FIELD_NONE } from '../../i18n';

import type { StringField, TextField } from '@staticcms/core';

describe('filterEntries', () => {
  const mockTitleField: StringField = {
    label: 'Title',
    name: 'title',
    widget: 'string',
  };

  const mockUrlField: StringField = {
    label: 'URL',
    name: 'url',
    widget: 'string',
    i18n: I18N_FIELD_NONE,
    condition: {
      field: 'type',
      value: 'external',
    },
  };

  const mockBodyField: TextField = {
    label: 'Body',
    name: 'body',
    widget: 'text',
    condition: [
      {
        field: 'type',
        value: 'internal',
      },
      {
        field: 'hasSummary',
        value: true,
      },
    ],
  };

  const mockExternalEntry = createMockEntry({
    path: 'path/to/file-1.md',
    data: {
      title: 'I am a title',
      type: 'external',
      url: 'http://example.com',
      hasSummary: false,
    },
  });

  const mockInternalEntry = createMockEntry({
    path: 'path/to/file-1.md',
    data: {
      title: 'I am a title',
      type: 'internal',
      body: 'I am the body of your post',
      hasSummary: false,
    },
  });

  const mockHasSummaryEntry = createMockEntry({
    path: 'path/to/file-1.md',
    data: {
      title: 'I am a title',
      type: 'external',
      url: 'http://example.com',
      body: 'I am the body of your post',
      hasSummary: true,
    },
  });

  describe('isHidden', () => {
    it('should show field by default', () => {
      expect(isHidden(mockTitleField, mockExternalEntry, undefined)).toBeFalsy();
    });

    it('should hide field if single condition is not met', () => {
      expect(isHidden(mockUrlField, mockInternalEntry, undefined)).toBeTruthy();
    });

    it('should show field if single condition is met', () => {
      expect(isHidden(mockUrlField, mockExternalEntry, undefined)).toBeFalsy();
    });

    it('should hide field if all multiple conditions are not met', () => {
      expect(isHidden(mockBodyField, mockExternalEntry, undefined)).toBeTruthy();
    });

    it('should show field if multiple conditions are met', () => {
      expect(isHidden(mockBodyField, mockHasSummaryEntry, undefined)).toBeFalsy();
      expect(isHidden(mockBodyField, mockInternalEntry, undefined)).toBeFalsy();
    });

    it('should show field if entry is undefined', () => {
      expect(isHidden(mockTitleField, undefined, undefined)).toBeFalsy();
      expect(isHidden(mockUrlField, undefined, undefined)).toBeFalsy();
      expect(isHidden(mockBodyField, undefined, undefined)).toBeFalsy();
    });

    describe('inside list', () => {
      const mockInsideListEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          list: [
            {
              title: 'I am a title',
              type: 'external',
              url: 'http://example.com',
              hasSummary: false,
            },
            {
              title: 'I am a title',
              type: 'internal',
              body: 'I am the body of your post',
              hasSummary: false,
            },
            {
              title: 'I am a title',
              type: 'external',
              url: 'http://example.com',
              body: 'I am the body of your post',
              hasSummary: true,
            },
          ],
        },
      });

      it('should show field by default', () => {
        expect(isHidden(mockTitleField, mockInsideListEntry, 'list.0')).toBeFalsy();
      });

      it('should hide field if single condition is not met', () => {
        expect(isHidden(mockUrlField, mockInsideListEntry, 'list.1')).toBeTruthy();
      });

      it('should show field if single condition is met', () => {
        expect(isHidden(mockUrlField, mockInsideListEntry, 'list.0')).toBeFalsy();
      });

      it('should hide field if all multiple conditions are not met', () => {
        expect(isHidden(mockBodyField, mockInsideListEntry, 'list.0')).toBeTruthy();
      });

      it('should show field if multiple conditions are met', () => {
        expect(isHidden(mockBodyField, mockInsideListEntry, 'list.2')).toBeFalsy();
        expect(isHidden(mockBodyField, mockInsideListEntry, 'list.1')).toBeFalsy();
      });

      it('should show field if entry is undefined', () => {
        expect(isHidden(mockTitleField, undefined, 'list.0')).toBeFalsy();
        expect(isHidden(mockUrlField, undefined, 'list.0')).toBeFalsy();
        expect(isHidden(mockBodyField, undefined, 'list.0')).toBeFalsy();
      });
    });

    describe('searching list items', () => {
      const mockInsideListEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          list: [
            {
              title: 'I am a title',
              type: 'external',
              url: 'http://example.com',
              hasSummary: false,
            },
            {
              title: 'I am a title',
              type: 'internal',
              body: 'I am the body of your post',
              hasSummary: false,
            },
            {
              title: 'I am a title',
              type: 'external',
              url: 'http://example.com',
              body: 'I am the body of your post',
              hasSummary: true,
            },
          ],
        },
      });

      const mockPatternUrlField: StringField = {
        label: 'URL',
        name: 'url',
        widget: 'string',
        i18n: I18N_FIELD_NONE,
        condition: {
          field: 'list.*',
          pattern: /external/,
        },
      };

      const mockPatternUrlMultipleConditionsField: StringField = {
        label: 'URL',
        name: 'url',
        widget: 'string',
        i18n: I18N_FIELD_NONE,
        condition: [
          {
            field: 'list.*',
            pattern: /external/,
          },
          {
            field: 'list.*',
            pattern: /true/,
          },
        ],
      };

      it('should show field by default', () => {
        expect(isHidden(mockTitleField, mockInsideListEntry, undefined)).toBeFalsy();
      });

      it('should hide field if single condition is not met', () => {
        expect(isHidden(mockUrlField, mockInsideListEntry, undefined)).toBeTruthy();
      });

      it('should show field if single condition is met', () => {
        expect(isHidden(mockPatternUrlField, mockInsideListEntry, undefined)).toBeFalsy();
      });

      it('should hide field if all multiple conditions are not met', () => {
        expect(isHidden(mockBodyField, mockInsideListEntry, undefined)).toBeTruthy();
      });

      it('should show field if multiple conditions are met', () => {
        expect(
          isHidden(mockPatternUrlMultipleConditionsField, mockInsideListEntry, undefined),
        ).toBeFalsy();
      });

      it('should show field if entry is undefined', () => {
        expect(isHidden(mockTitleField, undefined, undefined)).toBeFalsy();
        expect(isHidden(mockUrlField, undefined, undefined)).toBeFalsy();
        expect(isHidden(mockBodyField, undefined, undefined)).toBeFalsy();
      });
    });

    describe('matching list', () => {
      const mockDependsOnEmptyListField: StringField = {
        label: 'Title',
        name: 'title',
        widget: 'string',
        condition: [
          {
            field: 'list',
            pattern: /^(\[\])?$/,
          },
        ],
      };

      const mockDependsOnListWithValueField: StringField = {
        label: 'Title',
        name: 'title',
        widget: 'string',
        condition: [
          {
            field: 'list',
            pattern: /"something":"yes"/,
          },
        ],
      };

      const mockEmptyListEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          default: 'http://example.com',
          list: [],
        },
      });

      const mockUndefinedListEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          default: 'http://example.com',
          list: undefined,
        },
      });

      const mockListWithValueEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          default: 'http://example.com',
          list: [
            {
              something: 'yes',
            },
          ],
        },
      });

      it('should match empty list', () => {
        expect(isHidden(mockDependsOnEmptyListField, mockEmptyListEntry, undefined)).toBeFalsy();
      });

      it('should match undefined list', () => {
        expect(
          isHidden(mockDependsOnEmptyListField, mockUndefinedListEntry, undefined),
        ).toBeFalsy();
      });

      it('should not match list with value', () => {
        expect(
          isHidden(mockDependsOnEmptyListField, mockListWithValueEntry, undefined),
        ).toBeTruthy();
      });

      it('should not match empty list', () => {
        expect(
          isHidden(mockDependsOnListWithValueField, mockEmptyListEntry, undefined),
        ).toBeTruthy();
      });

      it('should not match undefined list', () => {
        expect(
          isHidden(mockDependsOnListWithValueField, mockUndefinedListEntry, undefined),
        ).toBeTruthy();
      });

      it('should match list with specific value', () => {
        expect(
          isHidden(mockDependsOnListWithValueField, mockListWithValueEntry, undefined),
        ).toBeFalsy();
      });
    });

    describe('matching object', () => {
      const mockDependsOnEmptyObjectField: StringField = {
        label: 'Title',
        name: 'title',
        widget: 'string',
        condition: [
          {
            field: 'object',
            pattern: /^({})?$/,
          },
        ],
      };

      const mockDependsOnObjectWithValueField: StringField = {
        label: 'Title',
        name: 'title',
        widget: 'string',
        condition: [
          {
            field: 'object',
            pattern: /"something":"yes"/,
          },
        ],
      };

      const mockEmptyObjectEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          default: 'http://example.com',
          object: {},
        },
      });

      const mockUndefinedObjectEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          default: 'http://example.com',
          object: undefined,
        },
      });

      const mockObjectWithValueEntry = createMockEntry({
        path: 'path/to/file-1.md',
        data: {
          default: 'http://example.com',
          object: {
            something: 'yes',
          },
        },
      });

      it('should match empty object', () => {
        expect(
          isHidden(mockDependsOnEmptyObjectField, mockEmptyObjectEntry, undefined),
        ).toBeFalsy();
      });

      it('should match undefined object', () => {
        expect(
          isHidden(mockDependsOnEmptyObjectField, mockUndefinedObjectEntry, undefined),
        ).toBeFalsy();
      });

      it('should not match object with value', () => {
        expect(
          isHidden(mockDependsOnEmptyObjectField, mockObjectWithValueEntry, undefined),
        ).toBeTruthy();
      });

      it('should not match empty object', () => {
        expect(
          isHidden(mockDependsOnObjectWithValueField, mockEmptyObjectEntry, undefined),
        ).toBeTruthy();
      });

      it('should not match undefined object', () => {
        expect(
          isHidden(mockDependsOnObjectWithValueField, mockUndefinedObjectEntry, undefined),
        ).toBeTruthy();
      });

      it('should match object with specific value', () => {
        expect(
          isHidden(mockDependsOnObjectWithValueField, mockObjectWithValueEntry, undefined),
        ).toBeFalsy();
      });
    });
  });
});
