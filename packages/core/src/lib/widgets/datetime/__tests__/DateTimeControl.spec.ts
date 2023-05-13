/**
 * @jest-environment jsdom
 */
import { fireEvent, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockDateField, mockDateTimeField, mockTimeField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import DateTimeControl from '../DateTimeControl';

import type { Matcher, MatcherOptions } from '@testing-library/dom';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { DateTimeField } from '../../../interface';

const CLOCK_WIDTH = 220;
const getClockTouchEvent = (value: number, view: 'minutes' | '12hours') => {
  let itemCount: number;
  if (view === 'minutes') {
    itemCount = 60;
  } else {
    itemCount = 12;
  }

  const angle = Math.PI / 2 - (Math.PI * 2 * value) / itemCount;
  const clientX = Math.round(((1 + Math.cos(angle)) * CLOCK_WIDTH) / 2);
  const clientY = Math.round(((1 - Math.sin(angle)) * CLOCK_WIDTH) / 2);

  return {
    changedTouches: [
      {
        clientX,
        clientY,
      },
    ],
  };
};

async function selectCalendarDate(userEventActions: UserEvent, day: number) {
  await act(async () => {
    const days = document.querySelectorAll('button.MuiPickersDay-root');
    await userEventActions.click(days[day - 1]);
  });
}

async function selectClockTime(
  userEventActions: UserEvent,
  hour: number,
  minute: number,
  ampm: 'am' | 'pm',
) {
  const square = document.querySelector('.MuiClock-squareMask');
  expect(square).toBeTruthy();

  await act(async () => {
    if (ampm === 'am') {
      const amButton = getByText(document.body, 'AM');
      expect(amButton).toBeTruthy();
      await userEventActions.click(amButton!);
    } else {
      const pmButton = getByText(document.body, 'PM');
      expect(pmButton).toBeTruthy();
      await userEventActions.click(pmButton!);
    }
  });

  await act(async () => {
    const hourClockEvent = getClockTouchEvent(hour, '12hours');
    fireEvent.touchMove(square!, hourClockEvent);
    fireEvent.touchEnd(square!, hourClockEvent);
  });

  await act(async () => {
    const minuteClockEvent = getClockTouchEvent(minute, 'minutes');
    fireEvent.touchMove(square!, minuteClockEvent);
    fireEvent.touchEnd(square!, minuteClockEvent);
  });
}

async function selectDate(
  getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
  day: number,
) {
  const userEventActions = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  await act(async () => {
    const inputWrapper = getByTestId('date-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    await userEventActions.click(input);
  });

  await selectCalendarDate(userEventActions, day);
}

async function selectTime(
  getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
  hour: number,
  minute: number,
  ampm: 'am' | 'pm',
) {
  const userEventActions = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  await act(async () => {
    const inputWrapper = getByTestId('time-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    await userEventActions.click(input);
  });

  await selectClockTime(userEventActions, hour, minute, ampm);
}

async function selectDateTime(
  getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
  day: number,
  hour: number,
  minute: number,
  ampm: 'am' | 'pm',
) {
  const userEventActions = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  await act(async () => {
    const inputWrapper = getByTestId('date-time-input');
    const input = inputWrapper.getElementsByTagName('input')[0];
    await userEventActions.click(input);
  });

  await selectCalendarDate(userEventActions, day);

  await selectClockTime(userEventActions, hour, minute, ampm);
}

describe(DateTimeControl.name, () => {
  const renderControl = createWidgetControlHarness(
    DateTimeControl,
    { field: mockDateTimeField },
    { useFakeTimers: true },
  );
  let userEventActions: UserEvent;

  beforeEach(() => {
    userEventActions = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    expect(getByTestId('date-time-input')).toBeInTheDocument();
    expect(getByTestId('datetime-now')).toBeInTheDocument();

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).not.toHaveClass('mr-14');

    // Date Time Widget uses pointer cursor
    expect(label).toHaveClass('cursor-pointer');
    expect(field).toHaveClass('cursor-pointer');

    // Date Time Widget uses default label layout, with bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).toHaveClass('pb-3');
  });

  it('should render as single list item', () => {
    const { getByTestId } = renderControl({ label: 'I am a label', forSingleList: true });

    expect(getByTestId('date-time-input')).toBeInTheDocument();
    expect(getByTestId('datetime-now')).toBeInTheDocument();

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).toHaveClass('mr-14');
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

  describe('datetime', () => {
    it("should default to today's date if no default is provided", () => {
      const { getByTestId } = renderControl({ label: 'I am a label' });

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12T10:15:35.000-10:00');
    });

    it('should use default if provided', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: {
          ...mockDateTimeField,
          default: '2023-01-10T06:23:15.000-10:00',
        },
      });

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-01-10T06:23:15.000-10:00');
    });

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({ value: '2023-02-12T10:15:35.000-10:00' });

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12T10:15:35.000-10:00');

      rerender({ value: '2023-02-18T14:37:02.000-10:00' });
      expect(input).toHaveValue('2023-02-12T10:15:35.000-10:00');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockDateTimeField, i18n: 'duplicate' },
        duplicate: true,
        value: '2023-02-12T10:15:35.000-10:00',
      });

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12T10:15:35.000-10:00');

      rerender({ value: '2023-02-18T14:37:02.000-10:00' });
      expect(input).toHaveValue('2023-02-18T14:37:02.000-10:00');
    });

    it('should disable input and now button if disabled', () => {
      const { getByTestId } = renderControl({ label: 'I am a label', disabled: true });

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toBeDisabled();

      const nowButton = getByTestId('datetime-now');
      expect(nowButton).toBeDisabled();
    });

    it('should focus current date in modal on field click', async () => {
      const { getByTestId } = renderControl();

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).not.toHaveFocus();

      await act(async () => {
        const field = getByTestId('field');
        await userEventActions.click(field);
      });

      const days = document.querySelectorAll('button.MuiPickersDay-root');
      expect(days[11]).toHaveFocus(); // Feb 12th (aka current date)
    });

    it('should open calendar and allow date selection', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({ label: 'I am a label' });

      expect(onChange).not.toHaveBeenCalled();

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      await act(async () => {
        await userEventActions.click(input);
      });

      expect(onChange).not.toHaveBeenCalled();

      const days = document.querySelectorAll('button.MuiPickersDay-root');
      expect(days.length).toBe(28);
      expect(days[0].textContent).toBe('1');

      await act(async () => {
        await userEventActions.click(days[0]);
      });

      expect(onChange).toHaveBeenLastCalledWith('2023-02-01T10:15:35.000-10:00');

      const hours = document.querySelectorAll('.MuiClockNumber-root');
      expect(hours.length).toBe(12);
      expect(hours[0].textContent).toBe('1');

      const square = document.querySelector('.MuiClock-squareMask');
      expect(square).toBeTruthy();

      await act(async () => {
        const hourClockEvent = getClockTouchEvent(1, '12hours');
        fireEvent.touchMove(square!, hourClockEvent);
        fireEvent.touchEnd(square!, hourClockEvent);
      });

      expect(onChange).toHaveBeenLastCalledWith('2023-02-01T01:15:35.000-10:00');

      const minutes = document.querySelectorAll('.MuiClockNumber-root');
      expect(minutes.length).toBe(12);
      expect(minutes[0].textContent).toBe('05');

      await act(async () => {
        const minuteClockEvent = getClockTouchEvent(5, 'minutes');
        fireEvent.touchMove(square!, minuteClockEvent);
        fireEvent.touchEnd(square!, minuteClockEvent);
      });

      expect(onChange).toHaveBeenLastCalledWith('2023-02-01T01:05:35.000-10:00');
    });

    it('should set value to current date and time when now button is clicked', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({
        label: 'I am a label',
      });

      const inputWrapper = getByTestId('date-time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12T10:15:35.000-10:00');

      await selectDateTime(getByTestId, 1, 2, 20, 'am');

      expect(onChange).toHaveBeenLastCalledWith('2023-02-01T02:20:35.000-10:00');
      expect(input).toHaveValue('2023-02-01T02:20:35.000-10:00');

      await act(async () => {
        const nowButton = getByTestId('datetime-now');
        await userEventActions.click(nowButton);
      });

      expect(onChange).toHaveBeenLastCalledWith('2023-02-12T10:15:36.000-10:00'); // Testing framework moves the time forward by a second by this point
      expect(input).toHaveValue('2023-02-12T10:15:36.000-10:00');
    });

    describe('format', () => {
      it('uses custom date display format', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateTimeField,
            date_format: 'MM/dd/yyyy',
          },
        });

        const inputWrapper = getByTestId('date-time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('02/12/2023 10:15:35.000-10:00');

        await selectDateTime(getByTestId, 1, 2, 20, 'am');

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01T02:20:35.000-10:00');
        expect(input).toHaveValue('02/01/2023 02:20:35.000-10:00');
      });

      it('uses custom time display format', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateTimeField,
            time_format: 'hh:mm aaa',
          },
        });

        const inputWrapper = getByTestId('date-time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('2023-02-12 10:15 am');

        await selectDateTime(getByTestId, 1, 2, 20, 'am');

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01T02:20:35.000-10:00');
        expect(input).toHaveValue('2023-02-01 02:20 am');
      });

      it('uses custom date and time display formats', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateTimeField,
            date_format: 'MM/dd/yyyy',
            time_format: 'hh:mm aaa',
          },
        });

        const inputWrapper = getByTestId('date-time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('02/12/2023 10:15 am');

        await selectDateTime(getByTestId, 1, 2, 20, 'am');

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01T02:20:35.000-10:00');
        expect(input).toHaveValue('02/01/2023 02:20 am');
      });

      it('uses custom storage format', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateTimeField,
            format: 'yyyy-MM-dd HH:mm',
            date_format: 'MM/dd/yyyy',
            time_format: 'hh:mm aaa',
          },
        });

        const inputWrapper = getByTestId('date-time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('02/12/2023 10:15 am');

        await selectDateTime(getByTestId, 1, 3, 20, 'pm');

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01 15:20');
        expect(input).toHaveValue('02/01/2023 03:20 pm');
      });

      it('uses storage format for display if no display format specified', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateTimeField,
            format: 'yyyy-MM-dd HH:mm',
          },
        });

        const inputWrapper = getByTestId('date-time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('2023-02-12 10:15');

        await selectDateTime(getByTestId, 1, 3, 20, 'pm');

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01 15:20');
        expect(input).toHaveValue('2023-02-01 15:20');
      });
    });

    describe('utc', () => {
      const utcField: DateTimeField = {
        ...mockDateTimeField,
        picker_utc: true,
      };

      it("should default to today's date if no default is provided", () => {
        const { getByTestId } = renderControl({ label: 'I am a label', field: utcField });

        const inputWrapper = getByTestId('date-time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('2023-02-12T20:15:35.000');
      });

      it('should use default if provided (assuming default is already in UTC)', () => {
        const { getByTestId } = renderControl({
          label: 'I am a label',
          field: {
            ...utcField,
            default: '2023-01-10T06:23:15.000',
          },
        });

        const inputWrapper = getByTestId('date-time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('2023-01-10T06:23:15.000');
      });
    });
  });

  describe('date', () => {
    it("should default to today's date if no default is provided", () => {
      const { getByTestId } = renderControl({ label: 'I am a label', field: mockDateField });

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12');
    });

    it('should use default if provided', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: {
          ...mockDateField,
          default: '2023-01-10',
        },
      });

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-01-10');
    });

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockDateField,
        value: '2023-02-12',
      });

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12');

      rerender({ value: '2023-02-18' });
      expect(input).toHaveValue('2023-02-12');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockDateField, i18n: 'duplicate' },
        duplicate: true,
        value: '2023-02-12',
      });

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12');

      rerender({ value: '2023-02-18' });
      expect(input).toHaveValue('2023-02-18');
    });

    it('should disable input and now button if disabled', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: mockDateField,
        disabled: true,
      });

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toBeDisabled();

      const nowButton = getByTestId('datetime-now');
      expect(nowButton).toBeDisabled();
    });

    it('should focus current date in modal on field click', async () => {
      const { getByTestId } = renderControl({ field: mockDateField });

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).not.toHaveFocus();

      await act(async () => {
        const field = getByTestId('field');
        await userEventActions.click(field);
      });

      const days = document.querySelectorAll('button.MuiPickersDay-root');
      expect(days[11]).toHaveFocus(); // Feb 12th (aka current date)
    });

    it('should open calendar and allow date selection', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({ label: 'I am a label', field: mockDateField });

      expect(onChange).not.toHaveBeenCalled();

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      await act(async () => {
        await userEventActions.click(input);
      });

      expect(onChange).not.toHaveBeenCalled();

      const days = document.querySelectorAll('button.MuiPickersDay-root');
      expect(days.length).toBe(28);
      expect(days[0].textContent).toBe('1');

      await act(async () => {
        await userEventActions.click(days[0]);
      });

      expect(onChange).toHaveBeenLastCalledWith('2023-02-01');
    });

    it('should set value to current date when now button is clicked', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({
        label: 'I am a label',
        field: mockDateField,
      });

      const inputWrapper = getByTestId('date-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('2023-02-12');

      await selectDate(getByTestId, 1);

      expect(onChange).toHaveBeenLastCalledWith('2023-02-01');
      expect(input).toHaveValue('2023-02-01');

      await act(async () => {
        const nowButton = getByTestId('datetime-now');
        await userEventActions.click(nowButton);
      });

      expect(onChange).toHaveBeenLastCalledWith('2023-02-12');
      expect(input).toHaveValue('2023-02-12');
    });

    describe('format', () => {
      it('uses custom date display format', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateField,
            date_format: 'MM/dd/yyyy',
          },
        });

        const inputWrapper = getByTestId('date-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('02/12/2023');

        await selectDate(getByTestId, 1);

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01');
        expect(input).toHaveValue('02/01/2023');
      });

      it('uses custom storage format', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateField,
            format: 'yyyy-MM-dd',
            date_format: 'MM/dd/yyyy',
          },
        });

        const inputWrapper = getByTestId('date-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('02/12/2023');

        await selectDate(getByTestId, 1);

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01');
        expect(input).toHaveValue('02/01/2023');
      });

      it('uses storage format for display if no display format specified', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockDateField,
            format: 'yyyy-MM-dd',
          },
        });

        const inputWrapper = getByTestId('date-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('2023-02-12');

        await selectDate(getByTestId, 1);

        expect(onChange).toHaveBeenLastCalledWith('2023-02-01');
        expect(input).toHaveValue('2023-02-01');
      });
    });

    describe('utc', () => {
      const utcField: DateTimeField = {
        ...mockDateField,
        picker_utc: true,
      };

      it("should default to today's date if no default is provided", () => {
        const { getByTestId } = renderControl({ label: 'I am a label', field: utcField });

        const inputWrapper = getByTestId('date-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('2023-02-12');
      });

      it('should use default if provided (assuming default is already in UTC)', () => {
        const { getByTestId } = renderControl({
          label: 'I am a label',
          field: {
            ...utcField,
            default: '2023-01-10',
          },
        });

        const inputWrapper = getByTestId('date-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('2023-01-10');
      });
    });
  });

  describe('time', () => {
    it("should default to today's date if no default is provided", () => {
      const { getByTestId } = renderControl({ label: 'I am a label', field: mockTimeField });

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('10:15:35.000-10:00');
    });

    it('should use default if provided', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: {
          ...mockTimeField,
          default: '06:23:15.000-10:00',
        },
      });

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('06:23:15.000-10:00');
    });

    it('should only use prop value as initial value', async () => {
      const { rerender, getByTestId } = renderControl({
        field: mockTimeField,
        value: '10:15:35.000-10:00',
      });

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('10:15:35.000-10:00');

      rerender({ value: '14:37:02.000-10:00' });
      expect(input).toHaveValue('10:15:35.000-10:00');
    });

    it('should use prop value exclusively if field is i18n duplicate', async () => {
      const { rerender, getByTestId } = renderControl({
        field: { ...mockTimeField, i18n: 'duplicate' },
        duplicate: true,
        value: '10:15:35.000-10:00',
      });

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      expect(input).toHaveValue('10:15:35.000-10:00');

      rerender({ value: '14:37:02.000-10:00' });
      expect(input).toHaveValue('14:37:02.000-10:00');
    });

    it('should disable input and now button if disabled', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: mockTimeField,
        disabled: true,
      });

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      expect(input).toBeDisabled();

      const nowButton = getByTestId('datetime-now');
      expect(nowButton).toBeDisabled();
    });

    it('should focus current time in modal on field click', async () => {
      const { getByTestId } = renderControl({ field: mockTimeField });

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).not.toHaveFocus();

      await act(async () => {
        const field = getByTestId('field');
        await userEventActions.click(field);
      });

      const clock = document.querySelector('.MuiClock-wrapper');
      expect(clock).toHaveFocus();
    });

    it('should open calendar and allow date selection', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({ label: 'I am a label', field: mockTimeField });

      expect(onChange).not.toHaveBeenCalled();

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];

      await act(async () => {
        await userEventActions.click(input);
      });

      expect(onChange).not.toHaveBeenCalled();

      const hours = document.querySelectorAll('.MuiClockNumber-root');
      expect(hours.length).toBe(12);
      expect(hours[0].textContent).toBe('1');

      const square = document.querySelector('.MuiClock-squareMask');
      expect(square).toBeTruthy();

      await act(async () => {
        const hourClockEvent = getClockTouchEvent(1, '12hours');
        fireEvent.touchMove(square!, hourClockEvent);
        fireEvent.touchEnd(square!, hourClockEvent);
      });

      expect(onChange).toHaveBeenLastCalledWith('01:15:35.000-10:00');

      const minutes = document.querySelectorAll('.MuiClockNumber-root');
      expect(minutes.length).toBe(12);
      expect(minutes[0].textContent).toBe('05');

      await act(async () => {
        const minuteClockEvent = getClockTouchEvent(5, 'minutes');
        fireEvent.touchMove(square!, minuteClockEvent);
        fireEvent.touchEnd(square!, minuteClockEvent);
      });

      expect(onChange).toHaveBeenLastCalledWith('01:05:35.000-10:00');
    });

    it('should set value to current time when now button is clicked', async () => {
      const {
        getByTestId,
        props: { onChange },
      } = renderControl({
        label: 'I am a label',
        field: mockTimeField,
      });

      const inputWrapper = getByTestId('time-input');
      const input = inputWrapper.getElementsByTagName('input')[0];
      expect(input).toHaveValue('10:15:35.000-10:00');

      await selectTime(getByTestId, 2, 20, 'am');

      expect(onChange).toHaveBeenLastCalledWith('02:20:35.000-10:00');
      expect(input).toHaveValue('02:20:35.000-10:00');

      await act(async () => {
        const nowButton = getByTestId('datetime-now');
        await userEventActions.click(nowButton);
      });

      expect(onChange).toHaveBeenLastCalledWith('10:15:36.000-10:00'); // Testing framework moves the time forward by a second by this point
      expect(input).toHaveValue('10:15:36.000-10:00');
    });

    describe('format', () => {
      it('uses custom time display format', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockTimeField,
            time_format: 'hh:mm aaa',
          },
        });

        const inputWrapper = getByTestId('time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('10:15 am');

        await selectTime(getByTestId, 2, 20, 'am');

        expect(onChange).toHaveBeenLastCalledWith('02:20:35.000-10:00');
        expect(input).toHaveValue('02:20 am');
      });

      it('uses custom storage format', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockTimeField,
            format: 'HH:mm',
            time_format: 'hh:mm aaa',
          },
        });

        const inputWrapper = getByTestId('time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('10:15 am');

        await selectTime(getByTestId, 3, 20, 'pm');

        expect(onChange).toHaveBeenLastCalledWith('15:20');
        expect(input).toHaveValue('03:20 pm');
      });

      it('uses storage format for display if no display format specified', async () => {
        const {
          getByTestId,
          props: { onChange },
        } = renderControl({
          label: 'I am a label',
          field: {
            ...mockTimeField,
            format: 'HH:mm',
          },
        });

        const inputWrapper = getByTestId('time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('10:15');

        await selectTime(getByTestId, 3, 20, 'pm');

        expect(onChange).toHaveBeenLastCalledWith('15:20');
        expect(input).toHaveValue('15:20');
      });
    });

    describe('utc', () => {
      const utcField: DateTimeField = {
        ...mockTimeField,
        picker_utc: true,
      };

      it("should default to today's date if no default is provided", () => {
        const { getByTestId } = renderControl({ label: 'I am a label', field: utcField });

        const inputWrapper = getByTestId('time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('20:15:35.000');
      });

      it('should use default if provided (assuming default is already in UTC)', () => {
        const { getByTestId } = renderControl({
          label: 'I am a label',
          field: {
            ...utcField,
            default: '06:23:15.000',
          },
        });

        const inputWrapper = getByTestId('time-input');
        const input = inputWrapper.getElementsByTagName('input')[0];
        expect(input).toHaveValue('06:23:15.000');
      });
    });
  });
});
