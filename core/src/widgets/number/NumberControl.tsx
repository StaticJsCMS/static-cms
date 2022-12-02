import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { FieldError, NumberField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';
import type { t } from 'react-polyglot';

const ValidationErrorTypes = {
  PRESENCE: 'PRESENCE',
  PATTERN: 'PATTERN',
  RANGE: 'RANGE',
  CUSTOM: 'CUSTOM',
};

export function validateNumberMinMax(
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

const NumberControl: FC<WidgetControlProps<string | number, NumberField>> = ({
  label,
  field,
  value,
  onChange,
  hasErrors,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const valueType = field.value_type;
      let newValue: string | number =
        valueType === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value, 10);

      if (isNaN(newValue)) {
        newValue = '';
      }
      onChange(newValue);
      setInternalValue(newValue);
    },
    [field, onChange],
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
