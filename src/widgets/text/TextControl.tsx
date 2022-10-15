import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { FieldStringOrText, WidgetControlProps } from '../../interface';
import type { ChangeEvent } from 'react';

const TextControl = ({
  path,
  field,
  value,
  onChange,
}: WidgetControlProps<string, FieldStringOrText>) => {
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
      key="text-control-input"
      variant="outlined"
      value={internalValue || ''}
      onChange={handleChange}
      multiline
      minRows={4}
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
    />
  );
};

export default TextControl;
