import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';

import type { CmsFieldStringOrText, CmsWidgetControlProps } from '../../interface';
import type { ChangeEvent } from 'react';

const TextControl = ({
  value,
  onChange,
  onBlur,
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
      variant="outlined"
      value={internalValue || ''}
      onChange={handleChange}
      onBlur={onBlur}
      multiline
      minRows={4}
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
    />
  );
};

export default TextControl;
