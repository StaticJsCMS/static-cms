import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { CmsFieldBoolean, CmsWidgetControlProps } from '../../interface';

const BooleanControl = ({
  value,
  label,
  onChange,
  onBlur,
}: CmsWidgetControlProps<boolean, CmsFieldBoolean>) => {
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
      control={
        <Switch defaultChecked checked={internalValue} onChange={handleChange} onBlur={onBlur} />
      }
      label={label}
    />
  );
};

export default BooleanControl;
