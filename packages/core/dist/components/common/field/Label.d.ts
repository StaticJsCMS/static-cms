import type { FC } from 'react';
import './Label.css';
export declare const classes: Record<"root" | "error" | "disabled" | "inline" | "cursor-pointer" | "cursor-text" | "cursor-default", string>;
export interface LabelProps {
    htmlFor?: string;
    children: string;
    hasErrors?: boolean;
    variant?: 'default' | 'inline';
    cursor?: 'default' | 'pointer' | 'text';
    className?: string;
    disabled: boolean;
    'data-testid'?: string;
}
declare const Label: FC<LabelProps>;
export default Label;
