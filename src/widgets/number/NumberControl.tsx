import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { t } from 'react-polyglot';
import type { FieldNumber, WidgetControlProps } from '../../interface';
import type { ChangeEvent } from 'react';

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
  field: FieldNumber,
  t: t,
) {
  let error;

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
      error = null;
      break;
  }

  return error;
}

const NumberControl = ({
  path,
  field,
  value,
  onChange,
}: WidgetControlProps<string | number, FieldNumber>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const valueType = field.value_type;
      const value =
        valueType === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value, 10);

      if (!isNaN(value)) {
        onChange(path, field, value);
        setInternalValue(value);
      } else {
        onChange(path, field, '');
        setInternalValue('');
      }
    },
    [field, onChange, path],
  );

  const min = field.min ?? '';
  const max = field.max ?? '';
  const step = field.step ?? (field.value_type === 'int' ? 1 : '');
  return (
    <TextField
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
      sx={{
        '.MuiInputBase-root': {
          borderTopLeftRadius: 0,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#f7f9fc',
          },
          '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f7f9fc',
          },
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default NumberControl;
