import type { CSSProperties, FC, MouseEventHandler, ReactNode, Ref } from 'react';
import './Button.css';
export interface BaseBaseProps {
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    size?: 'medium' | 'small';
    rounded?: boolean | 'no-padding';
    className?: string;
    style?: CSSProperties;
    children: ReactNode | ReactNode[];
    startIcon?: FC<{
        className?: string;
    }>;
    endIcon?: FC<{
        className?: string;
    }>;
    title?: string;
    'data-testid'?: string;
    onClick?: MouseEventHandler;
}
export interface ButtonProps extends BaseBaseProps {
    disabled?: boolean;
    buttonRef?: Ref<HTMLButtonElement>;
    'aria-label'?: string;
}
export interface ButtonInternalLinkProps extends BaseBaseProps {
    to: string;
    linkRef?: Ref<HTMLAnchorElement>;
}
export interface ButtonExternalLinkProps extends BaseBaseProps {
    href: string;
    linkRef?: Ref<HTMLAnchorElement>;
}
export type LinkProps = ButtonInternalLinkProps | ButtonExternalLinkProps;
export type ButtonLinkProps = ButtonProps | LinkProps;
declare const Button: FC<ButtonLinkProps>;
export default Button;
