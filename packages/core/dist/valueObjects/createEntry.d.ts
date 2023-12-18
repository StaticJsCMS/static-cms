import type { MediaFile } from '../backend';
import type { Entry } from '../interface';
interface Options {
    partial?: boolean;
    raw?: string;
    data?: any;
    label?: string | null;
    isModification?: boolean | null;
    mediaFiles?: MediaFile[] | null;
    author?: string;
    updatedOn?: string;
    status?: string;
    i18n?: {
        [locale: string]: any;
    };
}
export default function createEntry(collection: string, slug?: string, path?: string, options?: Options): Entry<import("../interface").ObjectValue>;
export {};
