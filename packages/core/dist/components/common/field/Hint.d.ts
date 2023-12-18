import type { FC } from 'react';
import './Hint.css';
export declare const classes: Record<"link" | "root" | "error" | "disabled" | "inline" | "cursor-pointer" | "cursor-text" | "cursor-default", string>;
export interface HintProps {
    children: string;
    hasErrors: boolean;
    variant?: 'default' | 'inline';
    cursor?: 'default' | 'pointer' | 'text';
    className?: string;
    disabled: boolean;
}
declare const Hint: FC<HintProps>;
export default Hint;
