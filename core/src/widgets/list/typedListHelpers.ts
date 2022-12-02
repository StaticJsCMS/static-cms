import type { ListField, ObjectField, ObjectValue } from '@staticcms/core/interface';

export const TYPES_KEY = 'types';
export const TYPE_KEY = 'type_key';
export const DEFAULT_TYPE_KEY = 'type';

export function getTypedFieldForValue(
  field: ListField,
  value: ObjectValue | undefined | null,
  index: number,
): ObjectField | undefined {
  const typeKey = resolveFieldKeyType(field);
  const types = field[TYPES_KEY] ?? [];
  const valueType = value?.[typeKey] ?? {};
  const typeField = types.find(type => type.name === valueType);
  if (!typeField) {
    return typeField;
  }

  return {
    ...typeField,
    name: `${index}`,
  };
}

export function resolveFunctionForTypedField(field: ListField) {
  const typeKey = resolveFieldKeyType(field);
  const types = field[TYPES_KEY] ?? [];
  return (value: ObjectValue) => {
    const valueType = value[typeKey];
    return types.find(type => type.name === valueType);
  };
}

export function resolveFieldKeyType(field: ListField) {
  return (TYPE_KEY in field && field[TYPE_KEY]) || DEFAULT_TYPE_KEY;
}

export function getErrorMessageForTypedFieldAndValue(
  field: ListField,
  value: ObjectValue | undefined | null,
) {
  const keyType = resolveFieldKeyType(field);
  const type = value?.[keyType] ?? {};
  let errorMessage;
  if (!type) {
    errorMessage = `Error: item has no '${keyType}' property`;
  } else {
    errorMessage = `Error: item has illegal '${keyType}' property: '${type}'`;
  }
  return errorMessage;
}
