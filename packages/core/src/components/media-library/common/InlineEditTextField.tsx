import React, { useCallback, useEffect, useRef, useState } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ChangeEvent, FC, KeyboardEvent } from 'react';

interface InlineEditTextFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InlineEditTextField: FC<InlineEditTextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  useEffect(() => {
    setInternalValue(value ?? '');
  }, [value]);

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleValueClick = useCallback(() => {
    if (!onChange) {
      return;
    }

    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [onChange]);

  const closeInput = useCallback(() => {
    if (!onChange) {
      return;
    }

    setEditing(false);
    if (internalValue !== value) {
      onChange(internalValue);
    }
  }, [internalValue, onChange, value]);

  const handleInputBlur = useCallback(() => {
    closeInput();
  }, [closeInput]);

  const handleInputKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        closeInput();
      }
    },
    [closeInput],
  );

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
  }, []);

  return (
    <div
      className="
        flex
        flex-col
        gap-1
        group/edit-field
      "
    >
      <label
        htmlFor={label}
        className={classNames(
          `
            w-full
            flex
            text-xs
            font-bold
            dark:font-semibold
          `,
          onChange &&
            `
              group-focus-within/edit-field:text-blue-500
              group-hover/edit-field:text-blue-500
            `,
        )}
      >
        {label}
      </label>
      {!editing || !onChange ? (
        <div
          key="value"
          className={classNames(
            `
              flex
              items-center
              w-full
              p-1.5
              -ml-1.5
              text-sm
              whitespace-nowrap
              overflow-hidden
              h-input
              rounded-md
              border
              text-slate-600
              dark:font-semibold
              dark:text-gray-100
            `,
            onChange
              ? `
                cursor-pointer
                border-gray-100
                hover:border-gray-300
                dark:border-slate-600
              `
              : `
                border-transparent
              `,
          )}
          onClick={handleValueClick}
        >
          {internalValue}
        </div>
      ) : (
        <input
          key="input"
          id={label}
          ref={inputRef}
          className="
            block
            w-full
            p-1.5
            -ml-1.5
            text-sm
            text-gray-900
            border
            border-gray-300
            rounded-md
            bg-gray-50
            focus-visible:outline-none
            focus:ring-4
            focus:ring-gray-200
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-slate-700
            h-input
          "
          value={internalValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
          onBlur={handleInputBlur}
        />
      )}
    </div>
  );
};

export default InlineEditTextField;
