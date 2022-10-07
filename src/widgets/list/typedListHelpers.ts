import type { CmsFieldList, ListValue } from '../../interface';

export const TYPES_KEY = 'types';
export const TYPE_KEY = 'typeKey';
export const DEFAULT_TYPE_KEY = 'type';

export function getTypedFieldForValue(field: CmsFieldList, value: Record<string, ListValue>) {
  const typeKey = resolveFieldKeyType(field);
  const types = field[TYPES_KEY] ?? [];
  const valueType = value[typeKey];
  return types.find(type => type.name === valueType);
}

export function resolveFunctionForTypedField(field: CmsFieldList) {
  const typeKey = resolveFieldKeyType(field);
  const types = field[TYPES_KEY] ?? [];
  return (value: Record<string, ListValue>) => {
    const valueType = value[typeKey];
    return types.find(type => type.name === valueType);
  };
}

export function resolveFieldKeyType(field: CmsFieldList) {
  return (TYPE_KEY in field && field[TYPE_KEY]) || DEFAULT_TYPE_KEY;
}

export function getErrorMessageForTypedFieldAndValue(
  field: CmsFieldList,
  value: Record<string, ListValue>,
) {
  const keyType = resolveFieldKeyType(field);
  const type = value[keyType];
  let errorMessage;
  if (!type) {
    errorMessage = `Error: item has no '${keyType}' property`;
  } else {
    errorMessage = `Error: item has illegal '${keyType}' property: '${type}'`;
  }
  return errorMessage;
}
