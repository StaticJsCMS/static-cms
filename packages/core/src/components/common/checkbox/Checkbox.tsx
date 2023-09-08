import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useRef } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ChangeEventHandler, FC, KeyboardEvent, MouseEvent } from 'react';

import './Checkbox.css';

export const classes = generateClassNames('Checkbox', [
  'root',
  'disabled',
  'input',
  'custom-input',
  'checkmark',
]);

export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: FC<CheckboxProps> = ({ checked, disabled = false, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleNoop = useCallback((event: KeyboardEvent | MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.stopPropagation();
      event.preventDefault();
      inputRef.current?.click();
    }
  }, []);

  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    inputRef.current?.click();
  }, []);

  return (
    <label
      className={classNames(classes.root, disabled && classes.disabled)}
      onClick={handleNoop}
      onKeyDown={handleKeydown}
    >
      <input
        data-testid="switch-input"
        ref={inputRef}
        type="checkbox"
        checked={checked}
        className={classes.input}
        disabled={disabled}
        onChange={onChange}
        onClick={handleNoop}
        onKeyDown={handleKeydown}
      />
      <div className={classes['custom-input']} onClick={handleClick} onKeyDown={handleKeydown}>
        {checked ? (
          <CheckIcon
            className={classes.checkmark}
            onClick={handleClick}
            onKeyDown={handleKeydown}
          />
        ) : null}
      </div>
    </label>
  );
};

export default Checkbox;
