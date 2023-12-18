import type { EntryData, Field, ObjectValue } from '../interface';
export declare function serializeValues(values: EntryData, fields: Field[] | undefined): ObjectValue;
export declare function deserializeValues(values: EntryData, fields: Field[] | undefined): ObjectValue;
