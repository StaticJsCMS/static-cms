import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { StringOrTextField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const StringControl: FC<WidgetControlProps<string, StringOrTextField>> = ({
  value,
  label,
  onChange,
  hasErrors,
}) => {
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
