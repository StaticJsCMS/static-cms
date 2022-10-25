import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { StringOrTextField, WidgetControlProps } from '../../interface';

const TextControl = ({
  label,
  value,
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
      key="text-control-input"
      variant="outlined"
      value={internalValue || ''}
      onChange={handleChange}
      multiline
      minRows={4}
      fullWidth
      label={label}
      error={hasErrors}
    />
  );
};

export default TextControl;
