/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { v4, validate } from 'uuid';

import { mockUUIDField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import UUIDControl from '../UUIDControl';

describe(UUIDControl.name, () => {
  const renderControl = createWidgetControlHarness(UUIDControl, { field: mockUUIDField });

  const mockValidate = validate as jest.Mock;
  const mockUUID = v4 as jest.Mock;

  beforeEach(() => {
    mockValidate.mockReturnValue(true);
    mockUUID.mockReturnValue('I_AM_A_NEW_UUID');
  });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('readonly');

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).not.toHaveClass('mr-14');

    // String Widget uses text cursor
    expect(label).toHaveClass('cursor-text');
    expect(field).toHaveClass('cursor-text');

    // String Widget uses default label layout, with bottom padding on field
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
    const { rerender, getByTestId } = renderControl({ value: 'I_AM_A_VALID_UUID' });

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toHaveValue('I_AM_A_VALID_UUID');

    rerender({ value: 'i am a new value' });
    expect(input).toHaveValue('I_AM_A_VALID_UUID');
  });

  it('should use prop value exclusively if field is i18n duplicate', async () => {
    const { rerender, getByTestId } = renderControl({
      field: { ...mockUUIDField, i18n: 'duplicate' },
      duplicate: true,
      value: 'I_AM_A_VALID_UUID',
    });

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toHaveValue('I_AM_A_VALID_UUID');

    rerender({ value: 'I_AM_ANOTHER_VALID_UUID' });
    expect(input).toHaveValue('I_AM_ANOTHER_VALID_UUID');
  });

  it('should generate a new UUID if provided on is invalid', async () => {
    mockValidate.mockReturnValue(false);

    const {
      getByTestId,
      props: { onChange },
    } = renderControl({ value: 'I_AM_AN_INVALID_UUID' });

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toHaveValue('I_AM_A_NEW_UUID');
    expect(onChange).toHaveBeenLastCalledWith('I_AM_A_NEW_UUID');
  });

  it('should generate a new UUID if none is provided', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toHaveValue('I_AM_A_NEW_UUID');

    expect(onChange).toHaveBeenLastCalledWith('I_AM_A_NEW_UUID');
  });

  it('shows generate new uuid button by default', async () => {
    const { queryByTestId } = renderControl();

    expect(queryByTestId('generate-new-uuid')).toBeInTheDocument();
  });

  it('hides generate new uuid button if allow_regenerate is false', async () => {
    const { queryByTestId } = renderControl({
      field: {
        ...mockUUIDField,
        allow_regenerate: false,
      },
    });

    expect(queryByTestId('generate-new-uuid')).not.toBeInTheDocument();
  });

  it('should generate a new UUID when generate new uuid button is clicked', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toHaveValue('I_AM_A_NEW_UUID');
    expect(onChange).toHaveBeenLastCalledWith('I_AM_A_NEW_UUID');

    mockUUID.mockReturnValue('I_AM_ANOTHER_NEW_UUID');
    const generateNewUUIDButton = getByTestId('generate-new-uuid');

    // No change yet
    expect(input).toHaveValue('I_AM_A_NEW_UUID');

    await act(async () => {
      await userEvent.click(generateNewUUIDButton);
    });

    expect(input).toHaveValue('I_AM_ANOTHER_NEW_UUID');
    expect(onChange).toHaveBeenLastCalledWith('I_AM_ANOTHER_NEW_UUID');
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

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).not.toHaveFocus();

    await act(async () => {
      const field = getByTestId('field');
      await userEvent.click(field);
    });

    expect(input).toHaveFocus();
  });

  it('should disable input if disabled', async () => {
    const { getByTestId } = renderControl({ disabled: true });

    const inputWrapper = getByTestId('text-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    expect(input).toBeDisabled();
  });
});
