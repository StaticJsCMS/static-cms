import validateColor from 'validate-color';

import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';

import type { ColorField, FieldValidationMethod } from '@staticcms/core/interface';

const validator: FieldValidationMethod<string, ColorField> = ({ value, t }) => {
  if (typeof value !== 'string') {
    return false;
  }

  if (validateColor(value)) {
    return false;
  }

  if (/^[a-fA-F0-9]{3}$|^[a-fA-F0-9]{4}$|^[a-fA-F0-9]{6}$/g.test(value)) {
    return {
      type: ValidationErrorTypes.CUSTOM,
      message: t(`editor.editorControlPane.widget.invalidHexCode`),
    };
  }

  return {
    type: ValidationErrorTypes.CUSTOM,
    message: t(`editor.editorControlPane.widget.invalidColor`, {
      color: value,
    }),
  };
};

export default validator;
