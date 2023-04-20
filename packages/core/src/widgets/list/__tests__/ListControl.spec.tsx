/**
 * @jest-environment jsdom
 */
import { DndContext } from '@dnd-kit/core';
import '@testing-library/jest-dom';
import { act, getByTestId, queryByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import ListControl from '../ListControl';

import type { DragEndEvent } from '@dnd-kit/core';
import type { ListField, ValueOrNestedValue } from '@staticcms/core/interface';

jest.unmock('uuid');

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

const typedFieldsListField: ListField = {
  widget: 'list',
  name: 'typedFields',
  types: [
    {
      widget: 'object',
      name: 'type1',
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
    },
    {
      widget: 'object',
      name: 'type2',
      fields: [
        {
          widget: 'number',
          name: 'numberInput2',
          default: 5,
        },
        {
          widget: 'text',
          name: 'stringInput',
          default: 'string default 2',
        },
      ],
    },
  ],
};

const typedFieldsValue = [
  { type: 'type1', stringInput: 'String Value 1', textInput: 'Text Value 1' },
  { type: 'type2', numberInput2: 10, stringInput: 'String Value 2' },
];

const typedOtherKeyFieldsListField: ListField = {
  widget: 'list',
  name: 'typedOtherKeyFields',
  type_key: 'someKey',
  types: [
    {
      widget: 'object',
      name: 'type1',
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
    },
    {
      widget: 'object',
      name: 'type2',
      fields: [
        {
          widget: 'number',
          name: 'numberInput2',
          default: 5,
        },
        {
          widget: 'text',
          name: 'stringInput',
          default: 'string default 2',
        },
      ],
    },
  ],
};

const typedOtherKeyFieldsValue = [
  { someKey: 'type1', stringInput: 'String Value 1', textInput: 'Text Value 1' },
  { someKey: 'type2', numberInput2: 10, stringInput: 'String Value 2' },
];

jest.mock('@staticcms/core/components/entry-editor/editor-control-pane/EditorControl', () => {
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

jest.mock('@dnd-kit/core', () => {
  const dndCore = jest.requireActual('@dnd-kit/core');
  return {
    ...dndCore,
    DndContext: jest.fn(),
  };
});

describe(ListControl.name, () => {
  const renderControl = createWidgetControlHarness(ListControl, {
    field: singletonListField,
    label: 'List Control',
    path: 'list',
  });

  let onDragEnd: ((event: DragEndEvent) => void) | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (DndContext as unknown as jest.Mock).mockImplementation((props: any) => {
    onDragEnd = props.onDragEnd;
    return <div>{props.children}</div>;
  });

  const renderListControl = async (
    options?: Parameters<typeof renderControl>[0],
  ): Promise<ReturnType<typeof renderControl>> => {
    const response = renderControl(options);

    await waitFor(async () =>
      expect(await response.queryByTestId('object-fields')).toBeInTheDocument(),
    );

    const values = response.props.value ?? [];
    for (let i = 0; i < values.length; i++) {
      await waitFor(async () =>
        expect(await response.queryByTestId(`object-control-${i}`)).toBeInTheDocument(),
      );
    }

    return response;
  };

  afterEach(() => {
    onDragEnd = null;
  });

  it('should render', async () => {
    const { getByTestId } = await renderListControl();

    const label = getByTestId('label');
    expect(label.textContent).toBe('singleton');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('list-field');
    expect(field).toHaveClass('group/active-list');

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).not.toHaveClass('mr-14');

    // List Widget uses pointer cursor
    expect(label).toHaveClass('cursor-pointer');

    // List Widget uses inline label layout
    expect(label).not.toHaveClass('px-3', 'pt-3');
  });

  it('should render as single list item', () => {
    const { getByTestId } = renderControl({ forSingleList: true });

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).toHaveClass('mr-14');
  });

  it('should show error', async () => {
    const { getByTestId } = await renderListControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const error = getByTestId('error');
    expect(error.textContent).toBe('i am an error');

    const field = getByTestId('list-field');
    expect(field).not.toHaveClass('group/active');

    const label = getByTestId('label');
    expect(label).toHaveClass('text-red-500');
  });

  it('uses singular label if provided when there is only one value', async () => {
    const { getByTestId, rerender } = await renderListControl({
      field: {
        ...singletonListField,
        label: 'Things',
        label_singular: 'Thing',
        collapsed: true,
      },
      value: ['single value'],
    });

    const label = getByTestId('label');
    expect(label.textContent).toBe('Thing');

    rerender({ value: ['value 1', 'value 2'] });

    expect(label.textContent).toBe('Things');
  });

  describe('multiple field list', () => {
    it('renders open by default', async () => {
      await renderListControl({
        field: multipleFieldsListField,
        value: multipleFieldsValue,
      });

      expect(screen.getByTestId('list-widget-children')).toBeInTheDocument();

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).toBeVisible();
      expect(getByTestId(itemOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemOne, 'fieldName').textContent).toBe('0');
      expect(getByTestId(itemOne, 'item-label').textContent).toBe('multipleFields');
      expect(queryByTestId(itemOne, 'item-summary')).not.toBeInTheDocument();
      expect(JSON.parse(getByTestId(itemOne, 'value').textContent ?? '')).toEqual({
        stringInput: 'String Value 1',
        textInput: 'Text Value 1',
      });

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).toBeVisible();
      expect(getByTestId(itemTwo, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemTwo, 'fieldName').textContent).toBe('1');
      expect(getByTestId(itemTwo, 'item-label').textContent).toBe('multipleFields');
      expect(queryByTestId(itemTwo, 'item-summary')).not.toBeInTheDocument();
      expect(JSON.parse(getByTestId(itemTwo, 'value').textContent ?? '')).toEqual({
        stringInput: 'String Value 2',
        textInput: 'Text Value 2',
      });
    });

    it('renders empty', async () => {
      const { queryByTestId } = await renderListControl({
        field: multipleFieldsListField,
        value: [],
      });

      expect(queryByTestId('list-widget-children')).not.toBeInTheDocument();
    });

    it('renders closed when collapsed is true', async () => {
      await renderListControl({
        value: multipleFieldsValue,
        field: { ...multipleFieldsListField, collapsed: true },
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).not.toBeVisible();
      expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe('String Value 1');

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).not.toBeVisible();
      expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe('String Value 2');

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(itemOne).toBeVisible();
      expect(itemTwo).toBeVisible();
    });

    it('uses singular label for item labels', async () => {
      await renderListControl({
        field: {
          ...multipleFieldsListField,
          label: 'Things',
          label_singular: 'Thing',
        },
        value: multipleFieldsValue,
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(getByTestId(itemOne, 'item-label').textContent).toBe('Thing');

      const itemTwo = screen.getByTestId('object-control-1');
      expect(getByTestId(itemTwo, 'item-label').textContent).toBe('Thing');
    });

    it('reorders value on drag and drop', async () => {
      const {
        props: { onChange },
      } = await renderListControl({
        value: multipleFieldsValue,
        field: multipleFieldsListField,
      });

      await act(async () => {
        onDragEnd?.({ active: { id: 1 }, over: { id: 0 } } as DragEndEvent);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([multipleFieldsValue[1], multipleFieldsValue[0]]);
    });

    it('does not show add button if allow_add is false', async () => {
      const { queryByTestId } = await renderListControl({
        field: { ...multipleFieldsListField, allow_add: false },
        value: multipleFieldsValue,
      });

      expect(queryByTestId('list-add')).not.toBeInTheDocument();
    });

    it('outputs value as object array when adding new value', async () => {
      const {
        props: { onChange },
      } = await renderListControl({ field: multipleFieldsListField, value: multipleFieldsValue });

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-add'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([
        ...multipleFieldsValue,
        {
          stringInput: 'string default',
          textInput: 'text default',
        },
      ]);
    });

    it('adds to top', async () => {
      const {
        props: { onChange },
      } = await renderListControl({
        field: { ...multipleFieldsListField, add_to_top: true },
        value: multipleFieldsValue,
      });

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-add'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([
        {
          stringInput: 'string default',
          textInput: 'text default',
        },
        ...multipleFieldsValue,
      ]);
    });

    it('outputs value as object array when removing existing value', async () => {
      const {
        props: { onChange },
      } = await renderListControl({ field: multipleFieldsListField, value: multipleFieldsValue });

      const itemOne = screen.getByTestId('object-control-0');

      await act(async () => {
        await userEvent.click(getByTestId(itemOne, 'remove-button'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([
        { stringInput: 'String Value 2', textInput: 'Text Value 2' },
      ]);
    });

    it('uses summary for entries', async () => {
      const { getByTestId, rerender } = await renderListControl({
        field: {
          ...singletonListField,
          label: 'Things',
          label_singular: 'Thing',
          collapsed: true,
        },
        value: ['single value'],
      });

      const label = getByTestId('label');
      expect(label.textContent).toBe('Thing');

      rerender({ value: ['value 1', 'value 2'] });

      expect(label.textContent).toBe('Things');
    });
  });

  describe('singleton list', () => {
    it('renders open by default', async () => {
      await renderListControl({ value: ['Value 1', 'Value 2'] });

      expect(screen.getByTestId('list-widget-children')).toBeInTheDocument();

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).toBeVisible();
      expect(getByTestId(itemOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemOne, 'fieldName').textContent).toBe('0');
      expect(queryByTestId(itemOne, 'item-label')).not.toBeInTheDocument();
      expect(queryByTestId(itemOne, 'item-summary')).not.toBeInTheDocument();
      expect(JSON.parse(getByTestId(itemOne, 'value').textContent ?? '')).toEqual({
        stringInput: 'Value 1',
      });

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).toBeVisible();
      expect(getByTestId(itemTwo, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemTwo, 'fieldName').textContent).toBe('1');
      expect(queryByTestId(itemTwo, 'item-label')).not.toBeInTheDocument();
      expect(queryByTestId(itemTwo, 'item-summary')).not.toBeInTheDocument();
      expect(JSON.parse(getByTestId(itemTwo, 'value').textContent ?? '')).toEqual({
        stringInput: 'Value 2',
      });
    });

    it('renders empty', async () => {
      const { queryByTestId } = await renderListControl({
        value: [],
      });

      expect(queryByTestId('list-widget-children')).not.toBeInTheDocument();
    });

    it('renders closed when collapsed is true', async () => {
      await renderListControl({
        value: ['Value 1', 'Value 2'],
        field: { ...singletonListField, collapsed: true },
      });

      expect(screen.getByTestId('object-control-0')).not.toBeVisible();
      expect(screen.getByTestId('object-control-1')).not.toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(screen.getByTestId('object-control-0')).toBeVisible();
      expect(screen.getByTestId('object-control-1')).toBeVisible();
    });

    it('reorders value on drag and drop', async () => {
      const {
        props: { onChange },
      } = await renderListControl({
        value: ['Value 1', 'Value 2'],
      });

      await act(async () => {
        onDragEnd?.({ active: { id: 1 }, over: { id: 0 } } as DragEndEvent);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['Value 2', 'Value 1']);
    });

    it('does not show add button if allow_add is false', async () => {
      const { queryByTestId } = await renderListControl({
        field: { ...singletonListField, allow_add: false },
      });

      expect(queryByTestId('list-add')).not.toBeInTheDocument();
    });

    it('outputs value as singleton array when adding new value', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = await renderListControl({ value: ['Value 1', 'Value 2'] });

      await act(async () => {
        await userEvent.click(getByTestId('list-add'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['Value 1', 'Value 2', 'string default']);
    });

    it('adds to top', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = await renderListControl({
        field: {
          ...singletonListField,
          add_to_top: true,
        },
        value: ['Value 1', 'Value 2'],
      });

      await act(async () => {
        await userEvent.click(getByTestId('list-add'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['string default', 'Value 1', 'Value 2']);
    });

    it('outputs value as singleton array when removing existing value', async () => {
      const {
        props: { onChange },
      } = await renderListControl({ value: ['Value 1', 'Value 2'] });

      const itemOne = screen.getByTestId('object-control-0');

      await act(async () => {
        await userEvent.click(getByTestId(itemOne, 'remove-button'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['Value 2']);
    });
  });

  describe('typed field list', () => {
    it('renders open by default', async () => {
      await renderListControl({ field: typedFieldsListField, value: typedFieldsValue });

      expect(screen.getByTestId('list-widget-children')).toBeInTheDocument();

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).toBeVisible();
      expect(getByTestId(itemOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemOne, 'fieldName').textContent).toBe('0');
      expect(getByTestId(itemOne, 'item-label').textContent).toBe('typedFields');
      expect(queryByTestId(itemOne, 'item-summary')).not.toBeInTheDocument();
      expect(JSON.parse(getByTestId(itemOne, 'value').textContent ?? '')).toEqual({
        stringInput: 'String Value 1',
        textInput: 'Text Value 1',
        type: 'type1',
      });

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).toBeVisible();
      expect(getByTestId(itemTwo, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemTwo, 'fieldName').textContent).toBe('1');
      expect(getByTestId(itemTwo, 'item-label').textContent).toBe('typedFields');
      expect(queryByTestId(itemTwo, 'item-summary')).not.toBeInTheDocument();
      expect(JSON.parse(getByTestId(itemTwo, 'value').textContent ?? '')).toEqual({
        numberInput2: 10,
        stringInput: 'String Value 2',
        type: 'type2',
      });
    });

    it('renders empty', async () => {
      const { queryByTestId } = await renderListControl({
        field: typedFieldsListField,
        value: [],
      });

      expect(queryByTestId('list-widget-children')).not.toBeInTheDocument();
    });

    it('renders closed when collapsed is true', async () => {
      await renderListControl({
        value: typedFieldsValue,
        field: { ...typedFieldsListField, collapsed: true },
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).not.toBeVisible();
      expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe('type1');

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).not.toBeVisible();
      expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe('type2');

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(itemOne).toBeVisible();
      expect(itemTwo).toBeVisible();
    });

    it('uses type labels as summary if present', async () => {
      const field: ListField = {
        ...typedFieldsListField,
        collapsed: true,
        types: [
          {
            ...typedFieldsListField.types![0],
            label: 'Type 1 Label',
          },
          {
            ...typedFieldsListField.types![1],
            label: 'Type 2 Label',
          },
        ],
      };

      await renderListControl({
        value: typedFieldsValue,
        field,
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).not.toBeVisible();
      expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe('Type 1 Label');

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).not.toBeVisible();
      expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe('Type 2 Label');

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(itemOne).toBeVisible();
      expect(itemTwo).toBeVisible();
    });

    it('uses type summary if present with name', async () => {
      const field: ListField = {
        ...typedFieldsListField,
        collapsed: true,
        types: [
          {
            ...typedFieldsListField.types![0],
            summary: '{{fields.textInput}} - {{stringInput}}',
          },
          {
            ...typedFieldsListField.types![1],
            summary: '{{fields.numberInput2}} - {{stringInput}}',
          },
        ],
      };

      await renderListControl({
        value: typedFieldsValue,
        field,
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).not.toBeVisible();
      expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
        'type1 - Text Value 1 - String Value 1',
      );

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).not.toBeVisible();
      expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
        'type2 - 10 - String Value 2',
      );

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(itemOne).toBeVisible();
      expect(itemTwo).toBeVisible();
    });

    it('uses type summary if present with label', async () => {
      const field: ListField = {
        ...typedFieldsListField,
        collapsed: true,
        types: [
          {
            ...typedFieldsListField.types![0],
            label: 'Type 1 Label',
            summary: '{{fields.textInput}} - {{stringInput}}',
          },
          {
            ...typedFieldsListField.types![1],
            label: 'Type 2 Label',
            summary: '{{fields.numberInput2}} - {{stringInput}}',
          },
        ],
      };

      await renderListControl({
        value: typedFieldsValue,
        field,
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).not.toBeVisible();
      expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
        'Type 1 Label - Text Value 1 - String Value 1',
      );

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).not.toBeVisible();
      expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
        'Type 2 Label - 10 - String Value 2',
      );

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(itemOne).toBeVisible();
      expect(itemTwo).toBeVisible();
    });

    it('uses list summary if type summary is not present with name', async () => {
      const field: ListField = {
        ...typedFieldsListField,
        collapsed: true,
        summary: 'Summary: {{stringInput}}',
        types: [
          {
            ...typedFieldsListField.types![0],
          },
          {
            ...typedFieldsListField.types![1],
          },
        ],
      };

      await renderListControl({
        value: typedFieldsValue,
        field,
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).not.toBeVisible();
      expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
        'type1 - Summary: String Value 1',
      );

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).not.toBeVisible();
      expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
        'type2 - Summary: String Value 2',
      );

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(itemOne).toBeVisible();
      expect(itemTwo).toBeVisible();
    });

    it('uses list summary if type summary is not present with label', async () => {
      const field: ListField = {
        ...typedFieldsListField,
        collapsed: true,
        summary: 'Summary: {{stringInput}}',
        types: [
          {
            label: 'Type 1 Label',
            ...typedFieldsListField.types![0],
          },
          {
            label: 'Type 2 Label',
            ...typedFieldsListField.types![1],
          },
        ],
      };

      await renderListControl({
        value: typedFieldsValue,
        field,
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).not.toBeVisible();
      expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
        'Type 1 Label - Summary: String Value 1',
      );

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).not.toBeVisible();
      expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
        'Type 2 Label - Summary: String Value 2',
      );

      await act(async () => {
        await userEvent.click(screen.getByTestId('list-expand-button'));
      });

      expect(itemOne).toBeVisible();
      expect(itemTwo).toBeVisible();
    });

    it('uses singular label for item labels', async () => {
      await renderListControl({
        field: {
          ...typedFieldsListField,
          label: 'Things',
          label_singular: 'Thing',
        },
        value: typedFieldsValue,
      });

      const itemOne = screen.getByTestId('object-control-0');
      expect(getByTestId(itemOne, 'item-label').textContent).toBe('Thing');

      const itemTwo = screen.getByTestId('object-control-1');
      expect(getByTestId(itemTwo, 'item-label').textContent).toBe('Thing');
    });

    it('reorders value on drag and drop', async () => {
      const {
        props: { onChange },
      } = await renderListControl({
        value: typedFieldsValue,
        field: typedFieldsListField,
      });

      await act(async () => {
        onDragEnd?.({ active: { id: 1 }, over: { id: 0 } } as DragEndEvent);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([typedFieldsValue[1], typedFieldsValue[0]]);
    });

    it('does not show add button if allow_add is false', async () => {
      const { queryByTestId } = await renderListControl({
        field: { ...typedFieldsListField, allow_add: false },
        value: typedFieldsValue,
      });

      expect(queryByTestId('list-type-add')).not.toBeInTheDocument();
    });

    it('outputs value as object array when adding new value', async () => {
      const {
        getByTestId,
        rerender,
        props: { onChange },
      } = await renderListControl({ field: typedFieldsListField, value: typedFieldsValue });

      const typeAddButton = getByTestId('list-type-add');

      await act(async () => {
        await userEvent.click(typeAddButton);
      });

      await act(async () => {
        await userEvent.click(getByTestId('list-type-add-item-type2'));
      });

      const newValue: ValueOrNestedValue[] | null | undefined = [
        ...typedFieldsValue,
        {
          numberInput2: 5,
          stringInput: 'string default 2',
          type: 'type2',
        },
      ];

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(newValue);

      rerender({
        value: newValue,
      });

      await act(async () => {
        await userEvent.click(typeAddButton);
      });

      await act(async () => {
        await userEvent.click(getByTestId('list-type-add-item-type1'));
      });

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith([
        ...newValue,
        {
          stringInput: 'string default',
          textInput: 'text default',
          type: 'type1',
        },
      ]);
    });

    it('adds to top', async () => {
      const {
        getByTestId,
        rerender,
        props: { onChange },
      } = await renderListControl({
        field: {
          ...typedFieldsListField,
          add_to_top: true,
        },
        value: typedFieldsValue,
      });

      const typeAddButton = getByTestId('list-type-add');

      await act(async () => {
        await userEvent.click(typeAddButton);
      });

      await act(async () => {
        await userEvent.click(getByTestId('list-type-add-item-type2'));
      });

      const newValue: ValueOrNestedValue[] | null | undefined = [
        {
          numberInput2: 5,
          stringInput: 'string default 2',
          type: 'type2',
        },
        ...typedFieldsValue,
      ];

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(newValue);

      rerender({
        value: newValue,
      });

      await act(async () => {
        await userEvent.click(typeAddButton);
      });

      await act(async () => {
        await userEvent.click(getByTestId('list-type-add-item-type1'));
      });

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith([
        {
          stringInput: 'string default',
          textInput: 'text default',
          type: 'type1',
        },
        ...newValue,
      ]);
    });

    it('outputs value as object array when removing existing value', async () => {
      const {
        props: { onChange },
      } = await renderListControl({ field: typedFieldsListField, value: typedFieldsValue });

      const itemOne = screen.getByTestId('object-control-0');

      await act(async () => {
        await userEvent.click(getByTestId(itemOne, 'remove-button'));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([typedFieldsValue[1]]);
    });

    describe('non standard type key', () => {
      it('renders open by default', async () => {
        await renderListControl({
          field: typedOtherKeyFieldsListField,
          value: typedOtherKeyFieldsValue,
        });

        expect(screen.getByTestId('list-widget-children')).toBeInTheDocument();

        const itemOne = screen.getByTestId('object-control-0');
        expect(itemOne).toBeVisible();
        expect(getByTestId(itemOne, 'parentPath').textContent).toBe('list');
        expect(getByTestId(itemOne, 'fieldName').textContent).toBe('0');
        expect(JSON.parse(getByTestId(itemOne, 'value').textContent ?? '')).toEqual({
          stringInput: 'String Value 1',
          textInput: 'Text Value 1',
          someKey: 'type1',
        });

        const itemTwo = screen.getByTestId('object-control-1');
        expect(itemTwo).toBeVisible();
        expect(getByTestId(itemTwo, 'parentPath').textContent).toBe('list');
        expect(getByTestId(itemTwo, 'fieldName').textContent).toBe('1');
        expect(JSON.parse(getByTestId(itemTwo, 'value').textContent ?? '')).toEqual({
          numberInput2: 10,
          stringInput: 'String Value 2',
          someKey: 'type2',
        });
      });

      it('renders empty', async () => {
        const { queryByTestId } = await renderListControl({
          field: typedOtherKeyFieldsListField,
          value: [],
        });

        expect(queryByTestId('list-widget-children')).not.toBeInTheDocument();
      });

      it('renders closed when collapsed is true', async () => {
        await renderListControl({
          value: typedOtherKeyFieldsValue,
          field: { ...typedOtherKeyFieldsListField, collapsed: true },
        });

        const itemOne = screen.getByTestId('object-control-0');
        expect(itemOne).not.toBeVisible();
        expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe('type1');

        const itemTwo = screen.getByTestId('object-control-1');
        expect(itemTwo).not.toBeVisible();
        expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe('type2');

        await act(async () => {
          await userEvent.click(screen.getByTestId('list-expand-button'));
        });

        expect(itemOne).toBeVisible();
        expect(itemTwo).toBeVisible();
      });

      it('uses type labels as summary if present', async () => {
        const field: ListField = {
          ...typedOtherKeyFieldsListField,
          collapsed: true,
          types: [
            {
              ...typedOtherKeyFieldsListField.types![0],
              label: 'Type 1 Label',
            },
            {
              ...typedOtherKeyFieldsListField.types![1],
              label: 'Type 2 Label',
            },
          ],
        };

        await renderListControl({
          value: typedOtherKeyFieldsValue,
          field,
        });

        const itemOne = screen.getByTestId('object-control-0');
        expect(itemOne).not.toBeVisible();
        expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe('Type 1 Label');

        const itemTwo = screen.getByTestId('object-control-1');
        expect(itemTwo).not.toBeVisible();
        expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe('Type 2 Label');

        await act(async () => {
          await userEvent.click(screen.getByTestId('list-expand-button'));
        });

        expect(itemOne).toBeVisible();
        expect(itemTwo).toBeVisible();
      });

      it('uses type summary if present with name', async () => {
        const field: ListField = {
          ...typedOtherKeyFieldsListField,
          collapsed: true,
          types: [
            {
              ...typedOtherKeyFieldsListField.types![0],
              summary: '{{fields.textInput}} - {{stringInput}}',
            },
            {
              ...typedOtherKeyFieldsListField.types![1],
              summary: '{{fields.numberInput2}} - {{stringInput}}',
            },
          ],
        };

        await renderListControl({
          value: typedOtherKeyFieldsValue,
          field,
        });

        const itemOne = screen.getByTestId('object-control-0');
        expect(itemOne).not.toBeVisible();
        expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
          'type1 - Text Value 1 - String Value 1',
        );

        const itemTwo = screen.getByTestId('object-control-1');
        expect(itemTwo).not.toBeVisible();
        expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
          'type2 - 10 - String Value 2',
        );

        await act(async () => {
          await userEvent.click(screen.getByTestId('list-expand-button'));
        });

        expect(itemOne).toBeVisible();
        expect(itemTwo).toBeVisible();
      });

      it('uses type summary if present with label', async () => {
        const field: ListField = {
          ...typedOtherKeyFieldsListField,
          collapsed: true,
          types: [
            {
              ...typedOtherKeyFieldsListField.types![0],
              label: 'Type 1 Label',
              summary: '{{fields.textInput}} - {{stringInput}}',
            },
            {
              ...typedOtherKeyFieldsListField.types![1],
              label: 'Type 2 Label',
              summary: '{{fields.numberInput2}} - {{stringInput}}',
            },
          ],
        };

        await renderListControl({
          value: typedOtherKeyFieldsValue,
          field,
        });

        const itemOne = screen.getByTestId('object-control-0');
        expect(itemOne).not.toBeVisible();
        expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
          'Type 1 Label - Text Value 1 - String Value 1',
        );

        const itemTwo = screen.getByTestId('object-control-1');
        expect(itemTwo).not.toBeVisible();
        expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
          'Type 2 Label - 10 - String Value 2',
        );

        await act(async () => {
          await userEvent.click(screen.getByTestId('list-expand-button'));
        });

        expect(itemOne).toBeVisible();
        expect(itemTwo).toBeVisible();
      });

      it('uses list summary if type summary is not present with name', async () => {
        const field: ListField = {
          ...typedOtherKeyFieldsListField,
          collapsed: true,
          summary: 'Summary: {{stringInput}}',
          types: [
            {
              ...typedOtherKeyFieldsListField.types![0],
            },
            {
              ...typedOtherKeyFieldsListField.types![1],
            },
          ],
        };

        await renderListControl({
          value: typedOtherKeyFieldsValue,
          field,
        });

        const itemOne = screen.getByTestId('object-control-0');
        expect(itemOne).not.toBeVisible();
        expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
          'type1 - Summary: String Value 1',
        );

        const itemTwo = screen.getByTestId('object-control-1');
        expect(itemTwo).not.toBeVisible();
        expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
          'type2 - Summary: String Value 2',
        );

        await act(async () => {
          await userEvent.click(screen.getByTestId('list-expand-button'));
        });

        expect(itemOne).toBeVisible();
        expect(itemTwo).toBeVisible();
      });

      it('uses list summary if type summary is not present with label', async () => {
        const field: ListField = {
          ...typedOtherKeyFieldsListField,
          collapsed: true,
          summary: 'Summary: {{stringInput}}',
          types: [
            {
              label: 'Type 1 Label',
              ...typedOtherKeyFieldsListField.types![0],
            },
            {
              label: 'Type 2 Label',
              ...typedOtherKeyFieldsListField.types![1],
            },
          ],
        };

        await renderListControl({
          value: typedOtherKeyFieldsValue,
          field,
        });

        const itemOne = screen.getByTestId('object-control-0');
        expect(itemOne).not.toBeVisible();
        expect(queryByTestId(itemOne, 'item-summary')?.textContent).toBe(
          'Type 1 Label - Summary: String Value 1',
        );

        const itemTwo = screen.getByTestId('object-control-1');
        expect(itemTwo).not.toBeVisible();
        expect(queryByTestId(itemTwo, 'item-summary')?.textContent).toBe(
          'Type 2 Label - Summary: String Value 2',
        );

        await act(async () => {
          await userEvent.click(screen.getByTestId('list-expand-button'));
        });

        expect(itemOne).toBeVisible();
        expect(itemTwo).toBeVisible();
      });

      it('uses singular label for item labels', async () => {
        await renderListControl({
          field: {
            ...typedOtherKeyFieldsListField,
            label: 'Things',
            label_singular: 'Thing',
          },
          value: typedOtherKeyFieldsValue,
        });

        const itemOne = screen.getByTestId('object-control-0');
        expect(getByTestId(itemOne, 'item-label').textContent).toBe('Thing');

        const itemTwo = screen.getByTestId('object-control-1');
        expect(getByTestId(itemTwo, 'item-label').textContent).toBe('Thing');
      });

      it('reorders value on drag and drop', async () => {
        const {
          props: { onChange },
        } = await renderListControl({
          value: typedOtherKeyFieldsValue,
          field: typedOtherKeyFieldsListField,
        });

        await act(async () => {
          onDragEnd?.({ active: { id: 1 }, over: { id: 0 } } as DragEndEvent);
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([
          typedOtherKeyFieldsValue[1],
          typedOtherKeyFieldsValue[0],
        ]);
      });

      it('does not show add button if allow_add is false', async () => {
        const { queryByTestId } = await renderListControl({
          field: { ...typedOtherKeyFieldsListField, allow_add: false },
          value: typedOtherKeyFieldsValue,
        });

        expect(queryByTestId('list-type-add')).not.toBeInTheDocument();
      });

      it('outputs value as object array when adding new value', async () => {
        const {
          getByTestId,
          rerender,
          props: { onChange },
        } = await renderListControl({
          field: typedOtherKeyFieldsListField,
          value: typedOtherKeyFieldsValue,
        });

        const typeAddButton = getByTestId('list-type-add');

        await act(async () => {
          await userEvent.click(typeAddButton);
        });

        await act(async () => {
          await userEvent.click(getByTestId('list-type-add-item-type2'));
        });

        const newValue: ValueOrNestedValue[] | null | undefined = [
          ...typedOtherKeyFieldsValue,
          {
            numberInput2: 5,
            stringInput: 'string default 2',
            someKey: 'type2',
          },
        ];

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(newValue);

        rerender({
          value: newValue,
        });

        await act(async () => {
          await userEvent.click(typeAddButton);
        });

        await act(async () => {
          await userEvent.click(getByTestId('list-type-add-item-type1'));
        });

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith([
          ...newValue,
          {
            stringInput: 'string default',
            textInput: 'text default',
            someKey: 'type1',
          },
        ]);
      });

      it('adds to top', async () => {
        const {
          getByTestId,
          rerender,
          props: { onChange },
        } = await renderListControl({
          field: {
            ...typedOtherKeyFieldsListField,
            add_to_top: true,
          },
          value: typedOtherKeyFieldsValue,
        });

        const typeAddButton = getByTestId('list-type-add');

        await act(async () => {
          await userEvent.click(typeAddButton);
        });

        await act(async () => {
          await userEvent.click(getByTestId('list-type-add-item-type2'));
        });

        const newValue: ValueOrNestedValue[] | null | undefined = [
          {
            numberInput2: 5,
            stringInput: 'string default 2',
            someKey: 'type2',
          },
          ...typedOtherKeyFieldsValue,
        ];

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(newValue);

        rerender({
          value: newValue,
        });

        await act(async () => {
          await userEvent.click(typeAddButton);
        });

        await act(async () => {
          await userEvent.click(getByTestId('list-type-add-item-type1'));
        });

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith([
          {
            stringInput: 'string default',
            textInput: 'text default',
            someKey: 'type1',
          },
          ...newValue,
        ]);
      });

      it('outputs value as object array when removing existing value', async () => {
        const {
          props: { onChange },
        } = await renderListControl({
          field: typedOtherKeyFieldsListField,
          value: typedOtherKeyFieldsValue,
        });

        const itemOne = screen.getByTestId('object-control-0');

        await act(async () => {
          await userEvent.click(getByTestId(itemOne, 'remove-button'));
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([typedOtherKeyFieldsValue[1]]);
      });
    });
  });
});
