/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

import { mockColorField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import ColorControl from '../ColorControl';

describe(ColorControl.name, () => {
  const renderControl = createWidgetControlHarness(ColorControl, { field: mockColorField });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toBeInTheDocument();

    // Color Widget input should be read only by default
    expect(input).toHaveAttribute('readonly');

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).not.toHaveClass('mr-14');

    // Color Widget uses pointer cursor
    expect(label).toHaveClass('cursor-pointer');
    expect(field).toHaveClass('cursor-pointer');

    // Color Widget uses default label layout, with bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).toHaveClass('pb-3');
  });

  it('should render as single list item', () => {
    const { getByTestId } = renderControl({ label: 'I am a label', forSingleList: true });

    expect(getByTestId('text-input')).toBeInTheDocument();

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).toHaveClass('mr-14');
  });

  it('should only use prop value as initial value', async () => {
    const { rerender, getByTestId } = renderControl({ value: '#ffffff' });

    const swatch = getByTestId('color-swatch');

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toHaveValue('#ffffff');
    expect(swatch).toHaveStyle({
      background: '#ffffff',
      color: 'rgba(255, 255, 255, 0)',
    });

    rerender({ value: '#000000' });
    expect(input).toHaveValue('#ffffff');
    expect(swatch).toHaveStyle({
      background: '#ffffff',
      color: 'rgba(255, 255, 255, 0)',
    });
  });

  it('should use prop value exclusively if field is i18n duplicate', async () => {
    const { rerender, getByTestId } = renderControl({
      field: { ...mockColorField, i18n: 'duplicate' },
      duplicate: true,
      value: '#ffffff',
    });

    const swatch = getByTestId('color-swatch');

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toHaveValue('#ffffff');
    expect(swatch).toHaveStyle({
      background: '#ffffff',
      color: 'rgba(255, 255, 255, 0)',
    });

    rerender({ value: '#000000' });
    expect(input).toHaveValue('#000000');
    expect(swatch).toHaveStyle({
      background: '#000000',
      color: 'rgba(255, 255, 255, 0)',
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

  it('should disable input if disabled', async () => {
    const { getByTestId } = renderControl({ disabled: true });

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toBeDisabled();
  });

  describe('allow input', () => {
    it('should call onChange when text input changes (hex code)', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({
        field: { ...mockColorField, allow_input: true },
      });

      const inputWrapper = getByTestId('text-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      await act(async () => {
        await userEvent.type(input, '#000000');
      });

      expect(onChange).toHaveBeenLastCalledWith('#000000');

      const swatch = getByTestId('color-swatch');
      expect(swatch).toHaveStyle({
        background: '#000000',
        color: 'rgba(255, 255, 255, 0)',
      });
    });

    it('should call onChange when text input changes (rgb code)', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({
        field: { ...mockColorField, allow_input: true },
      });

      const inputWrapper = getByTestId('text-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      await act(async () => {
        await userEvent.type(input, 'rgb(25, 50, 5)');
      });

      expect(onChange).toHaveBeenLastCalledWith('rgb(25, 50, 5)');

      const swatch = getByTestId('color-swatch');
      expect(swatch).toHaveStyle({
        background: 'rgb(25, 50, 5)',
        color: 'rgba(255, 255, 255, 0)',
      });
    });

    it('should call onChange when text input changes (rgba code)', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({
        field: { ...mockColorField, allow_input: true },
      });

      const inputWrapper = getByTestId('text-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      await act(async () => {
        await userEvent.type(input, 'rgba(25, 50, 5, 0.5)');
      });

      expect(onChange).toHaveBeenLastCalledWith('rgba(25, 50, 5, 0.5)');

      const swatch = getByTestId('color-swatch');
      expect(swatch).toHaveStyle({
        background: 'rgba(25, 50, 5, 0.5)',
        color: 'rgba(255, 255, 255, 0)',
      });
    });

    it('should make question mark visible if bad color is put in input', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({
        field: { ...mockColorField, allow_input: true },
      });

      const inputWrapper = getByTestId('text-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      await act(async () => {
        await userEvent.type(input, '#0muz14');
      });

      expect(onChange).toHaveBeenLastCalledWith('#0muz14');

      const swatch = getByTestId('color-swatch');
      expect(swatch).toHaveStyle({
        background: '#fff',
        color: 'rgb(150, 150, 150)',
      });
    });

    it('should focus input on field click', async () => {
      const { getByTestId } = renderControl({
        field: { ...mockColorField, allow_input: true },
      });

      const inputWrapper = getByTestId('text-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).not.toHaveFocus();

      await act(async () => {
        const field = getByTestId('field');
        await userEvent.click(field);
      });

      expect(input).toHaveFocus();
    });
  });
});
