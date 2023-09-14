import React, { useCallback, useEffect, useRef, useState } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ChangeEvent, FC, KeyboardEvent } from 'react';

import './InlineEditTextField.css';

export const classes = generateClassNames('InlineEditTextField', [
  'root',
  'editable',
  'label',
  'preview',
  'input',
]);

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
    <div className={classNames(classes.root, onChange && classes.editable)}>
      <label htmlFor={label} className={classes.label}>
        {label}
      </label>
      {!editing || !onChange ? (
        <div
          key="value"
          tabIndex={0}
          className={classes.preview}
          onClick={handleValueClick}
          onFocus={handleValueClick}
        >
          {internalValue}
        </div>
      ) : (
        <input
          key="input"
          id={label}
          ref={inputRef}
          className={classes.input}
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
