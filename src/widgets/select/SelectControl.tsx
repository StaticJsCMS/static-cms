import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useCallback, useEffect } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { CmsFieldSelect, CmsWidgetControlProps } from '../../interface';

interface Option {
  label: string;
  value: string;
}

function convertToOption(raw: string | Option | undefined): Option | undefined {
  if (typeof raw === 'string') {
    return { label: raw, value: raw };
  }

  return raw;
}

const SelectControl = ({
  field,
  value,
  onChange,
  onBlur,
}: CmsWidgetControlProps<string | string[], CmsFieldSelect>) => {
  const handleChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const selectedOption = event.target.value;
      const isMultiple = field.multiple ?? false;
      const isEmpty =
        isMultiple && Array.isArray(selectedOption) ? !selectedOption?.length : !selectedOption;

      if (field.required && isEmpty && isMultiple) {
        onChange([]);
      } else if (isEmpty) {
        onChange(null);
      } else if (typeof selectedOption === 'string') {
        onChange(selectedOption);
      } else if (isMultiple) {
        onChange(selectedOption);
      }
    },
    [field, onChange],
  );

  useEffect(() => {
    if (field.required && field.multiple) {
      if (value && !Array.isArray(value)) {
        onChange([value]);
      } else if (!value) {
        onChange([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.multiple, field.required, onChange]);

  const fieldOptions: (string | Option)[] = field.options;
  const isMultiple = field.multiple ?? false;

  const options = [...(fieldOptions.map(convertToOption) as Option[])].filter(Boolean);

  return (
    <FormControl
      fullWidth
      sx={{
        '.MuiInputBase-root': {
          borderTopLeftRadius: 0,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#dfdfe3',
          },
          '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dfdfe3',
          },
        },
      }}
    >
      <Select
        value={(value ?? isMultiple ? [] : '') as string | string[]}
        onChange={handleChange}
        multiple={isMultiple}
        onBlur={onBlur}
      >
        {options.map(option => (
          <MenuItem key={`option-${option.value}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectControl;
