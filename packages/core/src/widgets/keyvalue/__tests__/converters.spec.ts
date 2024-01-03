/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import converters from '../converters';

import type { KeyValueField } from '@staticcms/core';

describe('converters key value', () => {
  const keyValueField: KeyValueField = {
    label: 'Key Value',
    name: 'mock_key_value',
    widget: 'keyvalue',
  };

  const storageValue = {
    'Key 1': 'Value 1',
    'Key 2': 'Value 2',
  };

  const internalValue = [
    { key: 'Key 1', value: 'Value 1' },
    { key: 'Key 2', value: 'Value 2' },
  ];

  it('should deserialize', () => {
    expect(converters.deserialize(storageValue, keyValueField)).toEqual(internalValue);
  });

  it('should serialize', () => {
    expect(converters.serialize(internalValue, keyValueField)).toEqual(storageValue);
  });
});
