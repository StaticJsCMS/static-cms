import type { ListField, ObjectField, ObjectValue } from '@staticcms/core/interface';
export declare const TYPES_KEY = "types";
export declare const TYPE_KEY = "type_key";
export declare const DEFAULT_TYPE_KEY = "type";
export declare function getTypedFieldForValue(field: ListField, value: ObjectValue | undefined | null, index: number): [string, ObjectField | undefined];
export declare function resolveFunctionForTypedField(field: ListField): (value: ObjectValue) => ObjectField<import("@staticcms/core/interface").UnknownField> | undefined;
export declare function resolveFieldKeyType(field: ListField): string;
export declare function getErrorMessageForTypedFieldAndValue(field: ListField, value: ObjectValue | undefined | null): string;
