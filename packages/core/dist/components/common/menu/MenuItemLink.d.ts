import type { FC, ReactNode } from 'react';
import './MenuItemLink.css';
export declare const classes: Record<"content" | "root" | "start-icon" | "end-icon" | "active", string>;
export interface MenuItemLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    active?: boolean;
    startIcon?: FC<{
        className?: string;
    }>;
    endIcon?: FC<{
        className?: string;
    }>;
}
declare const MenuItemLink: ({ href, children, className, active, startIcon: StartIcon, endIcon: EndIcon, }: MenuItemLinkProps) => JSX.Element;
export default MenuItemLink;
