import { Input } from '@mui/base/Input';
import React from 'react';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ChangeEventHandler, FC, MouseEventHandler, ReactNode, Ref } from 'react';

import './TextInput.css';

export const classes = generateClassNames('TextInput', [
  'root',
  'input',
  'borderless',
  'contained',
  'cursor-pointer',
  'cursor-text',
  'cursor-default',
]);

export interface BaseTextInputProps {
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
  rootClassName?: string;
  inputClassName?: string;
}

export interface NumberTextInputProps extends BaseTextInputProps {
  value: string | number;
  type: 'number';
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export interface TextTextInputProps extends BaseTextInputProps {
  value: string;
  type: 'text';
}

export type TextInputProps = TextTextInputProps | NumberTextInputProps;

const TextInput: FC<TextInputProps> = ({
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
  rootClassName,
  inputClassName,
  ...otherProps
}) => {
  const finalCursor = useCursor(cursor, disabled);

  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      data-testid={dataTestId ?? `${type}-input`}
      data-no-dnd="true"
      readOnly={readonly}
      disabled={disabled}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      slotProps={{
        root: {
          className: classNames(classes.root, rootClassName),
        },
        input: {
          ref: inputRef,
          className: classNames(
            classes.input,
            inputClassName,
            variant === 'borderless' && classes.borderless,
            variant === 'contained' && classes.contained,
            finalCursor === 'pointer' && classes['cursor-pointer'],
            finalCursor === 'text' && classes['cursor-text'],
            finalCursor === 'default' && classes['cursor-default'],
          ),
          ...otherProps,
        },
      }}
    />
  );
};

export default TextInput;
