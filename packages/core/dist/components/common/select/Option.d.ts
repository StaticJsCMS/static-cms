import type { ReactNode } from 'react';
import './Option.css';
export declare const classes: Record<"label" | "root" | "selected", string>;
export interface OptionProps<T> {
    selectedValue: T | null | T[];
    value: T | null;
    children: ReactNode;
    'data-testid'?: string;
}
declare const Option: <T>({ selectedValue, value, children, "data-testid": dataTestId, }: OptionProps<T>) => JSX.Element;
export default Option;
