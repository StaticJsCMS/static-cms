import type { ReactNode, Ref } from 'react';
import './Autocomplete.css';
export declare const classes: Record<"button" | "input" | "option" | "root" | "disabled" | "options" | "checkmark" | "focused" | "button-icon" | "option-selected" | "option-label" | "input-wrapper" | "button-wrapper" | "nothing" | "checkmark-icon", string>;
export interface Option {
    label: string;
    value: string;
}
export type AutocompleteChangeEventHandler = (value: string | string[]) => void;
export interface AutocompleteProps {
    label: ReactNode | ReactNode[];
    value: string | string[] | null;
    options: string[] | Option[];
    disabled?: boolean;
    required?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    endAdornment?: ReactNode;
    displayValue: (item: string | string[] | null) => string;
    onQuery: (query: string) => void;
    onChange: (value: string | string[] | undefined) => void;
}
declare const Autocomplete: ({ label, value, options, disabled, required, inputRef, endAdornment, onChange, onQuery, }: AutocompleteProps) => JSX.Element;
export default Autocomplete;
