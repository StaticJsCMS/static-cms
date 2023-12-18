import type { ChangeEventHandler, FC, MouseEventHandler, ReactNode, Ref } from 'react';
import './TextField.css';
export declare const classes: Record<"input" | "root" | "contained" | "borderless" | "cursor-pointer" | "cursor-text" | "cursor-default", string>;
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
    rootClassName?: string;
    inputClassName?: string;
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
declare const TextField: FC<TextFieldProps>;
export default TextField;
