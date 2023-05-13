import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useRef } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ChangeEventHandler, FC, KeyboardEvent, MouseEvent } from 'react';

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
      className={classNames(
        `
        relative
        inline-flex
        items-center
        cursor-pointer
      `,
        disabled && 'cursor-default',
      )}
      onClick={handleNoop}
      onKeyDown={handleKeydown}
    >
      <input
        data-testid="switch-input"
        ref={inputRef}
        type="checkbox"
        checked={checked}
        className="sr-only peer"
        disabled={disabled}
        onChange={onChange}
        onClick={handleNoop}
        onKeyDown={handleKeydown}
      />
      <div
        className={classNames(
          `
            w-6
            h-6
            peer
            peer-focus:ring-4
            peer-focus:ring-blue-300
            dark:peer-focus:ring-blue-800
            peer-checked:after:translate-x-full
            text-blue-600
            border-gray-300
            rounded
            focus:ring-blue-500
            dark:focus:ring-blue-600
            dark:ring-offset-gray-800
            focus:ring-2
            dark:border-gray-600
            select-none
            flex
            items-center
            justify-center
          `,
          disabled
            ? `
              peer-checked:bg-blue-600/25
              peer-checked:after:border-gray-500/75
              bg-gray-100/75
              dark:bg-gray-700/75
            `
            : `
              peer-checked:bg-blue-600
              peer-checked:after:border-white
              bg-gray-100
              dark:bg-gray-700
            `,
        )}
        onClick={handleClick}
        onKeyDown={handleKeydown}
      >
        {checked ? (
          <CheckIcon
            className="
              w-5
              h-5
              text-white
            "
            onClick={handleClick}
            onKeyDown={handleKeydown}
          />
        ) : null}
      </div>
    </label>
  );
};

export default Checkbox;
