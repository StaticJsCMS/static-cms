/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockKeyValueField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import KeyValueControl from '../KeyValueControl';

describe(KeyValueControl.name, () => {
  const renderControl = createWidgetControlHarness(KeyValueControl, { field: mockKeyValueField });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    expect(getByTestId('key-0')).toBeInTheDocument();
    expect(getByTestId('value-0')).toBeInTheDocument();

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).not.toHaveClass('mr-14');

    // Key Value Widget uses text cursor
    expect(label).toHaveClass('cursor-text');
    expect(field).toHaveClass('cursor-text');

    // Key Value Widget uses default label layout, with bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).toHaveClass('pb-3');
  });

  it('should render as single list item', () => {
    const { getByTestId } = renderControl({ label: 'I am a label', forSingleList: true });

    expect(getByTestId('key-0')).toBeInTheDocument();
    expect(getByTestId('value-0')).toBeInTheDocument();

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).toHaveClass('mr-14');
  });

  it('should only use prop value as initial value', async () => {
    const { rerender, getByTestId } = renderControl({
      value: [{ key: 'Key 1', value: 'Value 1' }],
    });

    const keyInputWrapper = getByTestId('key-0');
    const keyInput = keyInputWrapper.getElementsByTagName('input')[0];
    expect(keyInput).toHaveValue('Key 1');

    const valueInputWrapper = getByTestId('value-0');
    const valueInput = valueInputWrapper.getElementsByTagName('input')[0];
    expect(valueInput).toHaveValue('Value 1');

    rerender({ value: [{ key: 'Key 1 Updated', value: 'Value 1 Updated' }] });

    expect(keyInput).toHaveValue('Key 1');
    expect(valueInput).toHaveValue('Value 1');
  });

  it('should use prop value exclusively if field is i18n duplicate', async () => {
    const { rerender, getByTestId } = renderControl({
      field: { ...mockKeyValueField, i18n: 'duplicate' },
      duplicate: true,
      value: [{ key: 'Key 1', value: 'Value 1' }],
    });

    const keyInputWrapper = getByTestId('key-0');
    const keyInput = keyInputWrapper.getElementsByTagName('input')[0];
    expect(keyInput).toHaveValue('Key 1');

    const valueInputWrapper = getByTestId('value-0');
    const valueInput = valueInputWrapper.getElementsByTagName('input')[0];
    expect(valueInput).toHaveValue('Value 1');

    rerender({ value: [{ key: 'Key 1 Updated', value: 'Value 1 Updated' }] });

    expect(keyInput).toHaveValue('Key 1 Updated');
    expect(valueInput).toHaveValue('Value 1 Updated');
  });

  it('should call onChange when text input changes', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const keyInputWrapper = getByTestId('key-0');
    const keyInput = keyInputWrapper.getElementsByTagName('input')[0];

    await act(async () => {
      await userEvent.type(keyInput, 'New Key');
    });

    expect(onChange).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'New Key', value: '' }]);
    });

    const valueInputWrapper = getByTestId('value-0');
    const valueInput = valueInputWrapper.getElementsByTagName('input')[0];

    await act(async () => {
      await userEvent.type(valueInput, 'New Value');
    });

    expect(onChange).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'New Key', value: 'New Value' }]);
    });
  });

  it('should add new key value pair', async () => {
    const {
      getByTestId,
      queryByTestId,
      props: { onChange },
    } = renderControl({
      value: [{ key: 'Key 1', value: 'Value 1' }],
    });

    expect(getByTestId('key-0')).toBeInTheDocument();
    expect(getByTestId('value-0')).toBeInTheDocument();

    expect(queryByTestId('key-1')).not.toBeInTheDocument();
    expect(queryByTestId('value-1')).not.toBeInTheDocument();

    const addButton = getByTestId('key-value-add');
    await act(async () => {
      await userEvent.click(addButton);
    });

    expect(queryByTestId('key-1')).toBeInTheDocument();
    expect(queryByTestId('value-1')).toBeInTheDocument();

    const keyInputWrapper = getByTestId('key-1');
    const keyInput = keyInputWrapper.getElementsByTagName('input')[0];

    await act(async () => {
      await userEvent.type(keyInput, 'New Key 2');
    });

    expect(onChange).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith([
        { key: 'Key 1', value: 'Value 1' },
        { key: 'New Key 2', value: '' },
      ]);
    });

    const valueInputWrapper = getByTestId('value-1');
    const valueInput = valueInputWrapper.getElementsByTagName('input')[0];

    await act(async () => {
      await userEvent.type(valueInput, 'New Value 2');
    });

    expect(onChange).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith([
        { key: 'Key 1', value: 'Value 1' },
        { key: 'New Key 2', value: 'New Value 2' },
      ]);
    });
  });

  it('should remove existing key value pair', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl({
      value: [
        { key: 'Key 1', value: 'Value 1' },
        { key: 'Key 2', value: 'Value 2' },
        { key: 'Key 3', value: 'Value 3' },
      ],
    });

    const removeButton = getByTestId('remove-button-1');
    await act(async () => {
      await userEvent.click(removeButton);
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith([
        { key: 'Key 1', value: 'Value 1' },
        { key: 'Key 3', value: 'Value 3' },
      ]);
    });
  });

  it('should show error', async () => {
    const { getByTestId } = renderControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const error = getByTestId('error');
    expect(error.textContent).toBe('i am an error');

    const field = getByTestId('field');
    expect(field).not.toHaveClass('group/active');

    const label = getByTestId('label');
    expect(label).toHaveClass('text-red-500');
  });

  it('should focus input on field click', async () => {
    const { getByTestId } = renderControl();

    const keyInputWrapper = getByTestId('key-0');
    const keyInput = keyInputWrapper.getElementsByTagName('input')[0];
    expect(keyInput).not.toHaveFocus();

    await act(async () => {
      const field = getByTestId('field');
      await userEvent.click(field);
    });

    expect(keyInput).toHaveFocus();
  });

  it('should disable input if disabled', async () => {
    const { getByTestId } = renderControl({ disabled: true });

    const keyInputWrapper = getByTestId('key-0');
    const keyInput = keyInputWrapper.getElementsByTagName('input')[0];
    expect(keyInput).toBeDisabled();

    const valueInputWrapper = getByTestId('value-0');
    const valueInput = valueInputWrapper.getElementsByTagName('input')[0];
    expect(valueInput).toBeDisabled();
  });
});
