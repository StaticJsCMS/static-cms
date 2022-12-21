import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { memo } from 'react';

import Colors from './Colors';
import CustomColors from './CustomColors';

import type { ColorType } from '@udecode/plate';
import type { FC } from 'react';

const StyledColorPicker = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledDivider = styled('div')(
  ({ theme }) => `
    height: 1px;
    width: 100%;
    background: ${theme.palette.text.secondary};
    opacity: 0.1;
  `,
);

export type ColorPickerProps = {
  color?: string;
  colors: ColorType[];
  customColors: ColorType[];
  updateColor: (color: string) => void;
  updateCustomColor: (color: string) => void;
  clearColor: () => void;
  open?: boolean;
};

const ColorPickerInternal: FC<ColorPickerProps> = ({
  color,
  colors,
  customColors,
  updateColor,
  updateCustomColor,
  clearColor,
}) => {
  return (
    <StyledColorPicker>
      <CustomColors
        color={color}
        colors={colors}
        customColors={customColors}
        updateColor={updateColor}
        updateCustomColor={updateCustomColor}
      />
      <StyledDivider />
      <Colors color={color} colors={colors} updateColor={updateColor} />
      <Button onClick={clearColor} disabled={!color}>
        Clear
      </Button>
    </StyledColorPicker>
  );
};

const ColorPicker = memo(
  ColorPickerInternal,
  (prev, next) =>
    prev.color === next.color &&
    prev.colors === next.colors &&
    prev.customColors === next.customColors &&
    prev.open === next.open,
);

export default ColorPicker;
