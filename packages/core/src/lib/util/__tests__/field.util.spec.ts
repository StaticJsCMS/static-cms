import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { isHidden } from '../field.util';
import { I18N_FIELD_NONE } from '../../i18n';

import type { StringOrTextField } from '@staticcms/core/interface';

describe('filterEntries', () => {
  const mockTitleField: StringOrTextField = {
    label: 'Title',
    name: 'title',
    widget: 'string',
  };

  const mockUrlField: StringOrTextField = {
    label: 'URL',
    name: 'url',
    widget: 'string',
    i18n: I18N_FIELD_NONE,
    condition: {
      field: 'type',
      value: 'external',
    },
  };

  const mockBodyField: StringOrTextField = {
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
      expect(isHidden(mockTitleField, mockExternalEntry)).toBeFalsy();
    });

    it('should hide field if single condition is not met', () => {
      expect(isHidden(mockUrlField, mockInternalEntry)).toBeTruthy();
    });

    it('should show field if single condition is met', () => {
      expect(isHidden(mockUrlField, mockExternalEntry)).toBeFalsy();
    });

    it('should hide field if all multiple conditions are not met', () => {
      expect(isHidden(mockBodyField, mockExternalEntry)).toBeTruthy();
    });

    it('should show field if single condition is met', () => {
      expect(isHidden(mockBodyField, mockHasSummaryEntry)).toBeFalsy();
      expect(isHidden(mockBodyField, mockInternalEntry)).toBeFalsy();
    });

    it('should show field if entry is undefined', () => {
      expect(isHidden(mockTitleField, undefined)).toBeFalsy();
      expect(isHidden(mockUrlField, undefined)).toBeFalsy();
      expect(isHidden(mockBodyField, undefined)).toBeFalsy();
    });
  });
});
