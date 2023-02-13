/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import createControlWrapper from '@staticcms/core/lib/test-utils/ControlWrapper';
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

const ObjectControlWrapper = createControlWrapper({
  defaultField: singleFieldObjectField,
  control: ObjectControl,
  label: 'Object Control',
  path: 'object',
});

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
  it('renders all fields visible by default', () => {
    render(<ObjectControlWrapper field={singleFieldObjectField} value={singleFieldObjectValue} />);

    expect(screen.getByTestId('object-title').textContent).toBe('Object Field');

    const fields = screen.getAllByTestId('editor-control');
    expect(fields.length).toBe(1);

    const fieldOne = fields[0];
    expect(fieldOne).toBeVisible();
    expect(getByTestId(fieldOne, 'parentPath').textContent).toBe('object');
    expect(getByTestId(fieldOne, 'fieldName').textContent).toBe('stringInput');
  });

  it('does not render fields when closed', async () => {
    render(<ObjectControlWrapper field={singleFieldObjectField} value={singleFieldObjectValue} />);

    await userEvent.click(screen.getByTestId('expand-button'));

    const fields = screen.getAllByTestId('editor-control');
    expect(fields.length).toBe(1);

    const fieldOne = fields[0];
    expect(fieldOne).not.toBeVisible();
  });

  describe('for list', () => {
    it('should pass down parent path and field name to child if for list and single field', () => {
      render(
        <ObjectControlWrapper
          field={singleFieldObjectField}
          value={singleFieldObjectValue}
          path="list.0"
          forList={true}
        />,
      );

      expect(screen.queryByTestId('object-title')).not.toBeInTheDocument();

      const fields = screen.getAllByTestId('editor-control');
      expect(fields.length).toBe(1);

      const fieldOne = fields[0];
      expect(getByTestId(fieldOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(fieldOne, 'fieldName').textContent).toBe('0');
    });
  });
});
