import type { Collection, EditorPersistOptions, Entry, Field, FieldsErrors, TranslatedProps } from '@staticcms/core/interface';
import './EditorInterface.css';
export declare const classes: Record<"content" | "root" | "i18n" | "default" | "compact" | "toolbar" | "content-wrapper" | "i18n-active" | "mobile-i18n" | "split-view" | "mobile-preview" | "wrapper-preview" | "wrapper-i18n-side-by-side", string>;
interface EditorInterfaceProps {
    draftKey: string;
    entry: Entry;
    collection: Collection;
    fields: Field[] | undefined;
    fieldsErrors: FieldsErrors;
    onPersist: (opts?: EditorPersistOptions) => void;
    onDelete: () => Promise<void>;
    onDuplicate: () => void;
    hasChanged: boolean;
    displayUrl: string | undefined;
    isNewEntry: boolean;
    isModification: boolean;
    toggleScroll: () => Promise<void>;
    scrollSyncActive: boolean;
    loadScroll: () => void;
    submitted: boolean;
    slug: string | undefined;
    onDiscardDraft: () => void;
}
declare const EditorInterface: ({ collection, entry, fields, fieldsErrors, onDelete, onDuplicate, onPersist, hasChanged, displayUrl, isNewEntry, isModification, draftKey, scrollSyncActive, t, loadScroll, toggleScroll, submitted, slug, onDiscardDraft, }: TranslatedProps<EditorInterfaceProps>) => JSX.Element;
export default EditorInterface;
