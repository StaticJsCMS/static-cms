/* eslint-disable @typescript-eslint/no-explicit-any */
import ValidationErrorTypes from '../../constants/validationErrorTypes';

import type {
  Field,
  FieldError,
  FieldValidationMethod,
  FieldValidationMethodProps,
  ValueOrNestedValue,
  Widget,
} from '../../interface';
import type { t } from 'react-polyglot';

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
  console.log('REQUIRED CHECK!', field.name, isRequired, isEmpty(value), `"${value}"`);
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

  if (pattern && typeof value === 'string' && !RegExp(pattern[0]).test(value)) {
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
) {
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

  console.log('errors', errors);
  onValidate(path, errors);
  return errors;
}
