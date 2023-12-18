import type { BaseField, Collection, Entry, Field, ValueOrNestedValue } from '@staticcms/core/interface';
import type { t } from 'react-polyglot';
export declare function selectField<EF extends BaseField>(collection: Collection<EF>, key: string): Field<EF> | undefined;
export declare function getFieldLabel(field: Field, t: t): string;
export declare function getField(field: Field | Field[], path: string): Field | null;
export declare function getFieldValue(field: Field, entry: Entry, isTranslatable: boolean, locale: string | undefined): ValueOrNestedValue;
export declare function isHidden(field: Field, entry: Entry | undefined, listItemPath: string | undefined): boolean;
export declare function useHidden(field: Field, entry: Entry | undefined, listItemPath: string | undefined): boolean;
