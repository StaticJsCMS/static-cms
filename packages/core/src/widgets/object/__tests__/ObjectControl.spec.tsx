/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import ObjectControl from '../ObjectControl';

import type { ObjectField } from '@staticcms/core/interface';

const singleFieldObjectField: ObjectField = {
  widget: 'object',
  name: 'object_field',
  label: 'Object Field',
  fields: [
    {
      widget: 'string',
      name: 'string_input',
      default: 'string default',
    },
  ],
};

const singleFieldObjectValue = {
  string_input: 'String Value',
  text_input: 'Text Value',
};

const multiFieldObjectField: ObjectField = {
  widget: 'object',
  name: 'object_field',
  label: 'Object Field',
  fields: [
    {
      widget: 'string',
      name: 'string_input',
      default: 'string default',
    },
    {
      widget: 'text',
      name: 'text_input',
      default: 'text default',
    },
  ],
};

const multiFieldObjectValue = {
  string_input: 'String Value',
  text_input: 'Text Value',
};

jest.mock('@staticcms/core/components/entry-editor/editor-control-pane/EditorControl', () => {
  return jest.fn(props => {
    const { parentPath, fieldName, field } = props;
    return (
      <div data-testid="editor-control">
        <div data-testid="parentPath">{parentPath}</div>
        <div data-testid="fieldName">{fieldName ?? field.name}</div>
      </div>
    );
  });
});

describe(ObjectControl.name, () => {
  const renderControl = createWidgetControlHarness(ObjectControl, {
    field: multiFieldObjectField,
    path: 'object_field',
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    const field = getByTestId('object-field');
    expect(field).toHaveClass('group/active-object');

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    // Object Widget uses pointer cursor
    expect(label).toHaveClass('cursor-pointer');

    // Object Widget uses inline label layout
    expect(label).not.toHaveClass('px-3', 'pt-3');

    // Should not render error state by default
    const fieldsWrapper = getByTestId('object-fields');
    expect(fieldsWrapper).not.toHaveClass('border-l-red-500');
  });

  it('renders all fields visible by default', () => {
    renderControl({ value: multiFieldObjectValue, label: 'I am a label' });

    expect(screen.getByTestId('expand-button').textContent).toBe('I am a label');

    const fields = screen.getAllByTestId('editor-control');
    expect(fields.length).toBe(2);

    const fieldOne = fields[0];
    expect(fieldOne).toBeVisible();
    expect(getByTestId(fieldOne, 'parentPath').textContent).toBe('object_field');
    expect(getByTestId(fieldOne, 'fieldName').textContent).toBe('string_input');

    const fieldTwo = fields[1];
    expect(fieldTwo).toBeVisible();
    expect(getByTestId(fieldTwo, 'parentPath').textContent).toBe('object_field');
    expect(getByTestId(fieldTwo, 'fieldName').textContent).toBe('text_input');
  });

  it('renders all fields hidden if collapsed is true', () => {
    renderControl(
      {
        field: { ...multiFieldObjectField, collapsed: true },
        value: multiFieldObjectValue,
        label: 'I am a label',
      },
      {
        useFakeTimers: true,
      },
    );

    const fields = screen.getAllByTestId('editor-control');
    expect(fields.length).toBe(2);

    const fieldOne = fields[0];
    expect(fieldOne).not.toBeVisible();

    const fieldTwo = fields[1];
    expect(fieldTwo).not.toBeVisible();
  });

  it('shows summary when closed', async () => {
    renderControl({
      field: {
        ...multiFieldObjectField,
        summary: 'I am a summary: {{fields.string_input}} {{fields.text_input}}',
      },
      value: multiFieldObjectValue,
      label: 'I am a label',
    });

    expect(screen.getByTestId('expand-button').textContent).toBe('I am a label');

    await act(async () => {
      await userEvent.click(screen.getByTestId('expand-button'));
    });

    await waitFor(() =>
      expect(screen.getByTestId('expand-button').textContent).toBe(
        'I am a label - I am a summary: String Value Text Value',
      ),
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId('expand-button'));
    });

    await waitFor(() =>
      expect(screen.getByTestId('expand-button').textContent).toBe('I am a label'),
    );
  });

  it('should show error', async () => {
    const { getByTestId } = renderControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const error = getByTestId('error');
    expect(error.textContent).toBe('i am an error');

    const field = getByTestId('object-field');
    expect(field).not.toHaveClass('group/active-object');

    const fieldsWrapper = getByTestId('object-fields');
    expect(fieldsWrapper).toHaveClass('border-l-red-500');

    const label = getByTestId('label');
    expect(label).toHaveClass('text-red-500');
  });

  it('should highlight but show no errors when child error is present', async () => {
    const { getByTestId, queryByTestId } = renderControl({
      fieldsErrors: {
        'data.object_field.string_input': [{ type: 'errorType', message: 'I am an error!' }],
      },
    });

    expect(queryByTestId('error')).not.toBeInTheDocument();

    const field = getByTestId('object-field');
    expect(field).not.toHaveClass('group/active-object');

    const fieldsWrapper = getByTestId('object-fields');
    expect(fieldsWrapper).toHaveClass('border-l-red-500');

    const label = getByTestId('label');
    expect(label).toHaveClass('text-red-500');
  });

  describe('for list', () => {
    it('should only show child fields (no label or collapsable area)', async () => {
      const { queryByTestId } = renderControl({ forList: true });

      expect(queryByTestId('label')).not.toBeInTheDocument();
      expect(queryByTestId('object-field')).not.toBeInTheDocument();
      expect(queryByTestId('expand-button')).not.toBeInTheDocument();
    });

    it('should pass down parent path and field name to child if for list and single field', () => {
      renderControl({
        field: singleFieldObjectField,
        value: singleFieldObjectValue,
        path: 'list.0',
        forList: true,
      });

      expect(screen.queryByTestId('expand-button')).not.toBeInTheDocument();

      const fields = screen.getAllByTestId('editor-control');
      expect(fields.length).toBe(1);

      const fieldOne = fields[0];
      expect(getByTestId(fieldOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(fieldOne, 'fieldName').textContent).toBe('0');
    });

    it('should pass down parent path and field name to child if for list and single field', () => {
      renderControl({ value: multiFieldObjectValue, path: 'list.0', forList: true });

      expect(screen.queryByTestId('expand-button')).not.toBeInTheDocument();

      const fields = screen.getAllByTestId('editor-control');
      expect(fields.length).toBe(2);

      const fieldOne = fields[0];
      expect(getByTestId(fieldOne, 'parentPath').textContent).toBe('list.0');
      expect(getByTestId(fieldOne, 'fieldName').textContent).toBe('string_input');

      const fieldTwo = fields[1];
      expect(getByTestId(fieldTwo, 'parentPath').textContent).toBe('list.0');
      expect(getByTestId(fieldTwo, 'fieldName').textContent).toBe('text_input');
    });

    it('should not show errors', async () => {
      const { queryByTestId } = renderControl({
        errors: [{ type: 'error-type', message: 'i am an error' }],
        forList: true,
      });

      expect(queryByTestId('error')).not.toBeInTheDocument();
      expect(queryByTestId('object-fields')).not.toBeInTheDocument();
      expect(queryByTestId('label')).not.toBeInTheDocument();
    });
  });
});
