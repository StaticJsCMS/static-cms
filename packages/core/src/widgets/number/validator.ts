import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';

import type { FieldError, FieldValidationMethod, NumberField } from '@staticcms/core/interface';
import type { t } from 'react-polyglot';

function validateMinMax(
  value: string | number,
  min: number | false,
  max: number | false,
  field: NumberField,
  t: t,
): FieldError | false {
  let error: FieldError | false;

  const numberValue = typeof value === 'string' ? parseFloat(value) : value;

  switch (true) {
    case !isNaN(numberValue) &&
      min !== false &&
      max !== false &&
      (numberValue < min || numberValue > max):
      error = {
        type: ValidationErrorTypes.RANGE,
        message: t('editor.editorControlPane.widget.range', {
          fieldLabel: field.label ?? field.name,
          minValue: min,
          maxValue: max,
        }),
      };
      break;
    case !isNaN(numberValue) && min !== false && numberValue < min:
      error = {
        type: ValidationErrorTypes.RANGE,
        message: t('editor.editorControlPane.widget.min', {
          fieldLabel: field.label ?? field.name,
          minValue: min,
        }),
      };
      break;
    case !isNaN(numberValue) && max !== false && numberValue > max:
      error = {
        type: ValidationErrorTypes.RANGE,
        message: t('editor.editorControlPane.widget.max', {
          fieldLabel: field.label ?? field.name,
          maxValue: max,
        }),
      };
      break;
    default:
      error = false;
      break;
  }

  return error;
}

const validator: FieldValidationMethod<string | number, NumberField> = ({ field, value, t }) => {
  // Pattern overrides min/max logic always
  const hasPattern = !!field.pattern ?? false;

  if (hasPattern || !value) {
    return false;
  }

  const min = field.min ?? false;
  const max = field.max ?? false;

  return validateMinMax(value, min, max, field, t);
};

export default validator;
