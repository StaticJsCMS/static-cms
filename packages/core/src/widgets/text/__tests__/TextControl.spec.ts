/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mockTextField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import TextControl from '../TextControl';

describe(TextControl.name, () => {
  const renderControl = createWidgetControlHarness(TextControl, { field: mockTextField });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    expect(getByTestId('textarea-input')).toBeInTheDocument();

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
  });

  it('should render as single list item', () => {
    const { getByTestId } = renderControl({ label: 'I am a label', forSingleList: true });

    expect(getByTestId('textarea-input')).toBeInTheDocument();
  });

  it('should only use prop value as initial value', async () => {
    const { rerender, getByTestId } = renderControl({ value: 'i am a value' });

    const inputWrapper = getByTestId('textarea-input');
    const input = inputWrapper.getElementsByTagName('textarea')[0];
    expect(input).toHaveValue('i am a value');

    rerender({ value: 'i am a new value' });
    expect(input).toHaveValue('i am a value');
  });

  it('should use prop value exclusively if field is i18n duplicate', async () => {
    const { rerender, getByTestId } = renderControl({
      field: { ...mockTextField, i18n: 'duplicate' },
      duplicate: true,
      value: 'i am a value',
    });

    const inputWrapper = getByTestId('textarea-input');
    const input = inputWrapper.getElementsByTagName('textarea')[0];
    expect(input).toHaveValue('i am a value');

    rerender({ value: 'i am a new value' });
    expect(input).toHaveValue('i am a new value');
  });

  it('should call onChange when text input changes', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const inputWrapper = getByTestId('textarea-input');
    const input = inputWrapper.getElementsByTagName('textarea')[0];

    await act(async () => {
      await userEvent.type(input, 'I am some text');
    });

    expect(onChange).toHaveBeenCalledTimes(14);
    expect(onChange).toHaveBeenLastCalledWith('I am some text');
  });

  it('should show error', async () => {
    const { getByTestId } = renderControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const error = getByTestId('error');
    expect(error.textContent).toBe('i am an error');
  });

  it('should focus input on field click', async () => {
    const { getByTestId } = renderControl();

    const inputWrapper = getByTestId('textarea-input');
    const input = inputWrapper.getElementsByTagName('textarea')[0];
    expect(input).not.toHaveFocus();

    await act(async () => {
      const field = getByTestId('field-Mock Widget');
      await userEvent.click(field);
    });

    expect(input).toHaveFocus();
  });

  it('should disable input if disabled', async () => {
    const { getByTestId } = renderControl({ disabled: true });

    const inputWrapper = getByTestId('textarea-input');
    const input = inputWrapper.getElementsByTagName('textarea')[0];
    expect(input).toBeDisabled();
  });
});
