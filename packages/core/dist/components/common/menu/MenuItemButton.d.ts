import type { FC, MouseEvent, ReactNode } from 'react';
import './MenuItemButton.css';
export declare const classes: Record<"content" | "root" | "error" | "default" | "disabled" | "warning" | "start-icon" | "end-icon" | "active", string>;
export interface MenuItemButtonProps {
    active?: boolean;
    onClick: (event: MouseEvent) => void;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    startIcon?: FC<{
        className?: string;
    }>;
    endIcon?: FC<{
        className?: string;
    }>;
    color?: 'default' | 'error' | 'warning';
    'data-testid'?: string;
}
declare const MenuItemButton: ({ active, onClick, children, className, disabled, startIcon: StartIcon, endIcon: EndIcon, color, "data-testid": dataTestId, }: MenuItemButtonProps) => JSX.Element;
export default MenuItemButton;
