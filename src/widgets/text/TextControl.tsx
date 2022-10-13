import TextField from '@mui/material/TextField';
import React from 'react';

import type { CmsFieldStringOrText, CmsWidgetControlProps } from '../../interface';

const TextControl = ({
  forID,
  value = '',
  onChange,
  onBlur
}: CmsWidgetControlProps<string, CmsFieldStringOrText>) => {
  return (
    <TextField
      id={forID}
      variant="outlined"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
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
