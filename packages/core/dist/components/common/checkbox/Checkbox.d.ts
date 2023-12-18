import type { ChangeEventHandler, FC } from 'react';
import './Checkbox.css';
export declare const classes: Record<"input" | "root" | "disabled" | "checkmark" | "custom-input", string>;
export interface CheckboxProps {
    checked: boolean;
    disabled?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
declare const Checkbox: FC<CheckboxProps>;
export default Checkbox;
