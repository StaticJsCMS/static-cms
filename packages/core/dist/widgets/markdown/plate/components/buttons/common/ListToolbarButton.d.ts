import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';
export interface ListToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
    type: string;
    variant: 'button' | 'menu';
}
declare const ListToolbarButton: FC<ListToolbarButtonProps>;
export default ListToolbarButton;
