import './LocaleDropdown.css';
export declare const classes: Record<"root" | "dropdown" | "errors-icon" | "no-edit", string>;
interface LocaleDropdownProps {
    locale: string;
    locales: string[];
    defaultLocale: string;
    dropdownText: string;
    canChangeLocale: boolean;
    onLocaleChange?: (locale: string) => void;
    excludeLocales?: string[];
}
declare const LocaleDropdown: ({ locale, locales, defaultLocale, dropdownText, canChangeLocale, onLocaleChange, excludeLocales, }: LocaleDropdownProps) => JSX.Element;
export default LocaleDropdown;
