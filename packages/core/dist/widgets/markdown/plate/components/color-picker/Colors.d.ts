import type { FC } from 'react';
import type { ColorType } from './types';
export type ColorsProps = {
    color?: string;
    colors: ColorType[];
    updateColor: (color: string) => void;
};
declare const Colors: FC<ColorsProps>;
export default Colors;
