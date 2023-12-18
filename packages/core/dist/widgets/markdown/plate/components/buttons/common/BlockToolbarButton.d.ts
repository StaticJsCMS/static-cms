import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';
export interface BlockToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
    type: string;
    inactiveType?: string;
    variant: 'button' | 'menu';
}
declare const BlockToolbarButton: FC<BlockToolbarButtonProps>;
export default BlockToolbarButton;
