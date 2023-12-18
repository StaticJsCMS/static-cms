import React from 'react';
import type { Config } from '@staticcms/core/interface';
import type { ReactNode } from 'react';
import './ErrorBoundary.css';
export declare const classes: Record<"title" | "header" | "content" | "root" | "report-link" | "details-title" | "error-line", string>;
interface ErrorBoundaryProps {
    children: ReactNode;
    config?: Config;
    showBackup?: boolean;
}
declare const _default: React.ComponentClass<ErrorBoundaryProps, any>;
export default _default;
