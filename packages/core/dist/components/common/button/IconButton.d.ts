import type { FC } from 'react';
import type { ButtonLinkProps } from './Button';
import './IconButton.css';
export declare const classes: Record<"root" | "md" | "sm", string>;
export type IconButtonProps = Omit<ButtonLinkProps, 'children'> & {
    children: FC<{
        className?: string;
    }>;
};
declare const IconButton: ({ children, size, className, ...otherProps }: ButtonLinkProps) => JSX.Element;
export default IconButton;
