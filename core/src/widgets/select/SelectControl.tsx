import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import React, { useCallback, useMemo, useState } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { SelectField, WidgetControlProps } from '../../interface';

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
  label,
  field,
  value,
  hasErrors,
  onChange,
}: WidgetControlProps<string | string[], SelectField>) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const selectedOption = event.target.value;
      const isMultiple = field.multiple ?? false;
      const isEmpty =
        isMultiple && Array.isArray(selectedOption) ? !selectedOption?.length : !selectedOption;

      if (field.required && isEmpty && isMultiple) {
        setInternalValue([]);
        onChange([]);
      } else if (isEmpty) {
        setInternalValue('');
        onChange('');
      } else if (typeof selectedOption === 'string' || isMultiple) {
        setInternalValue(selectedOption);
        onChange(selectedOption);
      }
    },
    [field, onChange],
  );

  const fieldOptions: (string | Option)[] = field.options;
  const isMultiple = field.multiple ?? false;

  const options = useMemo(
    () => [...(fieldOptions.map(convertToOption) as Option[])].filter(Boolean),
    [fieldOptions],
  );

  const optionsByValue = options.reduce((acc, option) => {
    acc[option.value] = option;
    return acc;
  }, {} as Record<string, Option>);

  return (
    <FormControl fullWidth error={hasErrors}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={(internalValue ? internalValue : isMultiple ? [] : '') as string | string[]}
        onChange={handleChange}
        multiple={isMultiple}
        label={label}
        input={isMultiple ? <OutlinedInput id="select-multiple-chip" label={label} /> : undefined}
        renderValue={selectValues =>
          Array.isArray(selectValues) ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectValues.map(selectValue => {
                const label = optionsByValue[selectValue]?.label ?? selectValue;
                return <Chip key={selectValue} label={label} />;
              })}
            </Box>
          ) : (
            selectValues
          )
        }
      >
        <MenuItem key={`empty-option`} value="">
          &nbsp;
        </MenuItem>
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
