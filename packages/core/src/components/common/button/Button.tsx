import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import useButtonClassName from './useButtonClassName';

import type { FC, MouseEventHandler, ReactNode } from 'react';

export interface BaseBaseProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary';
  rounded?: boolean;
  className?: string;
  children: ReactNode | ReactNode[];
  startIcon?: FC<{ className?: string }>;
  endIcon?: FC<{ className?: string }>;
  'data-testid'?: string;
}

export interface ButtonButtonProps extends BaseBaseProps {
  onClick: MouseEventHandler;
  disabled?: boolean;
}

export interface ButtonInternalLinkProps extends BaseBaseProps {
  to: string;
}

export interface ButtonExternalLinkProps extends BaseBaseProps {
  href: string;
}

export type ButtonProps = ButtonButtonProps | ButtonInternalLinkProps | ButtonExternalLinkProps;

const Button = ({
  variant = 'contained',
  color = 'primary',
  rounded = false,
  children,
  className,
  startIcon: StartIcon,
  endIcon: EndIcon,
  'data-testid': dataTestId,
  ...otherProps
}: ButtonProps) => {
  const buttonClassName = useButtonClassName(variant, color, rounded);

  const buttonClassNames = useMemo(
    () => classNames(className, buttonClassName),
    [buttonClassName, className],
  );

  const content = useMemo(
    () => (
      <>
        {StartIcon ? <StartIcon className="w-5 h-5 mr-2" /> : null}
        {children}
        {EndIcon ? <EndIcon className="w-5 h-5 ml-2" /> : null}
      </>
    ),
    [EndIcon, StartIcon, children],
  );

  if ('to' in otherProps) {
    return (
      <Link to={otherProps.to} data-testid={dataTestId} className={buttonClassNames}>
        {content}
      </Link>
    );
  }

  if ('href' in otherProps) {
    return (
      <a
        href={otherProps.href}
        data-testid={dataTestId}
        className={buttonClassNames}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      data-testid={dataTestId}
      className={buttonClassNames}
      disabled={otherProps.disabled}
      onClick={otherProps.onClick}
    >
      {content}
    </button>
  );
};

export default Button;
