import TextField from '@mui/material/TextField';
import React, { useCallback, useMemo, useState } from 'react';

import type { StringOrTextField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const StringControl: FC<WidgetControlProps<string, StringOrTextField>> = ({
  value,
  label,
  isDuplicate,
  onChange,
  hasErrors,
}) => {
  const [internalRawValue, setInternalValue] = useState(value ?? '');
  const internalValue = useMemo(
    () => (isDuplicate ? value ?? '' : internalRawValue),
    [internalRawValue, isDuplicate, value],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInternalValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <TextField
      key="string-widget-control-input"
      inputProps={{
        'data-testid': 'string-widget-control-input',
      }}
      label={label}
      variant="outlined"
      value={internalValue}
      onChange={handleChange}
      fullWidth
      error={hasErrors}
    />
  );
};

export default StringControl;
