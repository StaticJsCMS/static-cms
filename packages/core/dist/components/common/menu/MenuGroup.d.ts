import type { ReactNode } from 'react';
import './MenuGroup.css';
export declare const classes: Record<"root", string>;
export interface MenuGroupProps {
    children: ReactNode | ReactNode[];
}
declare const MenuGroup: ({ children }: MenuGroupProps) => JSX.Element;
export default MenuGroup;
