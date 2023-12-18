import type { FC } from 'react';
import './CircularProgress.css';
export declare const classes: Record<"svg" | "root" | "md" | "sm" | "sr-label", string>;
export interface CircularProgressProps {
    className?: string;
    'data-testid'?: string;
    size?: 'small' | 'medium';
}
declare const CircularProgress: FC<CircularProgressProps>;
export default CircularProgress;
