import type { FC, MouseEvent } from 'react';
import './ToolbarButton.css';
export interface ToolbarButtonProps {
    label?: string;
    tooltip: string;
    active?: boolean;
    activeColor?: string;
    icon: FC<{
        className?: string;
    }>;
    disableFocusAfterClick?: boolean;
    disabled: boolean;
    variant: 'button' | 'menu';
    onClick: (event: MouseEvent) => void;
}
declare const ToolbarButton: FC<ToolbarButtonProps>;
export default ToolbarButton;
