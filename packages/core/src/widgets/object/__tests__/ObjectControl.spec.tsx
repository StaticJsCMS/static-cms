/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { getByTestId, screen } from '@testing-library/react';
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
      name: 'stringInput',
      default: 'string default',
    },
  ],
};

const singleFieldObjectValue = {
  stringInput: 'String Value',
};

jest.mock('@staticcms/core/components/editor/EditorControlPane/EditorControl', () => {
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
    field: singleFieldObjectField,
    path: 'object',
  });

  it('renders all fields visible by default', () => {
    renderControl({ value: singleFieldObjectValue });

    expect(screen.getByTestId('expand-button').textContent).toBe('Object Field');

    const fields = screen.getAllByTestId('editor-control');
    expect(fields.length).toBe(1);

    const fieldOne = fields[0];
    expect(fieldOne).toBeVisible();
    expect(getByTestId(fieldOne, 'parentPath').textContent).toBe('object');
    expect(getByTestId(fieldOne, 'fieldName').textContent).toBe('stringInput');
  });

  it('does not render fields when closed', async () => {
    renderControl({ value: singleFieldObjectValue });

    await userEvent.click(screen.getByTestId('expand-button'));

    const fields = screen.getAllByTestId('editor-control');
    expect(fields.length).toBe(1);

    const fieldOne = fields[0];
    expect(fieldOne).not.toBeVisible();
  });

  describe('for list', () => {
    it('should pass down parent path and field name to child if for list and single field', () => {
      renderControl({ value: singleFieldObjectValue, path: 'list.0', forList: true });

      expect(screen.queryByTestId('expand-button')).not.toBeInTheDocument();

      const fields = screen.getAllByTestId('editor-control');
      expect(fields.length).toBe(1);

      const fieldOne = fields[0];
      expect(getByTestId(fieldOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(fieldOne, 'fieldName').textContent).toBe('0');
    });
  });
});
