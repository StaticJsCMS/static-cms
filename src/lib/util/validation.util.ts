/* eslint-disable @typescript-eslint/no-explicit-any */
import ValidationErrorTypes from '../../constants/validationErrorTypes';
import { getTypedFieldForValue } from '../../widgets/list/typedListHelpers';
import { resolveWidget } from '../registry';

import type { t } from 'react-polyglot';
import type {
  Entry,
  Field,
  FieldError,
  FieldValidationMethod,
  FieldValidationMethodProps,
  ValueOrNestedValue,
  Widget,
} from '../../interface';

export function isEmpty(value: ValueOrNestedValue) {
  return (
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value === '')
  );
}

export function validatePresence({
  field,
  value,
  t,
}: FieldValidationMethodProps<ValueOrNestedValue>): false | FieldError {
  const isRequired = field.required ?? true;
  console.log('REQUIRED CHECK', field.name, value, isRequired);
  if (isRequired && isEmpty(value)) {
    const error = {
      type: ValidationErrorTypes.PRESENCE,
      message: t('editor.editorControlPane.widget.required', {
        fieldLabel: field.label ?? field.name,
      }),
    };

    return error;
  }

  return false;
}

export function validatePattern({
  field,
  value,
  t,
}: FieldValidationMethodProps<ValueOrNestedValue>): false | FieldError {
  const pattern = field.pattern ?? false;

  if (isEmpty(value)) {
    return false;
  }

  let valueToCheck: string;
  if (typeof value === 'string') {
    valueToCheck = value;
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    valueToCheck = `${value}`;
  } else {
    valueToCheck = JSON.stringify(value);
  }

  if (pattern && !isEmpty(valueToCheck) && !RegExp(pattern[0]).test(valueToCheck)) {
    const error = {
      type: ValidationErrorTypes.PATTERN,
      message: t('editor.editorControlPane.widget.regexPattern', {
        fieldLabel: field.label ?? field.name,
        pattern: pattern[1],
      }),
    };

    return error;
  }

  return false;
}

// TODO Fix typings
export async function validate(
  path: string,
  field: Field,
  value: ValueOrNestedValue,
  widget: Widget<any, any>,
  onValidate: (path: string, errors: FieldError[]) => void,
  t: t,
): Promise<FieldError[]> {
  const validValue = widget.getValidValue(value);
  const errors: FieldError[] = [];
  const validations: FieldValidationMethod<ValueOrNestedValue>[] = [
    validatePresence,
    validatePattern,
    widget.validator,
  ];

  for (const validation of validations) {
    const response = await validation({ field, value: validValue, t });
    if (response) {
      errors.push(response);
    }
  }

  onValidate(path, errors);
  return errors;
}

async function validateFieldAndChildren(
  path: string,
  field: Field,
  value: ValueOrNestedValue,
  widget: Widget<any, any>,
  onValidate: (path: string, errors: FieldError[]) => void,
  t: t,
) {
  if ('fields' in field && field.fields) {
    for (const childField of field.fields) {
      await validateFieldAndChildren(
        `${path}.${childField.name}`,
        childField,
        !Array.isArray(value) && typeof value === 'object' ? value?.[field.name] : undefined,
        resolveWidget(childField.widget),
        onValidate,
        t,
      );
    }
  }

  if ('field' in field && field.field) {
    await validateFieldAndChildren(
      `${path}.${field.field.name}`,
      field.field,
      !Array.isArray(value) && typeof value === 'object' ? value?.[field.name] : undefined,
      resolveWidget(field.field.widget),
      onValidate,
      t,
    );
  }

  if ('types' in field && field.types && Array.isArray(value)) {
    for (const childValue of value) {
      const itemType = getTypedFieldForValue(field, childValue);
      if (itemType) {
        await validateFieldAndChildren(
          `${path}.${itemType.name}`,
          itemType,
          !Array.isArray(value) && typeof value === 'object' ? value?.[field.name] : undefined,
          resolveWidget(itemType.widget),
          onValidate,
          t,
        );
      }
    }
  }

  await validate(path, field, value, widget, onValidate, t);
}

export async function validateAll(
  fields: Field[],
  entry: Entry,
  onValidate: (path: string, errors: FieldError[]) => void,
  t: t,
) {
  for (const field of fields) {
    await validateFieldAndChildren(
      field.name,
      field,
      entry.data?.[field.name] ?? undefined,
      resolveWidget(field.widget),
      onValidate,
      t,
    );
  }
}
