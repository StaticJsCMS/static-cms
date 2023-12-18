import type { BaseField, Collection, Entry, Field, ObjectValue } from '@staticcms/core/interface';
export declare function applyDefaultsToDraftData(fields: Field[], skipField?: (field: Field) => boolean, initialValue?: ObjectValue | null): ObjectValue;
export declare function createEmptyDraftData(fields: Field[], skipField?: (field: Field) => boolean): ObjectValue;
export declare function createEmptyDraftI18nData(collection: Collection, dataFields: Field[]): {
    [k: string]: {
        data: any;
    };
};
export declare function createEntryMediaPath<EF extends BaseField>(entry: Entry | null | undefined, collection: Collection<EF> | null | undefined, folder: string): string;
