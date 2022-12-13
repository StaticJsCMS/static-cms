import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';

import ColorInput from './ColorInput';
import Colors from './Colors';

import type { ColorType } from '@udecode/plate';
import type { ChangeEvent, FC } from 'react';

const StyledCustomColors = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export type CustomColorsProps = {
  color?: string;
  colors: ColorType[];
  customColors: ColorType[];
  updateColor: (color: string) => void;
  updateCustomColor: (color: string) => void;
};

const CustomColors: FC<CustomColorsProps> = ({
  color,
  colors,
  customColors,
  updateColor,
  updateCustomColor,
}: CustomColorsProps) => {
  const [customColor, setCustomColor] = useState<string>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateCustomColorDebounced = useCallback(debounce(updateCustomColor, 100), [
    updateCustomColor,
  ]);

  const [value, setValue] = useState<string>(color || '#000000');

  useEffect(() => {
    if (
      !color ||
      customColors.some(c => c.value === color) ||
      colors.some(c => c.value === color)
    ) {
      return;
    }

    setCustomColor(color);
  }, [color, colors, customColors]);

  const computedColors = useMemo(
    () =>
      customColor
        ? [
            ...customColors,
            {
              name: '',
              value: customColor,
              isBrightColor: false,
            },
          ]
        : customColors,
    [customColor, customColors],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      updateCustomColorDebounced(event.target.value);
    },
    [updateCustomColorDebounced],
  );

  return (
    <StyledCustomColors>
      <ColorInput value={value} onChange={handleChange} />
      <Colors color={color} colors={computedColors} updateColor={updateColor} />
    </StyledCustomColors>
  );
};

export default CustomColors;
