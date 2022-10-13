import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { CmsFieldStringOrText, CmsWidgetControlProps } from '../../interface';

const StringControl = ({
  forID,
  value = '',
  label,
  onChange
}: CmsWidgetControlProps<string, CmsFieldStringOrText>) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInternalValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <TextField
      id={forID}
      label={label}
      variant="outlined"
      value={internalValue}
      onChange={handleChange}
      fullWidth
    />
  );
};

export default StringControl;
