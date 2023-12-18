import React from 'react';
import type { FieldError } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';
import './Field.css';
export declare const classes: Record<"root" | "error" | "disabled" | "no-padding" | "inline" | "cursor-pointer" | "cursor-text" | "cursor-default" | "wrapper" | "inline-wrapper" | "no-highlight" | "valid" | "for-single-list" | "end-adornment", string>;
export interface FieldProps {
    label?: string;
    inputRef?: React.MutableRefObject<HTMLElement | null>;
    children: ReactNode | ReactNode[];
    errors: FieldError[];
    variant?: 'default' | 'inline';
    cursor?: 'default' | 'pointer' | 'text';
    hint?: string;
    forSingleList?: boolean;
    noPadding?: boolean;
    noHightlight?: boolean;
    disabled: boolean;
    disableClick?: boolean;
    endAdornment?: ReactNode;
    rootClassName?: string;
    wrapperClassName?: string;
}
declare const Field: FC<FieldProps>;
export default Field;
