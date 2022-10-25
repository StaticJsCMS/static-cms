import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { StringOrTextField, WidgetControlProps } from '../../interface';

const StringControl = ({
  value,
  label,
  onChange,
  hasErrors,
}: WidgetControlProps<string, StringOrTextField>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInternalValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <TextField
      key="string-control-input"
      label={label}
      variant="outlined"
      value={internalValue}
      onChange={handleChange}
      fullWidth
      error={hasErrors}
    />
  );
};

export default StringControl;
