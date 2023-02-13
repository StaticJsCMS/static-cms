/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { mockDateTimeField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import DateTimeControl from '../DateTimeControl';

describe(DateTimeControl.name, () => {
  const renderControl = createWidgetControlHarness(DateTimeControl, { field: mockDateTimeField });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    expect(getByTestId('text-input')).toBeInTheDocument();

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

    expect(getByTestId('datetime-now')).toBeInTheDocument();
    expect(getByTestId('date-time-input')).toBeInTheDocument();
  });
});
