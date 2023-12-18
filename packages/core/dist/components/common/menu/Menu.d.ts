import type { FC, ReactNode } from 'react';
import type { BaseBaseProps } from '../button/Button';
import './Menu.css';
export declare const classes: Record<"label" | "menu" | "root" | "hide-dropdown-icon" | "hide-label" | "hide-dropdown-icon-mobile" | "dropdown" | "dropdown-start-icon" | "dropdown-icon", string>;
export interface MenuProps {
    label: ReactNode;
    startIcon?: FC<{
        className?: string;
    }>;
    variant?: BaseBaseProps['variant'];
    color?: BaseBaseProps['color'];
    size?: BaseBaseProps['size'];
    rounded?: boolean | 'no-padding';
    rootClassName?: string;
    iconClassName?: string;
    buttonClassName?: string;
    labelClassName?: string;
    children: ReactNode | ReactNode[];
    hideDropdownIcon?: boolean;
    hideDropdownIconOnMobile?: boolean;
    hideLabel?: boolean;
    disabled?: boolean;
    keepMounted?: boolean;
    'data-testid'?: string;
}
declare const Menu: ({ label, startIcon: StartIcon, variant, color, size, rounded, rootClassName, iconClassName, buttonClassName, labelClassName, children, hideDropdownIcon, hideDropdownIconOnMobile, hideLabel, disabled, keepMounted, "data-testid": dataTestId, }: MenuProps) => JSX.Element;
export default Menu;
