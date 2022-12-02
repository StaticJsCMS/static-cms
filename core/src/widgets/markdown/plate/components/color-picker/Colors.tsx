import { styled } from '@mui/material/styles';
import React from 'react';

import ColorButton from './ColorButton';

import type { ColorType } from '@udecode/plate';
import type { FC } from 'react';

const StyledColors = styled('div')`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.25rem;
`;

export type ColorsProps = {
  color?: string;
  colors: ColorType[];
  updateColor: (color: string) => void;
};

const Colors: FC<ColorsProps> = ({ color, colors, updateColor }) => {
  return (
    <StyledColors>
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
    </StyledColors>
  );
};

export default Colors;
