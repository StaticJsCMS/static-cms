/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

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
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    // Text Widget uses text cursor
    expect(label).toHaveClass('cursor-text');
    expect(field).toHaveClass('cursor-text');

    // Text Widget uses default label layout, but without bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).not.toHaveClass('pb-3');
  });

  it('should only use prop value as initial value', async () => {
    const { rerender, getByTestId } = renderControl({ value: 'i am a value' });

    const input = getByTestId('textarea-input');
    expect(input).toHaveValue('i am a value');

    rerender({ value: 'i am a new value' });
    expect(input).toHaveValue('i am a value');
  });

  it('should call onChange when text input changes', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const input = getByTestId('textarea-input');

    await userEvent.type(input, 'I am some text');

    expect(onChange).toHaveBeenLastCalledWith('I am some text');
  });

  it('should show error', async () => {
    const { getByTestId } = renderControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const input = getByTestId('error');
    expect(input.textContent).toBe('i am an error');

    const field = getByTestId('field');
    expect(field).not.toHaveClass('group/active');

    const label = getByTestId('label');
    expect(label).toHaveClass('text-red-500');
  });

  it('should focus input on field click', async () => {
    const { getByTestId } = renderControl();

    const input = getByTestId('textarea-input');
    expect(input).not.toHaveFocus();

    const field = getByTestId('field');
    await userEvent.click(field);

    expect(input).toHaveFocus();
  });

  it('should disable input if disabled', async () => {
    const { getByTestId } = renderControl({ disabled: true });

    const input = getByTestId('textarea-input');
    expect(input).toBeDisabled();
  });
});
