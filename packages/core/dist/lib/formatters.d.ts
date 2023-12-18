import type { BaseField, Collection, Config, Entry, EntryData, Slug, UnknownField } from '../interface';
declare const commitMessageTemplates: {
    readonly create: "Create {{collection}} “{{slug}}”";
    readonly update: "Update {{collection}} “{{slug}}”";
    readonly delete: "Delete {{collection}} “{{slug}}”";
    readonly uploadMedia: "Upload “{{path}}”";
    readonly deleteMedia: "Delete “{{path}}”";
};
type Options<EF extends BaseField> = {
    slug?: string;
    path?: string;
    collection?: Collection<EF>;
    authorLogin?: string;
    authorName?: string;
};
export declare function commitMessageFormatter<EF extends BaseField>(type: keyof typeof commitMessageTemplates, config: Config<EF>, { slug, path, collection, authorLogin, authorName }: Options<EF>): string;
export declare function prepareSlug(slug: string): string;
export declare function getProcessSegment(slugConfig?: Slug, ignoreValues?: string[]): (value: string) => string;
export declare function slugFormatter<EF extends BaseField = UnknownField>(collection: Collection<EF>, entryData: EntryData, slugConfig?: Slug): string;
export declare function summaryFormatter<EF extends BaseField>(summaryTemplate: string, entry: Entry, collection: Collection<EF>, slugConfig?: Slug): string;
export declare function folderFormatter<EF extends BaseField>(folderTemplate: string, entry: Entry | null | undefined, collection: Collection<EF> | undefined, defaultFolder: string, folderKey: string, slugConfig?: Slug): string;
export {};
