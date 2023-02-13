/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { mockNumberField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import NumberControl from '../NumberControl';

import type { NumberField } from '@staticcms/core/interface';

describe(NumberControl.name, () => {
  const renderControl = createWidgetControlHarness(NumberControl, { field: mockNumberField });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    expect(getByTestId('number-input')).toBeInTheDocument();

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    // String Widget uses text cursor
    expect(label).toHaveClass('cursor-text');
    expect(field).toHaveClass('cursor-text');

    // String Widget uses default label layout, with bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).toHaveClass('pb-3');
  });

  it('should only use prop value as initial value', async () => {
    const { rerender, getByTestId } = renderControl({ value: '5' });

    const input = getByTestId('number-input');
    expect(input).toHaveValue(5);

    rerender({ value: '76' });
    expect(input).toHaveValue(5);
  });

  it('should call onChange when text input changes', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const input = getByTestId('number-input');

    await userEvent.type(input, '1056');

    expect(onChange).toHaveBeenLastCalledWith('1056');
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

    const input = getByTestId('number-input');
    expect(input).not.toHaveFocus();

    const field = getByTestId('field');
    await userEvent.click(field);

    expect(input).toHaveFocus();
  });

  it('should pass min, max and step to input', async () => {
    const { getByTestId } = renderControl({
      field: {
        ...mockNumberField,
        min: 10,
        max: 250,
        step: 5,
      },
    });

    const input = getByTestId('number-input');

    expect(input).toHaveAttribute('min', '10');
    expect(input).toHaveAttribute('max', '250');
    expect(input).toHaveAttribute('step', '5');
  });

  it('should default to step of 1 if step is not set', async () => {
    const { getByTestId } = renderControl();

    const input = getByTestId('number-input');

    expect(input).toHaveAttribute('step', '1');
  });

  describe('int', () => {
    const mockIntNumberField: NumberField = {
      label: 'Number',
      name: 'mock_number',
      widget: 'number',
      value_type: 'int',
    };

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({ field: mockIntNumberField });

      const input = getByTestId('number-input');

      await userEvent.type(input, '1056.5');

      expect(onChange).toHaveBeenLastCalledWith(1056);
    });

    it('should round step to nearest whole number', async () => {
      const { getByTestId } = renderControl({
        field: {
          ...mockIntNumberField,
          step: 5.25,
        },
      });

      const input = getByTestId('number-input');

      expect(input).toHaveAttribute('step', '5');
    });

    it('should default to step of 1 if step is not set', async () => {
      const { getByTestId } = renderControl({
        field: {
          ...mockIntNumberField,
        },
      });

      const input = getByTestId('number-input');

      expect(input).toHaveAttribute('step', '1');
    });
  });

  describe('float', () => {
    const mockIntNumberField: NumberField = {
      label: 'Number',
      name: 'mock_number',
      widget: 'number',
      value_type: 'float',
    };

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({ field: mockIntNumberField });

      const input = getByTestId('number-input');

      await userEvent.type(input, '1056.5');

      expect(onChange).toHaveBeenLastCalledWith(1056.5);
    });

    it('should not round step', async () => {
      const { getByTestId } = renderControl({
        field: {
          ...mockIntNumberField,
          step: 5.25,
        },
      });

      const input = getByTestId('number-input');

      expect(input).toHaveAttribute('step', '5.25');
    });

    it('should default to step of 1 if step is not set', async () => {
      const { getByTestId } = renderControl({
        field: {
          ...mockIntNumberField,
        },
      });

      const input = getByTestId('number-input');

      expect(input).toHaveAttribute('step', '1');
    });
  });
});
