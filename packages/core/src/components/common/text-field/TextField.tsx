import InputUnstyled from '@mui/base/InputUnstyled';
import React, { forwardRef } from 'react';

import type { ChangeEventHandler, MouseEventHandler } from 'react';

export interface BaseTextFieldProps {
  readonly?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
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

const TextField = forwardRef<HTMLInputElement | null, TextFieldProps>(
  ({ value, type, 'data-testid': dataTestId, onChange, ...otherProps }, ref) => {
    return (
      <InputUnstyled
        type={type}
        value={value}
        onChange={onChange}
        data-testid={dataTestId ?? `${type}-input`}
        {...otherProps}
        slotProps={{
          root: {
            className: `
              flex
              w-full
            `,
          },
          input: {
            ref,
            className: `
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
          },
        }}
      />
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
