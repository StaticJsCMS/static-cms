import type { Breadcrumb } from '@staticcms/core/interface';
import type { FC } from 'react';
import './Breadcrumbs.css';
export declare const classes: Record<"root" | "links-wrapper" | "links" | "breadcrumb-link" | "breadcrumb-text" | "breadcrumb-truncated" | "last-non-editor-breadcrumb-link" | "mobile-current-breadcrumb-link" | "mobile-backlink" | "mobile-current-breadcrumb-text", string>;
export interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
    inEditor?: boolean;
}
declare const Breadcrumbs: FC<BreadcrumbsProps>;
export default Breadcrumbs;
