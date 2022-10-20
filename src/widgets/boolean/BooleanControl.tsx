import { colors } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useCallback, useEffect, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { BooleanField, WidgetControlProps } from '../../interface';

const BooleanControl = ({
  value,
  label,
  onChange,
  hasErrors,
}: WidgetControlProps<boolean, BooleanField>) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.checked);
      onChange(event.target.checked);
    },
    [onChange],
  );

  useEffect(() => {
    if (typeof internalValue !== 'boolean') {
      setInternalValue(false);
      setTimeout(() => {
        onChange(false);
      });
    }
  }, [internalValue, onChange]);

  return (
    <FormControlLabel
      key="boolean-field-label"
      control={
        <Switch key="boolean-input" checked={internalValue ?? false} onChange={handleChange} />
      }
      label={label}
      labelPlacement="start"
      sx={{ marginLeft: '4px', color: hasErrors ? colors.red[500] : undefined }}
    />
  );
};

export default BooleanControl;
