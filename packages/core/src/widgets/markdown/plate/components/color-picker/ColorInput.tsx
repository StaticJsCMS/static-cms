import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { useRef } from 'react';

import type { ChangeEvent, FC } from 'react';

const StyledInput = styled('input')`
  visibility: hidden;
  position: absolute;
`;

export interface ColorInputProps {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput: FC<ColorInputProps> = ({ value = '#000000', onChange }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    // force click action on the input to open color picker
    ref.current?.click();
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  return (
    <div>
      <Button onClick={handleClick} fullWidth>
        CUSTOM
      </Button>
      <StyledInput ref={ref} type="color" onChange={handleOnChange} value={value} />
    </div>
  );
};

export default ColorInput;
