import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { StringOrTextField, WidgetControlProps } from '../../interface';

const StringControl = ({
  path,
  field,
  value,
  label,
  onChange,
}: WidgetControlProps<string, StringOrTextField>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInternalValue(event.target.value);
      onChange(path, field, event.target.value);
    },
    [field, onChange, path],
  );

  return (
    <TextField
      key="string-control-input"
      label={label}
      variant="outlined"
      value={internalValue}
      onChange={handleChange}
      fullWidth
    />
  );
};

export default StringControl;
