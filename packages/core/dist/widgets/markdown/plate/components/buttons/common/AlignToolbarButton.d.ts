import type { Alignment } from '@udecode/plate';
import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';
export interface AlignToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
    value: Alignment;
    pluginKey?: string;
    variant: 'button' | 'menu';
}
declare const AlignToolbarButton: FC<AlignToolbarButtonProps>;
export default AlignToolbarButton;
