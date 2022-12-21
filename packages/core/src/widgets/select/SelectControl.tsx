import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import React, { useCallback, useMemo, useState } from 'react';

import { isNullish } from '@staticcms/core/lib/util/null.util';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { SelectField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

interface Option {
  label: string;
  value: string | number;
}

function convertToOption(raw: string | number | Option | undefined): Option | undefined {
  if (typeof raw === 'string' || typeof raw === 'number') {
    return { label: `${raw}`, value: raw };
  }

  return raw;
}

const SelectControl: FC<WidgetControlProps<string | number | (string | number)[], SelectField>> = ({
  label,
  field,
  value,
  hasErrors,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const fieldOptions: (string | number | Option)[] = useMemo(() => field.options, [field.options]);
  const isMultiple = useMemo(() => field.multiple ?? false, [field.multiple]);

  const options = useMemo(
    () => fieldOptions.map(convertToOption).filter(Boolean) as Option[],
    [fieldOptions],
  );

  const optionsByValue = useMemo(
    () =>
      options.reduce((acc, option) => {
        acc[`${option.value}`] = option;
        return acc;
      }, {} as Record<string, Option>),
    [options],
  );

  const stringValueOptions = useMemo(
    () =>
      options.map(option => ({
        label: option.label,
        value: `${option.value}`,
      })),
    [options],
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const selectedValue = event.target.value;
      const isMultiple = field.multiple ?? false;
      const isEmpty =
        isMultiple && Array.isArray(selectedValue)
          ? !selectedValue?.length
          : isNullish(selectedValue);

      if (field.required && isEmpty && isMultiple) {
        setInternalValue([]);
        onChange([]);
      } else if (isEmpty) {
        setInternalValue('');
        onChange('');
      } else if (typeof selectedValue === 'string') {
        const selectedOption = optionsByValue[selectedValue];
        const optionValue = selectedOption?.value ?? '';
        setInternalValue(optionValue);
        onChange(optionValue);
      } else if (isMultiple) {
        const optionValues = selectedValue.map(v => {
          const selectedOption = optionsByValue[v];
          return selectedOption?.value ?? '';
        });
        setInternalValue(optionValues);
        onChange(optionValues);
      }
    },
    [field.multiple, field.required, onChange, optionsByValue],
  );

  const stringValue = useMemo(() => {
    if (!internalValue) {
      return isMultiple ? [] : '';
    }

    if (Array.isArray(internalValue)) {
      return internalValue.map(v => `${v}`);
    }

    return `${internalValue}`;
  }, [isMultiple, internalValue]);

  return (
    <FormControl fullWidth error={hasErrors}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={stringValue}
        onChange={handleChange}
        multiple={isMultiple}
        label={label}
        input={isMultiple ? <OutlinedInput id="select-multiple-chip" label={label} /> : undefined}
        renderValue={selectValues => {
          if (Array.isArray(selectValues)) {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectValues.map(selectValue => {
                  const label = optionsByValue[selectValue]?.label ?? selectValue;
                  return <Chip key={selectValue} label={label} />;
                })}
              </Box>
            );
          }

          return optionsByValue[selectValues]?.label ?? selectValues;
        }}
      >
        <MenuItem key={`empty-option`} value="">
          &nbsp;
        </MenuItem>
        {stringValueOptions.map(option => (
          <MenuItem key={`option-${option.value}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectControl;
