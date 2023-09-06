import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { validateMinMax } from '@staticcms/core/lib/widgets/validations';

import type { FieldError, FieldValidationMethod, KeyValueField } from '@staticcms/core/interface';
import type { Pair } from './types';

const validator: FieldValidationMethod<Pair[], KeyValueField> = ({ field, value, t }) => {
  const min = field.min;
  const max = field.max;

  const keyLabel = field.key_label ?? t('editor.editorWidgets.keyvalue.key');
  const valueLabel = field.value_label ?? t('editor.editorWidgets.keyvalue.value');

  let error: false | FieldError = false;

  const finalValue = value ?? [];

  if (finalValue.length === 0 && field.required) {
    error = {
      type: ValidationErrorTypes.PRESENCE,
      message: t(`editor.editorControlPane.widget.required`, {
        fieldLabel: field.label ?? field.name,
      }),
    };
  }

  const foundKeys: string[] = [];

  if (!error) {
    for (const pair of finalValue) {
      if (isEmpty(pair.key)) {
        error = {
          type: ValidationErrorTypes.PRESENCE,
          message: t(`editor.editorControlPane.widget.required`, {
            fieldLabel: keyLabel,
          }),
        };
        break;
      } else {
        if (foundKeys.includes(pair.key)) {
          error = {
            type: ValidationErrorTypes.CUSTOM,
            message: t(`editor.editorWidgets.keyvalue.uniqueKeys`, {
              keyLabel,
            }),
          };
          break;
        } else {
          foundKeys.push(pair.key);
        }
      }

      if (isEmpty(pair.value)) {
        error = {
          type: ValidationErrorTypes.PRESENCE,
          message: t(`editor.editorControlPane.widget.required`, {
            fieldLabel: valueLabel,
          }),
        };
        break;
      }
    }
  }

  if (!error) {
    error = validateMinMax(t, field.label ?? field.name, finalValue, min, max);
  }

  return error;
};

export default validator;
