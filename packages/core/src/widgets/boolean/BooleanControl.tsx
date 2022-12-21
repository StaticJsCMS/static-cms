import { red } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useCallback, useState } from 'react';

import type { BooleanField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const BooleanControl: FC<WidgetControlProps<boolean, BooleanField>> = ({
  value,
  label,
  onChange,
  hasErrors,
}) => {
  const [internalValue, setInternalValue] = useState(value);

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
      control={
        <Switch key="boolean-input" checked={internalValue ?? false} onChange={handleChange} />
      }
      label={label}
      labelPlacement="start"
      sx={{ marginLeft: '4px', color: hasErrors ? red[500] : undefined }}
    />
  );
};

export default BooleanControl;
