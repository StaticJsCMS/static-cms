import React from 'react';
import type { Breadcrumb } from '@staticcms/core/interface';
import type { ReactNode } from 'react';
import './Navbar.css';
export declare const classes: Record<"content" | "logo" | "root" | "actions" | "quick-create" | "breadcrumbs" | "in-editor" | "content-wrapper" | "logo-wrapper" | "custom-logo" | "site-url" | "site-url-label" | "site-url-icon", string>;
export interface NavbarProps {
    breadcrumbs?: Breadcrumb[];
    showQuickCreate?: boolean;
    navbarActions?: ReactNode;
}
declare const _default: React.FC<NavbarProps>;
export default _default;
