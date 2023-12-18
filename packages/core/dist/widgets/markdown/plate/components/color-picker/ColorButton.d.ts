import type { FC } from 'react';
export type ColorButtonProps = {
    name: string;
    value: string;
    isBrightColor: boolean;
    isSelected: boolean;
    updateColor: (color: string) => void;
};
declare const ColorButton: FC<ColorButtonProps>;
export default ColorButton;
