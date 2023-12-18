import type { MouseEventHandler, ReactNode } from 'react';
import './NavLink.css';
export declare const classes: Record<"label" | "content" | "link" | "root" | "icon" | "external" | "external-content" | "external-icon" | "active", string>;
export interface BaseNavLinkProps {
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler;
}
export interface NavExternalLinkProps extends BaseNavLinkProps {
    href: string;
}
export interface NavInternalLinkProps extends BaseNavLinkProps {
    to: string;
}
export type NavLinkProps = NavExternalLinkProps | NavInternalLinkProps;
declare const NavLink: ({ icon, children, className, onClick, ...otherProps }: NavLinkProps) => JSX.Element;
export default NavLink;
