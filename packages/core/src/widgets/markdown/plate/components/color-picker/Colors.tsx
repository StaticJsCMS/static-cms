import React from 'react';

import ColorButton from './ColorButton';

import type { FC } from 'react';
import type { ColorType } from './types';

export type ColorsProps = {
  color?: string;
  colors: ColorType[];
  updateColor: (color: string) => void;
};

const Colors: FC<ColorsProps> = ({ color, colors, updateColor }) => {
  return (
    <div>
      {colors.map(({ name, value, isBrightColor }) => (
        <ColorButton
          key={name ?? value}
          name={name}
          value={value}
          isBrightColor={isBrightColor}
          isSelected={color === value}
          updateColor={updateColor}
        />
      ))}
    </div>
  );
};

export default Colors;
