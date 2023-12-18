import React from 'react';
import type { ColorType } from './types';
export type ColorPickerProps = {
    color?: string;
    colors: ColorType[];
    customColors: ColorType[];
    updateColor: (color: string) => void;
    updateCustomColor: (color: string) => void;
    clearColor: () => void;
    open?: boolean;
};
declare const ColorPicker: React.NamedExoticComponent<ColorPickerProps>;
export default ColorPicker;
