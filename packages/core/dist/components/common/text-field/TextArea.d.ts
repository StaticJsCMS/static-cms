import React from 'react';
import type { ChangeEventHandler } from 'react';
import './TextArea.css';
export declare const classes: Record<"input" | "root", string>;
export interface TextAreaProps {
    value: string;
    disabled?: boolean;
    placeholder?: string;
    rootClassName?: string;
    inputClassName?: string;
    'data-testid'?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLInputElement | null>>;
export default TextArea;
