import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useRef } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ChangeEventHandler, FC, KeyboardEvent, MouseEvent } from 'react';

import './Checkbox.css';

export const classes = generateClassNames('Checkbox', [
  'root',
  'sm',
  'md',
  'disabled',
  'input',
  'custom-input',
  'checkmark',
]);

export interface CheckboxProps {
  id?: string;
  size?: 'sm' | 'md';
  checked: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: FC<CheckboxProps> = ({
  id,
  size = 'md',
  checked,
  disabled = false,
  readOnly = false,
  onChange,
}) => {
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
      className={classNames(classes.root, classes[size], disabled && classes.disabled)}
      onClick={handleNoop}
      onKeyDown={handleKeydown}
    >
      <input
        id={id}
        data-testid="switch-input"
        ref={inputRef}
        type="checkbox"
        checked={checked}
        className={classes.input}
        disabled={disabled}
        readOnly={readOnly}
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
