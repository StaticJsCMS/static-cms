import type { FC, ReactNode } from 'react';
import type { ToolbarButtonProps } from '../ToolbarButton';
export interface ToolbarDropdownProps extends Omit<ToolbarButtonProps, 'onClick'> {
    children: ReactNode;
    onClose?: () => void;
}
declare const ToolbarDropdown: FC<ToolbarDropdownProps>;
export default ToolbarDropdown;
