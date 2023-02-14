import React, { forwardRef, useCallback } from 'react';

import type { ChangeEvent, ChangeEventHandler } from 'react';

export interface SwitchProps {
  label?: string;
  value: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Switch = forwardRef<HTMLInputElement | null, SwitchProps>(
  ({ label, value, disabled, onChange }, ref) => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      },
      [onChange],
    );

    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          data-testid="switch-input"
          ref={ref}
          type="checkbox"
          checked={value}
          className="sr-only peer"
          disabled={disabled}
          onChange={handleChange}
          onClick={() => false}
        />
        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        {label ? (
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
        ) : null}
      </label>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;
