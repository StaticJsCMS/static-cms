import type { ChangeEvent, FC } from 'react';
export interface ColorInputProps {
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
declare const ColorInput: FC<ColorInputProps>;
export default ColorInput;
