import type { Collection, Entry, Field, FieldsErrors, TranslatedProps } from '@staticcms/core/interface';
import './EditorControlPane.css';
export declare const classes: Record<"root" | "no-border" | "locale_dropdown_wrapper", string>;
export interface EditorControlPaneProps {
    collection: Collection;
    entry: Entry;
    fields: Field[];
    fieldsErrors: FieldsErrors;
    submitted: boolean;
    locale?: string;
    canChangeLocale?: boolean;
    hideBorder: boolean;
    slug?: string;
    onLocaleChange?: (locale: string) => void;
    allowDefaultLocale?: boolean;
    context?: 'default' | 'i18nSplit';
    listItemPath?: string;
}
declare const EditorControlPane: ({ collection, entry, fields, fieldsErrors, submitted, locale, canChangeLocale, hideBorder, slug, onLocaleChange, allowDefaultLocale, context, listItemPath, t, }: TranslatedProps<EditorControlPaneProps>) => JSX.Element | null;
export default EditorControlPane;
