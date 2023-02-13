/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import ListControl from '../ListControl';

import type { ListField } from '@staticcms/core/interface';

const singletonListField: ListField = {
  widget: 'list',
  name: 'singleton',
  fields: [
    {
      widget: 'string',
      name: 'stringInput',
      default: 'string default',
    },
  ],
};

const multipleFieldsListField: ListField = {
  widget: 'list',
  name: 'multipleFields',
  fields: [
    {
      widget: 'string',
      name: 'stringInput',
      default: 'string default',
    },
    {
      widget: 'text',
      name: 'textInput',
      default: 'text default',
    },
  ],
};

const multipleFieldsValue = [
  { stringInput: 'String Value 1', textInput: 'Text Value 1' },
  { stringInput: 'String Value 2', textInput: 'Text Value 2' },
];

jest.mock('@staticcms/core/components/editor/EditorControlPane/EditorControl', () => {
  return jest.fn(props => {
    const { parentPath, field, value } = props;
    return (
      <div data-testid="editor-control">
        <div data-testid="parentPath">{parentPath}</div>
        <div data-testid="fieldName">{field.name}</div>
        <div data-testid="value">{JSON.stringify(value)}</div>
      </div>
    );
  });
});

describe(ListControl.name, () => {
  const renderControl = createWidgetControlHarness(ListControl, {
    field: singletonListField,
    label: 'List Control',
    path: 'list',
  });

  describe('multiple field list', () => {
    it('renders empty div by default', () => {
      renderControl({
        field: multipleFieldsListField,
        value: multipleFieldsValue,
      });
      expect(screen.getByTestId('object-control-0')).not.toBeVisible();
      expect(screen.getByTestId('object-control-1')).not.toBeVisible();
    });

    it('renders values when opened', async () => {
      renderControl({ field: multipleFieldsListField, value: multipleFieldsValue });

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).toBeVisible();
      expect(getByTestId(itemOne, 'list-item-title').textContent).toBe('String Value 1');
      expect(getByTestId(itemOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemOne, 'fieldName').textContent).toBe('0');
      expect(JSON.parse(getByTestId(itemOne, 'value').textContent ?? '')).toEqual({
        stringInput: 'String Value 1',
        textInput: 'Text Value 1',
      });

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).toBeVisible();
      expect(getByTestId(itemTwo, 'list-item-title').textContent).toBe('String Value 2');
      expect(getByTestId(itemTwo, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemTwo, 'fieldName').textContent).toBe('1');
      expect(JSON.parse(getByTestId(itemTwo, 'value').textContent ?? '')).toEqual({
        stringInput: 'String Value 2',
        textInput: 'Text Value 2',
      });
    });

    it('outputs value as object array when adding new value', async () => {
      const {
        props: { onChange },
      } = renderControl({ field: multipleFieldsListField, value: multipleFieldsValue });

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      await userEvent.click(getByTestId(headerBar, 'add-button'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([
        ...multipleFieldsValue,
        {
          stringInput: 'string default',
          textInput: 'text default',
        },
      ]);
    });

    it('outputs value as object array when removing existing value', async () => {
      const {
        props: { onChange },
      } = renderControl({ field: multipleFieldsListField, value: multipleFieldsValue });

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      const itemOne = screen.getByTestId('object-control-0');
      await userEvent.click(getByTestId(itemOne, 'remove-button'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([
        { stringInput: 'String Value 2', textInput: 'Text Value 2' },
      ]);
    });
  });

  describe('singleton list', () => {
    it('renders empty div by default', () => {
      renderControl({ value: ['Value 1', 'Value 2'] });

      expect(screen.getByTestId('object-control-0')).not.toBeVisible();
      expect(screen.getByTestId('object-control-1')).not.toBeVisible();
    });

    it('renders values when opened', async () => {
      renderControl({ value: ['Value 1', 'Value 2'] });

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).toBeVisible();
      expect(getByTestId(itemOne, 'list-item-title').textContent).toBe('Value 1');
      expect(getByTestId(itemOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemOne, 'fieldName').textContent).toBe('0');
      expect(JSON.parse(getByTestId(itemOne, 'value').textContent ?? '')).toEqual({
        stringInput: 'Value 1',
      });

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).toBeVisible();
      expect(getByTestId(itemTwo, 'list-item-title').textContent).toBe('Value 2');
      expect(getByTestId(itemTwo, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemTwo, 'fieldName').textContent).toBe('1');
      expect(JSON.parse(getByTestId(itemTwo, 'value').textContent ?? '')).toEqual({
        stringInput: 'Value 2',
      });
    });

    it('outputs value as singleton array when adding new value', async () => {
      const {
        props: { onChange },
      } = renderControl({ value: ['Value 1', 'Value 2'] });

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      await userEvent.click(getByTestId(headerBar, 'add-button'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['Value 1', 'Value 2', 'string default']);
    });

    it('outputs value as singleton array when removing existing value', async () => {
      const {
        props: { onChange },
      } = renderControl({ value: ['Value 1', 'Value 2'] });

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      const itemOne = screen.getByTestId('object-control-0');
      await userEvent.click(getByTestId(itemOne, 'remove-button'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['Value 2']);
    });
  });
});
