import React from 'react';
import type { ReactNode } from 'react';
import './Select.css';
export declare const classes: Record<"label" | "input" | "root" | "value" | "disabled" | "dropdown" | "dropdown-icon" | "label-text" | "popper", string>;
export interface Option {
    label: string;
    value: number | string;
}
export type SelectChangeEventHandler = (value: number | string | (number | string)[]) => void;
export interface SelectProps {
    label?: ReactNode | ReactNode[];
    placeholder?: string;
    value: number | string | (number | string)[];
    options: (number | string)[] | Option[];
    required?: boolean;
    disabled?: boolean;
    rootClassName?: string;
    onChange: SelectChangeEventHandler;
    onOpenChange?: (open: boolean) => void;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLButtonElement>>;
export default Select;
