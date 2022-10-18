import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { BooleanField, WidgetControlProps } from '../../interface';

const BooleanControl = ({ value, label, onChange }: WidgetControlProps<boolean, BooleanField>) => {
  const [internalValue, setInternalValue] = useState(value ?? false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.checked);
      onChange(event.target.checked);
    },
    [onChange],
  );

  return (
    <FormControlLabel
      key="boolean-field-label"
      control={<Switch key="boolean-input" checked={internalValue} onChange={handleChange} />}
      label={label}
      labelPlacement="start"
      sx={{ marginLeft: '4px' }}
    />
  );
};

export default BooleanControl;
