import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { CmsFieldStringOrText, CmsWidgetControlProps } from '../../interface';

const StringControl = ({
  value,
  label,
  onChange,
  onBlur
}: CmsWidgetControlProps<string, CmsFieldStringOrText>) => {
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
      label={label}
      variant="outlined"
      value={internalValue}
      onChange={handleChange}
      onBlur={onBlur}
      fullWidth
    />
  );
};

export default StringControl;
