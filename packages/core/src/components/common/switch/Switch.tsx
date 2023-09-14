import React, { forwardRef, useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ChangeEvent, ChangeEventHandler } from 'react';

import './Switch.css';

export const classes = generateClassNames('Switch', [
  'root',
  'disabled',
  'input',
  'toggle',
  'label',
]);

export interface SwitchProps {
  label?: string;
  value: boolean;
  disabled?: boolean;
  rootClassName?: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Switch = forwardRef<HTMLInputElement | null, SwitchProps>(
  ({ label, value, disabled, rootClassName, inputClassName, onChange }, ref) => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      },
      [onChange],
    );

    return (
      <label className={classNames(classes.root, disabled && classes.disabled, rootClassName)}>
        <input
          data-testid="switch-input"
          ref={ref}
          type="checkbox"
          checked={value}
          className={classNames(classes.input, inputClassName)}
          disabled={disabled}
          onChange={handleChange}
          onClick={() => false}
        />
        <div className={classes.toggle} />
        {label ? <span className={classes.label}>{label}</span> : null}
      </label>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;
