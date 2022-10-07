import React, { useCallback } from 'react';
import Switch from '@mui/material/Switch';

interface ToggleProps {
  id: string;
  active: boolean;
  onChange: (on: boolean) => void;
  onFocus?: React.FocusEventHandler<HTMLButtonElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLButtonElement> | undefined;
}

const Toggle = ({ id, active, onChange, onFocus, onBlur }: ToggleProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    },
    [onChange],
  );

  return (
    <Switch id={id} onFocus={onFocus} onBlur={onBlur} checked={active} onChange={handleChange} />
  );
};

export default Toggle;
