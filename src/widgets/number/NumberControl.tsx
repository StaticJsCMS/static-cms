import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect, useState } from 'react';

import { validate } from '../../lib/util/validation.util';

import type { ChangeEvent } from 'react';
import type { t } from 'react-polyglot';
import type { FieldError, NumberField, WidgetControlProps } from '../../interface';

const ValidationErrorTypes = {
  PRESENCE: 'PRESENCE',
  PATTERN: 'PATTERN',
  RANGE: 'RANGE',
  CUSTOM: 'CUSTOM',
};

export function validateMinMax(
  value: string | number,
  min: number | false,
  max: number | false,
  field: NumberField,
  t: t,
): FieldError | false {
  let error: FieldError | false;

  switch (true) {
    case value !== '' && min !== false && max !== false && (value < min || value > max):
      error = {
        type: ValidationErrorTypes.RANGE,
        message: t('editor.editorControlPane.widget.range', {
          fieldLabel: field.label ?? field.name,
          minValue: min,
          maxValue: max,
        }),
      };
      break;
    case value !== '' && min !== false && value < min:
      error = {
        type: ValidationErrorTypes.RANGE,
        message: t('editor.editorControlPane.widget.min', {
          fieldLabel: field.label ?? field.name,
          minValue: min,
        }),
      };
      break;
    case value !== '' && max !== false && value > max:
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

const NumberControl = ({
  label,
  path,
  field,
  value,
  onChange,
  onValidate,
  widget,
  t,
}: WidgetControlProps<string | number, NumberField>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    let alive = true;

    const validateValue = async () => {
      const errors = await validate(path, field, internalValue, widget, onValidate, t);
      if (alive) {
        setHasErrors(errors.length > 0);
      }
    };

    validateValue();

    return () => {
      alive = false;
    };
  }, [field, internalValue, onValidate, path, t, widget]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const valueType = field.value_type;
      const value =
        valueType === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value, 10);

      let newValue: string | number;
      if (!isNaN(value)) {
        newValue = value;
      } else {
        newValue = '';
      }
      onChange(path, field, newValue);
      setInternalValue(newValue);
    },
    [field, onChange, path],
  );

  const min = field.min ?? '';
  const max = field.max ?? '';
  const step = field.step ?? (field.value_type === 'int' ? 1 : '');
  return (
    <TextField
      key="number-control-input"
      variant="outlined"
      type="number"
      value={internalValue}
      onChange={handleChange}
      inputProps={{
        step,
        min,
        max,
      }}
      fullWidth
      label={label}
      error={hasErrors}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default NumberControl;
