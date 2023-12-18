import React from 'react';
import type { ChangeEventHandler } from 'react';
import './Switch.css';
export declare const classes: Record<"label" | "input" | "root" | "disabled" | "toggle", string>;
export interface SwitchProps {
    label?: string;
    value: boolean;
    disabled?: boolean;
    rootClassName?: string;
    inputClassName?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement | null>>;
export default Switch;
