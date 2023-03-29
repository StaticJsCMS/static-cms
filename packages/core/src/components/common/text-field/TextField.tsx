import InputUnstyled from '@mui/base/InputUnstyled';
import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ChangeEventHandler, FC, MouseEventHandler, Ref } from 'react';

export interface BaseTextFieldProps {
  readonly?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  cursor?: 'default' | 'pointer' | 'text';
  inputRef?: Ref<HTMLInputElement>;
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
  cursor,
  inputRef,
  readonly,
  disabled,
  onChange,
  onClick,
  ...otherProps
}) => {
  return (
    <InputUnstyled
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      data-testid={dataTestId ?? `${type}-input`}
      readOnly={readonly}
      disabled={disabled}
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
                h-6
                px-3
                bg-transparent
                outline-none
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-100
              `,
            cursor === 'pointer' && 'cursor-pointer',
            cursor === 'text' && 'cursor-text',
            cursor === 'default' && 'cursor-default',
          ),
          ...otherProps,
        },
      }}
    />
  );
};

export default TextField;
