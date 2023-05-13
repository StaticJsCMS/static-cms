/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';
import { mockColorField } from '@staticcms/test/data/fields.mock';
import validator from '../validator';

describe('validator relation', () => {
  const t = jest.fn();

  beforeEach(() => {
    t.mockReset();
    t.mockImplementation((key: string) => key);
  });

  describe('hex code', () => {
    it('should accept 6 digit hex code', () => {
      expect(
        validator({
          field: mockColorField,
          value: '#ffffff',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should accept 4 digit hex code', () => {
      expect(
        validator({
          field: mockColorField,
          value: '#1b30',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should accept 3 digit hex code', () => {
      expect(
        validator({
          field: mockColorField,
          value: '#1b3',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should return error on hex code with invalid characters', () => {
      expect(
        validator({
          field: mockColorField,
          value: '#fzffOm',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: '#fzffOm',
      });
    });

    it('should return error on hex code that is not 3, 4 or 6 characters', () => {
      expect(
        validator({
          field: mockColorField,
          value: '#ff',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: '#ff',
      });
    });

    it('should return error on hex code without pound sign', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'ffffff',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidHexCode',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidHexCode');
    });
  });

  describe('rgb', () => {
    it('should accept rgb string with commas', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgb(25, 50, 5)',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should accept rgb string with just red and green', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgb(25, 50)',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should accept rgb string without commas', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgb(25 50 5)',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should return error with no parentheses', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgb 25 50 5',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: 'rgb 25 50 5',
      });
    });

    it('should return error with invalid characters', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgb(25f, 50, B)',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: 'rgb(25f, 50, B)',
      });
    });

    it('should return error with just red', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgb(25)',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: 'rgb(25)',
      });
    });
  });

  describe('rgba', () => {
    it('should accept rgba string with commas', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgba(25, 50, 5, 0.5)',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should accept rgba string without alpha', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgba(25, 50, 5)',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should accept rgba string with just red and green', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgba(25, 50)',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should accept rgba string without commas', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgba(25 50 5 0.5)',
          t,
        }),
      ).toBeFalsy();

      expect(t).not.toHaveBeenCalled();
    });

    it('should return error with no parentheses', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgba 25 50 5 0.5',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: 'rgba 25 50 5 0.5',
      });
    });

    it('should return error with invalid characters', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgba(25f, 50, B, 0.z)',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: 'rgba(25f, 50, B, 0.z)',
      });
    });

    it('should return error with just red', () => {
      expect(
        validator({
          field: mockColorField,
          value: 'rgba(25)',
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.CUSTOM,
        message: 'editor.editorControlPane.widget.invalidColor',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.invalidColor', {
        color: 'rgba(25)',
      });
    });
  });
});
