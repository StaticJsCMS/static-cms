import React from 'react';
import type { FC, MouseEventHandler, ReactNode } from 'react';
import './Login.css';
export declare const classes: Record<"button" | "root" | "error" | "custom-logo" | "static-cms-logo" | "error-icon" | "error-sr-label", string>;
export interface LoginProps {
    inProgress?: boolean;
    login: MouseEventHandler;
    icon?: FC<{
        className?: string | undefined;
    }>;
    label?: string;
    error?: ReactNode;
    disabled?: boolean;
}
declare const _default: React.FC<LoginProps>;
export default _default;
