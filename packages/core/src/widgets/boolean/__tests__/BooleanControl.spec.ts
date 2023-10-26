/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mockBooleanField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import BooleanControl from '../BooleanControl';

describe(BooleanControl.name, () => {
  const renderControl = createWidgetControlHarness(BooleanControl, { field: mockBooleanField });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    expect(getByTestId('switch-input')).toBeInTheDocument();

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
  });

  it('should only use prop value as initial value', async () => {
    const { rerender, getByTestId } = renderControl({ value: true });

    const input = getByTestId('switch-input');
    expect(input).toBeChecked();

    rerender({ value: false });
    expect(input).toBeChecked();
  });

  it('should use prop value exclusively if field is i18n duplicate', async () => {
    const { rerender, getByTestId } = renderControl({
      field: { ...mockBooleanField, i18n: 'duplicate' },
      duplicate: true,
      value: true,
    });

    const input = getByTestId('switch-input');
    expect(input).toBeChecked();

    rerender({ value: false });
    expect(input).not.toBeChecked();
  });

  it('should call onChange when switch is clicked', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const input = getByTestId('switch-input');

    expect(onChange).not.toHaveBeenCalled();

    await act(async () => {
      await userEvent.click(input);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(true);

    await act(async () => {
      await userEvent.click(input);
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('should show error', async () => {
    const { getByTestId } = renderControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const error = getByTestId('error');
    expect(error.textContent).toBe('i am an error');
  });

  it('should focus input on field click', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const input = getByTestId('switch-input');
    expect(input).not.toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();

    const field = getByTestId('inline-field');

    await act(async () => {
      await userEvent.click(field);
    });

    expect(input).toHaveFocus();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(true);
  });

  it('should disable input if disabled', async () => {
    const { getByTestId } = await renderControl({ disabled: true });

    const input = getByTestId('switch-input');
    expect(input).toBeDisabled();
  });
});
