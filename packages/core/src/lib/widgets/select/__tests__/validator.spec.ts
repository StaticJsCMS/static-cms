/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import validator from '../validator';
import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';

import type { SelectField } from '@staticcms/core/interface';

describe('validator select', () => {
  const t = jest.fn();
  const minMaxSelectField: SelectField = {
    label: 'Select',
    name: 'mock_select',
    widget: 'select',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
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
          ...minMaxSelectField,
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
        field: minMaxSelectField,
        value: 'Option 2',
        t,
      }),
    ).toBeFalsy();

    expect(t).not.toHaveBeenCalled();
  });

  it('should ignore min and max if value is a number', () => {
    expect(
      validator({
        field: minMaxSelectField,
        value: 2,
        t,
      }),
    ).toBeFalsy();

    expect(t).not.toHaveBeenCalled();
  });

  describe('range', () => {
    it('should not throw error if number of values is in range', () => {
      expect(
        validator({
          field: minMaxSelectField,
          value: ['Option 2', 'Option 3', 'Option 4'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: minMaxSelectField,
          value: ['Option 2'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCount', {
        fieldLabel: 'Select',
        minCount: 2,
        maxCount: 5,
        count: 1,
      });
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: minMaxSelectField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCount', {
        fieldLabel: 'Select',
        minCount: 2,
        maxCount: 5,
        count: 6,
      });
    });
  });

  describe('range exact', () => {
    const mockRangeExactSelectField: SelectField = {
      ...minMaxSelectField,
      max: 2,
    };

    it('should not throw error if number of values is in range', () => {
      expect(
        validator({
          field: mockRangeExactSelectField,
          value: ['Option 2', 'Option 3'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: mockRangeExactSelectField,
          value: ['Option 2'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCountExact', {
        fieldLabel: 'Select',
        minCount: 2,
        maxCount: 2,
        count: 1,
      });
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: mockRangeExactSelectField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCountExact', {
        fieldLabel: 'Select',
        minCount: 2,
        maxCount: 2,
        count: 6,
      });
    });
  });

  describe('min', () => {
    const mockMinSelectField: SelectField = {
      ...minMaxSelectField,
      max: undefined,
    };

    it('should not throw error if number of values is greater than or equal to min', () => {
      expect(
        validator({
          field: mockMinSelectField,
          value: ['Option 2', 'Option 3'],
          t,
        }),
      ).toBeFalsy();

      expect(
        validator({
          field: mockMinSelectField,
          value: ['Option 2', 'Option 3', 'Option 4'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: mockMinSelectField,
          value: ['Option 2'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeMin', {
        fieldLabel: 'Select',
        minCount: 2,
        maxCount: undefined,
        count: 1,
      });
    });
  });

  describe('max', () => {
    const mockMaxSelectField: SelectField = {
      ...minMaxSelectField,
      min: undefined,
    };

    it('should not throw error if number of values is less than or equal to max', () => {
      expect(
        validator({
          field: mockMaxSelectField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
          t,
        }),
      ).toBeFalsy();

      expect(
        validator({
          field: mockMaxSelectField,
          value: ['Option 1', 'Option 2', 'Option 3'],
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: mockMaxSelectField,
          value: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeMax', {
        fieldLabel: 'Select',
        minCount: undefined,
        maxCount: 5,
        count: 6,
      });
    });
  });
});
