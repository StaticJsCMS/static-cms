import InputUnstyled from '@mui/base/InputUnstyled';
import React from 'react';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ChangeEventHandler, FC, MouseEventHandler, ReactNode, Ref } from 'react';

export interface BaseTextFieldProps {
  id?: string;
  readonly?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  cursor?: 'default' | 'pointer' | 'text';
  variant?: 'borderless' | 'contained';
  inputRef?: Ref<HTMLInputElement>;
  placeholder?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

export interface NumberTextFieldProps extends BaseTextFieldProps {
  value: string | number;
  type: 'number';
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export interface TextTextFieldProps extends BaseTextFieldProps {
  value: string;
  type: 'text';
}

export type TextFieldProps = TextTextFieldProps | NumberTextFieldProps;

const TextField: FC<TextFieldProps> = ({
  value,
  type,
  'data-testid': dataTestId,
  cursor = 'default',
  variant = 'borderless',
  inputRef,
  readonly,
  disabled = false,
  onChange,
  onClick,
  startAdornment,
  endAdornment,
  ...otherProps
}) => {
  const finalCursor = useCursor(cursor, disabled);

  return (
    <InputUnstyled
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      data-testid={dataTestId ?? `${type}-input`}
      readOnly={readonly}
      disabled={disabled}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      slotProps={{
        root: {
          className: `
            flex
            w-full
          `,
        },
        input: {
          ref: inputRef,
          className: classNames(
            `
              w-full
              text-sm
            `,
            variant === 'borderless' &&
              `
              h-6
              px-3
              bg-transparent
              outline-none
              font-medium
              text-gray-900
              disabled:text-gray-300
              dark:text-gray-100
              dark:disabled:text-gray-500
            `,
            variant === 'contained' &&
              `
              bg-gray-50
              border
              border-gray-300
              text-gray-900
              rounded-lg
              focus:ring-blue-500
              focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            `,
            finalCursor === 'pointer' && 'cursor-pointer',
            finalCursor === 'text' && 'cursor-text',
            finalCursor === 'default' && 'cursor-default',
          ),
          ...otherProps,
        },
      }}
    />
  );
};

export default TextField;
