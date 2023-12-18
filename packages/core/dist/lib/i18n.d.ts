import type { BaseField, Collection, Entry, Field, I18nInfo, I18nStructure, ObjectValue, i18nCollection } from '../interface';
import type { EntryDraftState } from '../reducers/entryDraft';
export declare const I18N = "i18n";
export declare const I18N_STRUCTURE_MULTIPLE_FOLDERS = "multiple_folders";
export declare const I18N_STRUCTURE_MULTIPLE_FILES = "multiple_files";
export declare const I18N_STRUCTURE_SINGLE_FILE = "single_file";
export declare const I18N_FIELD_TRANSLATE = "translate";
export declare const I18N_FIELD_DUPLICATE = "duplicate";
export declare const I18N_FIELD_NONE = "none";
export declare function hasI18n<EF extends BaseField>(collection: Collection<EF> | i18nCollection<EF>): collection is i18nCollection<EF>;
export declare function getI18nInfo<EF extends BaseField>(collection: i18nCollection<EF>): I18nInfo;
export declare function getI18nInfo<EF extends BaseField>(collection: Collection<EF>): I18nInfo | null;
export declare function getI18nFilesDepth<EF extends BaseField>(collection: Collection<EF>, depth: number): number;
export declare function isFieldTranslatable(field: Field, locale?: string, defaultLocale?: string): boolean;
export declare function isFieldDuplicate(field: Field, locale?: string, defaultLocale?: string): boolean;
export declare function isFieldHidden(field: Field, locale?: string, defaultLocale?: string): boolean;
export declare function getLocaleDataPath(locale: string): string[];
export declare function getDataPath(locale: string, defaultLocale: string): string[];
export declare function getFilePath(structure: I18nStructure, extension: string, path: string, slug: string, locale: string): string;
export declare function getLocaleFromPath(structure: I18nStructure, extension: string, path: string): string | undefined;
export declare function getFilePaths<EF extends BaseField>(collection: Collection<EF>, extension: string, path: string, slug: string): string[];
export declare function normalizeFilePath(structure: I18nStructure, path: string, locale: string): string;
export declare function getI18nFiles<EF extends BaseField>(collection: Collection<EF>, extension: string, entryDraft: Entry, entryToRaw: (entryDraft: Entry) => string, path: string, slug: string, newPath?: string): {
    newPath?: string | undefined;
    path: string;
    slug: string;
    raw: string;
}[];
export declare function getI18nBackup(collection: Collection, entry: Entry, entryToRaw: (entry: Entry) => string): Record<string, {
    raw: string;
}>;
export declare function formatI18nBackup(i18nBackup: Record<string, {
    raw: string;
}>, formatRawData: (raw: string) => Entry): {};
export declare function getI18nEntry<EF extends BaseField>(collection: Collection<EF>, extension: string, path: string, slug: string, getEntryValue: (path: string) => Promise<Entry>): Promise<Entry<ObjectValue>>;
export declare function groupEntries<EF extends BaseField>(collection: Collection<EF>, extension: string, entries: Entry[]): Entry[];
export declare function getI18nDataFiles(collection: Collection, extension: string, path: string, slug: string, diffFiles: {
    path: string;
    id: string;
    newFile: boolean;
}[]): {
    path: string;
    id: string;
    newFile: boolean;
}[];
export declare function duplicateDefaultI18nFields(collection: Collection, dataFields: any): {
    [k: string]: {
        data: any;
    };
};
export declare function duplicateI18nFields(entryDraft: EntryDraftState, field: Field, locales: string[], defaultLocale: string, fieldPath: string): EntryDraftState;
export declare function getPreviewEntry(collection: Collection, entry: Entry, locale: string | undefined, defaultLocale: string | undefined): Entry<ObjectValue>;
export declare function serializeI18n(collection: Collection, entry: Entry, serializeValues: (data: any) => any): Entry<ObjectValue>;
