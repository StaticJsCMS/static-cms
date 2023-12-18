import type { FC } from 'react';
import type { ColorType } from '../../color-picker/types';
import type { ToolbarButtonProps } from './ToolbarButton';
export interface ColorPickerToolbarDropdownProps extends Omit<ToolbarButtonProps, 'onClick'> {
    pluginKey: string;
    colors?: ColorType[];
    customColors?: ColorType[];
    closeOnSelect?: boolean;
}
declare const ColorPickerToolbarDropdown: FC<ColorPickerToolbarDropdownProps>;
export default ColorPickerToolbarDropdown;
