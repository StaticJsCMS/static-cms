import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';
export interface MarkToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick' | 'icon'> {
    type: string;
    clear?: string | string[];
    variant: 'button' | 'menu';
    icon: FC<{
        className?: string;
    }>;
}
declare const MarkToolbarButton: FC<MarkToolbarButtonProps>;
export default MarkToolbarButton;
