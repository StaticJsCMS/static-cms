import type { FC, ReactNode } from 'react';
import './Pill.css';
export declare const classes: Record<"root" | "default" | "disabled" | "primary" | "no-wrap", string>;
interface PillProps {
    children: ReactNode | ReactNode[];
    noWrap?: boolean;
    className?: string;
    disabled?: boolean;
    color?: 'default' | 'primary';
}
declare const Pill: FC<PillProps>;
export default Pill;
