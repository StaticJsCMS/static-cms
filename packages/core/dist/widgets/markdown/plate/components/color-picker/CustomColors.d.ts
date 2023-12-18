import type { FC } from 'react';
import type { ColorType } from './types';
export type CustomColorsProps = {
    color?: string;
    colors: ColorType[];
    customColors: ColorType[];
    updateColor: (color: string) => void;
    updateCustomColor: (color: string) => void;
};
declare const CustomColors: FC<CustomColorsProps>;
export default CustomColors;
