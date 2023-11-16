/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import validator from '../validator';
import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';

import type { KeyValueField } from '@staticcms/core';

describe('validator key value', () => {
  const t = jest.fn();
  const minMaxKeyValueField: KeyValueField = {
    label: 'Key Value',
    name: 'mock_key_value',
    widget: 'keyvalue',
    min: 2,
    max: 5,
  };

  beforeEach(() => {
    t.mockReset();
    t.mockReturnValue('mock translated text');
  });

  describe('range', () => {
    it('should not throw error if number of values is in range', () => {
      expect(
        validator({
          field: minMaxKeyValueField,
          value: [
            { key: 'Key 1', value: 'Value 1' },
            { key: 'Key 2', value: 'Value 2' },
          ],
          t,
        }),
      ).toBeFalsy();

      expect(t).toBeCalledTimes(2);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: minMaxKeyValueField,
          value: [{ key: 'Key 1', value: 'Value 1' }],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toBeCalledTimes(3);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
      expect(t).toHaveBeenNthCalledWith(3, 'editor.editorControlPane.widget.rangeCount', {
        fieldLabel: 'Key Value',
        minCount: 2,
        maxCount: 5,
        count: 1,
      });
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: minMaxKeyValueField,
          value: [
            { key: 'Key 1', value: 'Value 1' },
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
            { key: 'Key 4', value: 'Value 4' },
            { key: 'Key 5', value: 'Value 5' },
            { key: 'Key 6', value: 'Value 6' },
          ],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toHaveBeenCalledWith('editor.editorControlPane.widget.rangeCount', {
        fieldLabel: 'Key Value',
        minCount: 2,
        maxCount: 5,
        count: 6,
      });
    });
  });

  describe('range exact', () => {
    const mockRangeExactKeyValueField: KeyValueField = {
      ...minMaxKeyValueField,
      max: 2,
    };

    it('should not throw error if number of values is in range', () => {
      expect(
        validator({
          field: mockRangeExactKeyValueField,
          value: [
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
          ],
          t,
        }),
      ).toBeFalsy();

      expect(t).toBeCalledTimes(2);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: mockRangeExactKeyValueField,
          value: [{ key: 'Key 2', value: 'Value 2' }],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toBeCalledTimes(3);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
      expect(t).toHaveBeenNthCalledWith(3, 'editor.editorControlPane.widget.rangeCountExact', {
        fieldLabel: 'Key Value',
        minCount: 2,
        maxCount: 2,
        count: 1,
      });
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: mockRangeExactKeyValueField,
          value: [
            { key: 'Key 1', value: 'Value 1' },
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
            { key: 'Key 4', value: 'Value 4' },
            { key: 'Key 5', value: 'Value 5' },
            { key: 'Key 6', value: 'Value 6' },
          ],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toBeCalledTimes(3);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
      expect(t).toHaveBeenNthCalledWith(3, 'editor.editorControlPane.widget.rangeCountExact', {
        fieldLabel: 'Key Value',
        minCount: 2,
        maxCount: 2,
        count: 6,
      });
    });
  });

  describe('min', () => {
    const mockMinKeyValueField: KeyValueField = {
      ...minMaxKeyValueField,
      max: undefined,
    };

    it('should not throw error if number of values is greater than or equal to min', () => {
      expect(
        validator({
          field: mockMinKeyValueField,
          value: [
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
          ],
          t,
        }),
      ).toBeFalsy();

      expect(t).toBeCalledTimes(2);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');

      t.mockReset();

      expect(
        validator({
          field: mockMinKeyValueField,
          value: [
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
            { key: 'Key 4', value: 'Value 4' },
          ],
          t,
        }),
      ).toBeFalsy();

      expect(t).toBeCalledTimes(2);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
    });

    it('should throw error if number of values is less than min', () => {
      expect(
        validator({
          field: mockMinKeyValueField,
          value: [{ key: 'Key 2', value: 'Value 2' }],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toBeCalledTimes(3);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
      expect(t).toHaveBeenNthCalledWith(3, 'editor.editorControlPane.widget.rangeMin', {
        fieldLabel: 'Key Value',
        minCount: 2,
        maxCount: undefined,
        count: 1,
      });
    });
  });

  describe('max', () => {
    const mockMaxKeyValueField: KeyValueField = {
      ...minMaxKeyValueField,
      min: undefined,
    };

    it('should not throw error if number of values is less than or equal to max', () => {
      expect(
        validator({
          field: mockMaxKeyValueField,
          value: [
            { key: 'Key 1', value: 'Value 1' },
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
            { key: 'Key 4', value: 'Value 4' },
            { key: 'Key 5', value: 'Value 5' },
          ],
          t,
        }),
      ).toBeFalsy();

      expect(t).toBeCalledTimes(2);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');

      t.mockReset();

      expect(
        validator({
          field: mockMaxKeyValueField,
          value: [
            { key: 'Key 1', value: 'Value 1' },
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
          ],
          t,
        }),
      ).toBeFalsy();

      expect(t).toBeCalledTimes(2);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
    });

    it('should throw error if number of values is greater than max', () => {
      expect(
        validator({
          field: mockMaxKeyValueField,
          value: [
            { key: 'Key 1', value: 'Value 1' },
            { key: 'Key 2', value: 'Value 2' },
            { key: 'Key 3', value: 'Value 3' },
            { key: 'Key 4', value: 'Value 4' },
            { key: 'Key 5', value: 'Value 5' },
            { key: 'Key 6', value: 'Value 6' },
          ],
          t,
        }),
      ).toEqual({
        type: ValidationErrorTypes.RANGE,
        message: 'mock translated text',
      });

      expect(t).toBeCalledTimes(3);
      expect(t).toHaveBeenNthCalledWith(1, 'editor.editorWidgets.keyvalue.key');
      expect(t).toHaveBeenNthCalledWith(2, 'editor.editorWidgets.keyvalue.value');
      expect(t).toHaveBeenNthCalledWith(3, 'editor.editorControlPane.widget.rangeMax', {
        fieldLabel: 'Key Value',
        minCount: undefined,
        maxCount: 5,
        count: 6,
      });
    });
  });
});
