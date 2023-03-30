/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';
import { mockNumberField } from '@staticcms/test/data/fields.mock';
import validator from '../validator';

import type { NumberField } from '@staticcms/core/interface';

describe('validator number', () => {
  const t = jest.fn();

  beforeEach(() => {
    t.mockReset();
    t.mockReturnValue('mock translated text');
  });

  const mockRangeNumberField: NumberField = {
    label: 'Number',
    name: 'mock_number',
    widget: 'number',
    min: 10,
    max: 20,
  };

  it('should ignore min and max if a pattern is given', () => {
    expect(
      validator({
        field: { ...mockRangeNumberField, pattern: ['3', 'Must be three'] },
        value: 5,
        t,
      }),
    ).toBeFalsy();

    expect(t).not.toHaveBeenCalled();
  });

  it('should ignore min and max if value is null or undefined', () => {
    expect(
      validator({
        field: mockRangeNumberField,
        value: null,
        t,
      }),
    ).toBeFalsy();

    expect(
      validator({
        field: mockRangeNumberField,
        value: undefined,
        t,
      }),
    ).toBeFalsy();

    expect(t).not.toHaveBeenCalled();
  });

  describe('number value', () => {
    it('should return no error if min and max are not set', () => {
      expect(validator({ field: mockNumberField, value: 5, t })).toBeFalsy();
      expect(t).not.toHaveBeenCalled();
    });

    describe('range', () => {
      it('should return no error if value in range', () => {
        expect(validator({ field: mockRangeNumberField, value: 15, t })).toBeFalsy();
        expect(t).not.toHaveBeenCalled();
      });

      it('should return range error if below min', () => {
        expect(validator({ field: mockRangeNumberField, value: 5, t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.range', {
          fieldLabel: 'Number',
          minValue: 10,
          maxValue: 20,
        });
      });

      it('should return range error if above max', () => {
        expect(validator({ field: mockRangeNumberField, value: 25, t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.range', {
          fieldLabel: 'Number',
          minValue: 10,
          maxValue: 20,
        });
      });

      it('should use field name in translation if label is not provided', () => {
        expect(
          validator({
            field: {
              ...mockRangeNumberField,
              label: undefined,
            },
            value: 5,
            t,
          }),
        ).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.range', {
          fieldLabel: 'mock_number',
          minValue: 10,
          maxValue: 20,
        });
      });
    });

    describe('min only', () => {
      const mockMinNumberField: NumberField = {
        label: 'Number',
        name: 'mock_number',
        widget: 'number',
        min: 10,
      };

      it('should return no error if value is greater than or equal to min', () => {
        expect(validator({ field: mockMinNumberField, value: 10, t })).toBeFalsy();
        expect(validator({ field: mockMinNumberField, value: 15, t })).toBeFalsy();
        expect(t).not.toHaveBeenCalled();
      });

      it('should return range error if below min', () => {
        expect(validator({ field: mockMinNumberField, value: 5, t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.min', {
          fieldLabel: 'Number',
          minValue: 10,
        });
      });

      it('should use field name in translation if label is not provided', () => {
        expect(
          validator({
            field: {
              ...mockMinNumberField,
              label: undefined,
            },
            value: 5,
            t,
          }),
        ).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.min', {
          fieldLabel: 'mock_number',
          minValue: 10,
        });
      });
    });

    describe('max only', () => {
      const mockMaxNumberField: NumberField = {
        label: 'Number',
        name: 'mock_number',
        widget: 'number',
        max: 1,
      };

      it('should return no error if value is less than or equal to max', () => {
        expect(validator({ field: mockMaxNumberField, value: 1, t })).toBeFalsy();
        expect(validator({ field: mockMaxNumberField, value: 0, t })).toBeFalsy();
        expect(t).not.toHaveBeenCalled();
      });

      it('should return range error if above max', () => {
        expect(validator({ field: mockMaxNumberField, value: 5, t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.max', {
          fieldLabel: 'Number',
          maxValue: 1,
        });
      });

      it('should use field name in translation if label is not provided', () => {
        expect(
          validator({
            field: {
              ...mockMaxNumberField,
              label: undefined,
            },
            value: 5,
            t,
          }),
        ).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.max', {
          fieldLabel: 'mock_number',
          maxValue: 1,
        });
      });
    });
  });

  describe('string value', () => {
    it('should return no error if min and max are not set', () => {
      expect(validator({ field: mockNumberField, value: '5', t })).toBeFalsy();
      expect(t).not.toHaveBeenCalled();
    });

    describe('range', () => {
      const mockRangeNumberField: NumberField = {
        label: 'Number',
        name: 'mock_number',
        widget: 'number',
        min: 10,
        max: 20,
      };

      it('should return no error if value in range', () => {
        expect(validator({ field: mockRangeNumberField, value: '15', t })).toBeFalsy();
        expect(t).not.toHaveBeenCalled();
      });

      it('should return range error if below min', () => {
        expect(validator({ field: mockRangeNumberField, value: '5', t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.range', {
          fieldLabel: 'Number',
          minValue: 10,
          maxValue: 20,
        });
      });

      it('should return range error if above max', () => {
        expect(validator({ field: mockRangeNumberField, value: '25', t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.range', {
          fieldLabel: 'Number',
          minValue: 10,
          maxValue: 20,
        });
      });

      it('should use field name in translation if label is not provided', () => {
        expect(
          validator({
            field: {
              ...mockRangeNumberField,
              label: undefined,
            },
            value: '5',
            t,
          }),
        ).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.range', {
          fieldLabel: 'mock_number',
          minValue: 10,
          maxValue: 20,
        });
      });
    });

    describe('min only', () => {
      const mockMinNumberField: NumberField = {
        label: 'Number',
        name: 'mock_number',
        widget: 'number',
        min: 10,
      };

      it('should return no error if value is greater than or equal to min', () => {
        expect(validator({ field: mockMinNumberField, value: 10, t })).toBeFalsy();
        expect(validator({ field: mockMinNumberField, value: 15, t })).toBeFalsy();
        expect(t).not.toHaveBeenCalled();
      });

      it('should return range error if below min', () => {
        expect(validator({ field: mockMinNumberField, value: '5', t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.min', {
          fieldLabel: 'Number',
          minValue: 10,
        });
      });

      it('should use field name in translation if label is not provided', () => {
        expect(
          validator({
            field: {
              ...mockMinNumberField,
              label: undefined,
            },
            value: '5',
            t,
          }),
        ).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.min', {
          fieldLabel: 'mock_number',
          minValue: 10,
        });
      });
    });

    describe('max only', () => {
      const mockMaxNumberField: NumberField = {
        label: 'Number',
        name: 'mock_number',
        widget: 'number',
        max: 1,
      };

      it('should return no error if value is less than or equal to max', () => {
        expect(validator({ field: mockMaxNumberField, value: 1, t })).toBeFalsy();
        expect(validator({ field: mockMaxNumberField, value: 0, t })).toBeFalsy();
        expect(t).not.toHaveBeenCalled();
      });

      it('should return range error if above max', () => {
        expect(validator({ field: mockMaxNumberField, value: '5', t })).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.max', {
          fieldLabel: 'Number',
          maxValue: 1,
        });
      });

      it('should use field name in translation if label is not provided', () => {
        expect(
          validator({
            field: {
              ...mockMaxNumberField,
              label: undefined,
            },
            value: '5',
            t,
          }),
        ).toEqual({
          type: ValidationErrorTypes.RANGE,
          message: 'mock translated text',
        });

        expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.max', {
          fieldLabel: 'mock_number',
          maxValue: 1,
        });
      });
    });
  });
});
