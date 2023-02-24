import TextField from '@mui/material/TextField';
import React, { useCallback, useMemo, useState } from 'react';

import type { StringOrTextField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const TextControl: FC<WidgetControlProps<string, StringOrTextField>> = ({
  label,
  value,
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
      key="text-control-input"
      variant="outlined"
      value={internalValue || ''}
      onChange={handleChange}
      multiline
      minRows={4}
      fullWidth
      label={label}
      error={hasErrors}
    />
  );
};

export default TextControl;
