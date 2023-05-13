import Button from '@mui/material/Button';
import React, { memo } from 'react';

import Colors from './Colors';
import CustomColors from './CustomColors';

import type { ColorType } from '@udecode/plate';
import type { FC } from 'react';

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
    <div>
      <CustomColors
        color={color}
        colors={colors}
        customColors={customColors}
        updateColor={updateColor}
        updateCustomColor={updateCustomColor}
      />
      <div />
      <Colors color={color} colors={colors} updateColor={updateColor} />
      <Button onClick={clearColor} disabled={!color}>
        Clear
      </Button>
    </div>
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
