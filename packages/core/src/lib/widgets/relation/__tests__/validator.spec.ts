/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import validator from '../validator';
import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';

import type { RelationField } from '@staticcms/core/interface';

describe('validator relation', () => {
  const t = jest.fn();
  const minMaxRelationField: RelationField = {
    label: 'Relation',
    name: 'relation',
    widget: 'relation',
    collection: 'posts',
    display_fields: ['title', 'date'],
    search_fields: ['title', 'body'],
    value_field: 'title',
    multiple: true,
    min: 2,
    max: 5,
  };

  beforeEach(() => {
    t.mockReset();
    t.mockReturnValue('mock translated text');
  });

  it('should ignore min and max if multiple is false', () => {
    expect(
      validator({
        field: {
          ...minMaxRelationField,
          multiple: false,
        },
        value: 'Option 2',
        t,
      }),
    ).toBeFalsy();

    expect(t).not.toHaveBeenCalled();
  });

  it('should ignore min and max if value is a string', () => {
    expect(
      validator({
        field: minMaxRelationField,
        value: 'Option 2',
        t,
      }),
    ).toBeFalsy();

    expect(t).not.toHaveBeenCalled();
  });

  describe('range', () => {
    it('should not throw error if number of values is in range', () => {
      expect(
        validator({
          field: minMaxRelationField,
          value: ['Option 2', 'Option 3', 'Option 4'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: minMaxRelationField,
          value: ['Option 2'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCount', {
        fieldLabel: 'Relation',
        minCount: 2,
        maxCount: 5,
        count: 1,
      });
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: minMaxRelationField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCount', {
        fieldLabel: 'Relation',
        minCount: 2,
        maxCount: 5,
        count: 6,
      });
    });
  });

  describe('range exact', () => {
    const mockRangeExactRelationField: RelationField = {
      ...minMaxRelationField,
      max: 2,
    };

    it('should not throw error if number of values is in range', () => {
      expect(
        validator({
          field: mockRangeExactRelationField,
          value: ['Option 2', 'Option 3'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: mockRangeExactRelationField,
          value: ['Option 2'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCountExact', {
        fieldLabel: 'Relation',
        minCount: 2,
        maxCount: 2,
        count: 1,
      });
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: mockRangeExactRelationField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCountExact', {
        fieldLabel: 'Relation',
        minCount: 2,
        maxCount: 2,
        count: 6,
      });
    });
  });

  describe('min', () => {
    const mockMinRelationField: RelationField = {
      ...minMaxRelationField,
      max: undefined,
    };

    it('should not throw error if number of values is greater than or equal to min', () => {
      expect(
        validator({
          field: mockMinRelationField,
          value: ['Option 2', 'Option 3'],
          t,
        }),
      ).toBeFalsy();

      expect(
        validator({
          field: mockMinRelationField,
          value: ['Option 2', 'Option 3', 'Option 4'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: mockMinRelationField,
          value: ['Option 2'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeMin', {
        fieldLabel: 'Relation',
        minCount: 2,
        maxCount: undefined,
        count: 1,
      });
    });
  });

  describe('max', () => {
    const mockMaxRelationField: RelationField = {
      ...minMaxRelationField,
      min: undefined,
    };

    it('should not throw error if number of values is less than or equal to max', () => {
      expect(
        validator({
          field: mockMaxRelationField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
          t,
        }),
      ).toBeFalsy();

      expect(
        validator({
          field: mockMaxRelationField,
          value: ['Option 1', 'Option 2', 'Option 3'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: mockMaxRelationField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeMax', {
        fieldLabel: 'Relation',
        minCount: undefined,
        maxCount: 5,
        count: 6,
      });
    });
  });
});
