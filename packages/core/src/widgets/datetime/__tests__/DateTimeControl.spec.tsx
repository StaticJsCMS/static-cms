/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { mockDateTimeField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import DateTimeControl from '../DateTimeControl';

import type { DateTimeField } from '../../../interface';

describe(DateTimeControl.name, () => {
  const renderControl = createWidgetControlHarness(DateTimeControl, { field: mockDateTimeField });

  beforeAll(() => {
    jest.useFakeTimers({ now: new Date(2023, 1, 12, 10, 5, 35) });
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

    // Date Time Widget uses text cursor
    expect(label).toHaveClass('cursor-text');
    expect(field).toHaveClass('cursor-text');

    // Date Time Widget uses default label layout, with bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).toHaveClass('pb-3');
  });

  fit("should default to today's date if no default is provided", () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    const input = getByTestId('date-time-input');
    expect(input).toHaveValue('2023-02-12T10:05:35.000-05:00');
  });

  it('should use default if provided', () => {
    const { getByTestId } = renderControl({
      label: 'I am a label',
      field: {
        ...mockDateTimeField,
        default: '2023-01-10T06:23:15.000-05:00',
      },
    });

    const input = getByTestId('date-time-input');
    expect(input).toHaveValue('2023-01-10T06:23:15.000-05:00');
  });

  describe('utc', () => {
    const utcField: DateTimeField = {
      ...mockDateTimeField,
      picker_utc: true,
    };

    fit("should default to today's date if no default is provided", () => {
      const { getByTestId } = renderControl({ label: 'I am a label', field: utcField });

      const input = getByTestId('date-time-input');
      expect(input).toHaveValue('2023-02-12T15:05:35.000Z');
    });

    it('should use default if provided', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: {
          ...utcField,
          default: '2023-01-10T06:23:15.000Z',
        },
      });

      const input = getByTestId('date-time-input');
      expect(input).toHaveValue('2023-01-10T06:23:15.000Z');
    });
  });
});
