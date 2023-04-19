/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, waitFor } from '@testing-library/react';

import { mockSelectField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import SelectControl from '../SelectControl';

import type { SelectField } from '@staticcms/core/interface';

describe(SelectControl.name, () => {
  const renderControl = createWidgetControlHarness(SelectControl, { field: mockSelectField });

  it('should disable input if disabled', async () => {
    const { getByTestId } = renderControl({ disabled: true });

    const input = getByTestId('select-input');
    expect(input).toBeDisabled();
  });

  it('should open and close options on field click', async () => {
    const { getByTestId, queryByTestId } = renderControl();

    const option1 = 'select-option-Option 1';
    const option2 = 'select-option-Option 2';

    await waitFor(() => {
      expect(queryByTestId(option1)).not.toBeInTheDocument();
      expect(queryByTestId(option2)).not.toBeInTheDocument();
    });

    await act(async () => {
      const field = getByTestId('field');
      await userEvent.click(field);
    });

    await waitFor(() => {
      expect(queryByTestId(option1)).toBeInTheDocument();
      expect(queryByTestId(option2)).toBeInTheDocument();
    });

    await act(async () => {
      const field = getByTestId('field');
      await userEvent.click(field);
    });

    await waitFor(() => {
      expect(queryByTestId(option1)).not.toBeInTheDocument();
      expect(queryByTestId(option2)).not.toBeInTheDocument();
    });
  });

  describe('simple string select', () => {
    it('should render', () => {
      const { getByTestId } = renderControl({ label: 'I am a label' });

      expect(getByTestId('select-input')).toBeInTheDocument();

      const label = getByTestId('label');
      expect(label.textContent).toBe('I am a label');
      expect(label).toHaveClass('text-slate-500');

      const field = getByTestId('field');
      expect(field).toHaveClass('group/active');

      const fieldWrapper = getByTestId('field-wrapper');
      expect(fieldWrapper).not.toHaveClass('mr-14');

      // Select Widget uses pointer cursor
      expect(label).toHaveClass('cursor-pointer');
      expect(field).toHaveClass('cursor-pointer');

      // Select Widget uses default label layout, without bottom padding on field
      expect(label).toHaveClass('px-3', 'pt-3');
      expect(field).not.toHaveClass('pb-3');
    });

    it('should render as single list item', () => {
      const { getByTestId } = renderControl({ label: 'I am a label', forSingleList: true });

      expect(getByTestId('select-input')).toBeInTheDocument();

      const fieldWrapper = getByTestId('field-wrapper');
      expect(fieldWrapper).toHaveClass('mr-14');
    });

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({ value: 'Option 1' });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 1');

      rerender({ value: 'Option 2' });
      expect(input.textContent).toBe('Option 1');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: 'Option 1',
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 1');

      rerender({ value: 'Option 2' });
      expect(input.textContent).toBe('Option 2');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl();

      const input = getByTestId('select-input');

      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-Option 1';
      const option2 = 'select-option-Option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith('Option 2');
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith('Option 1');
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected
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
  });

  describe('simple number select', () => {
    const mockNumberSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      options: [1, 2, 3],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockNumberSelectField,
        value: 2,
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('2');

      rerender({ value: 3 });
      expect(input.textContent).toBe('2');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: 2,
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('2');

      rerender({ value: 3 });
      expect(input.textContent).toBe('3');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockNumberSelectField });

      const input = getByTestId('select-input');

      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(2);
      expect(input.textContent).toBe('2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(1);
      expect(input.textContent).toBe('1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected
    });
  });

  describe('simple mixed select', () => {
    const mockMixedSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      options: [1, 'Option 2', 3],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMixedSelectField,
        value: 1,
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('1');

      rerender({ value: 'Option 2' });
      expect(input.textContent).toBe('1');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMixedSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: 1,
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('1');

      rerender({ value: 'Option 2' });
      expect(input.textContent).toBe('Option 2');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMixedSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-Option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith('Option 2');
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(1);
      expect(input.textContent).toBe('1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected
    });
  });

  describe('value/label string select', () => {
    const mockStringSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      options: [
        {
          value: 'option 1',
          label: 'Option 1',
        },
        {
          value: 'option 2',
          label: 'Option 2',
        },
        {
          value: 'option 3',
          label: 'Option 3',
        },
      ],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockStringSelectField,
        value: 'option 2',
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2');

      rerender({ value: 'option 3' });
      expect(input.textContent).toBe('Option 2');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockStringSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: 'option 2',
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2');

      rerender({ value: 'option 3' });
      expect(input.textContent).toBe('Option 3');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockStringSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-option 1';
      const option2 = 'select-option-option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith('option 2');
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith('option 1');
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected
    });
  });

  describe('value/label number select', () => {
    const mockNumberSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      options: [
        {
          value: 1,
          label: 'Option 1',
        },
        {
          value: 2,
          label: 'Option 2',
        },
        {
          value: 3,
          label: 'Option 3',
        },
      ],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockNumberSelectField,
        value: 2,
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2');

      rerender({ value: 3 });
      expect(input.textContent).toBe('Option 2');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockNumberSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: 2,
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2');

      rerender({ value: 3 });
      expect(input.textContent).toBe('Option 3');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockNumberSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(2);
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(1);
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected
    });
  });

  describe('value/label mixed select', () => {
    const mockMixedSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      options: [
        {
          value: 1,
          label: 'Option 1',
        },
        {
          value: 'option 2',
          label: 'Option 2',
        },
        {
          value: 3,
          label: 'Option 3',
        },
      ],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMixedSelectField,
        value: 'option 2',
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2');

      rerender({ value: 3 });
      expect(input.textContent).toBe('Option 2');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMixedSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: 'option 2',
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2');

      rerender({ value: 3 });
      expect(input.textContent).toBe('Option 3');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMixedSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith('option 2');
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(1);
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not selected
    });
  });

  describe('multi string select', () => {
    const mockMultiStringSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      multiple: true,
      options: ['Option 1', 'Option 2', 'Option 3'],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMultiStringSelectField,
        value: ['Option 2', 'Option 3'],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: ['Option 1'] });
      expect(input.textContent).toBe('Option 2Option 3');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMultiStringSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: ['Option 2', 'Option 3'],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: ['Option 1'] });
      expect(input.textContent).toBe('Option 1');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMultiStringSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-Option 1';
      const option2 = 'select-option-Option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Option 2']);
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Option 2', 'Option 1']);
      expect(input.textContent).toBe('Option 2Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Option 1']);
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected
    });
  });

  describe('multi number select', () => {
    const mockMultiNumberSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      multiple: true,
      options: [1, 2, 3],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMultiNumberSelectField,
        value: [2, 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('23');

      rerender({ value: [1] });
      expect(input.textContent).toBe('23');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMultiNumberSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: [2, 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('23');

      rerender({ value: [1] });
      expect(input.textContent).toBe('1');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMultiNumberSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith([2]);
      expect(input.textContent).toBe('2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith([2, 1]);
      expect(input.textContent).toBe('21');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith([1]);
      expect(input.textContent).toBe('1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected
    });
  });

  describe('multi mixed select', () => {
    const mockMultiMixedSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      multiple: true,
      options: [1, 'Option 2', 3],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMultiMixedSelectField,
        value: ['Option 2', 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 23');

      rerender({ value: [1] });
      expect(input.textContent).toBe('Option 23');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMultiMixedSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: ['Option 2', 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 23');

      rerender({ value: [1] });
      expect(input.textContent).toBe('1');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMultiMixedSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-Option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Option 2']);
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(['Option 2', 1]);
      expect(input.textContent).toBe('Option 21');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith([1]);
      expect(input.textContent).toBe('1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected
    });
  });

  describe('multi value/label string select', () => {
    const mockMultiStringSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      multiple: true,
      options: [
        { value: 'option 1', label: 'Option 1' },
        { value: 'option 2', label: 'Option 2' },
        { value: 'option 3', label: 'Option 3' },
      ],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMultiStringSelectField,
        value: ['option 2', 'option 3'],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: ['option 1'] });
      expect(input.textContent).toBe('Option 2Option 3');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMultiStringSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: ['option 2', 'option 3'],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: ['option 1'] });
      expect(input.textContent).toBe('Option 1');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMultiStringSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-option 1';
      const option2 = 'select-option-option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['option 2']);
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(['option 2', 'option 1']);
      expect(input.textContent).toBe('Option 2Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['option 1']);
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected
    });
  });

  describe('multi value/label number select', () => {
    const mockMultiNumberSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      multiple: true,
      options: [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
      ],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMultiNumberSelectField,
        value: [2, 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: [1] });
      expect(input.textContent).toBe('Option 2Option 3');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMultiNumberSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: [2, 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: [1] });
      expect(input.textContent).toBe('Option 1');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMultiNumberSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith([2]);
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith([2, 1]);
      expect(input.textContent).toBe('Option 2Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith([1]);
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected
    });
  });

  describe('multi value/label mixed select', () => {
    const mockMultiNumberSelectField: SelectField = {
      label: 'String',
      name: 'mock_string',
      widget: 'select',
      multiple: true,
      options: [
        { value: 1, label: 'Option 1' },
        { value: 'option 2', label: 'Option 2' },
        { value: 3, label: 'Option 3' },
      ],
    };

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockMultiNumberSelectField,
        value: ['option 2', 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: [1] });
      expect(input.textContent).toBe('Option 2Option 3');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockMultiNumberSelectField, i18n: 'duplicate' },
        duplicate: true,
        value: ['option 2', 3],
      });

      const input = getByTestId('select-input');
      expect(input.textContent).toBe('Option 2Option 3');

      rerender({ value: [1] });
      expect(input.textContent).toBe('Option 1');
    });

    it('should call onChange when text input changes', async () => {
      const {
        getByTestId,
        queryByTestId,
        props: { onChange },
      } = renderControl({ field: mockMultiNumberSelectField });

      const input = getByTestId('select-input');
      await act(async () => {
        await userEvent.click(input);
      });

      const option1 = 'select-option-1';
      const option2 = 'select-option-option 2';

      await waitFor(() => {
        expect(queryByTestId(option1)).toBeInTheDocument();
        expect(queryByTestId(option2)).toBeInTheDocument();
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith(['option 2']);
      expect(input.textContent).toBe('Option 2');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('text-gray-900'); // Not Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option1));
      });

      expect(onChange).toHaveBeenLastCalledWith(['option 2', 1]);
      expect(input.textContent).toBe('Option 2Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected

      await act(async () => {
        await userEvent.click(getByTestId(option2));
      });

      expect(onChange).toHaveBeenLastCalledWith([1]);
      expect(input.textContent).toBe('Option 1');

      await act(async () => {
        await userEvent.click(input);
      });

      expect(getByTestId(option1)).toHaveClass('bg-blue-400/75', 'text-gray-900'); // Selected
      expect(getByTestId(option2)).toHaveClass('text-gray-900'); // Not Selected
    });
  });
});
