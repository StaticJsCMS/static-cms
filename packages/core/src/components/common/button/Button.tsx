import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import useButtonClassNames from './useButtonClassNames';

import type { FC, MouseEventHandler, ReactNode, Ref } from 'react';

export interface BaseBaseProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'success' | 'error';
  rounded?: boolean;
  className?: string;
  children: ReactNode | ReactNode[];
  startIcon?: FC<{ className?: string }>;
  endIcon?: FC<{ className?: string }>;
  title?: string;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseBaseProps {
  onClick?: MouseEventHandler;
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

const Button: FC<ButtonLinkProps> = ({
  variant = 'contained',
  color = 'primary',
  rounded = false,
  children,
  className,
  startIcon: StartIcon,
  endIcon: EndIcon,
  title,
  'data-testid': dataTestId,
  ...otherProps
}) => {
  const buttonClassName = useButtonClassNames(variant, color, rounded);

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
      <Link
        ref={otherProps.linkRef}
        to={otherProps.to}
        title={title}
        data-testid={dataTestId}
        className={buttonClassNames}
      >
        {content}
      </Link>
    );
  }

  if ('href' in otherProps) {
    return (
      <a
        ref={otherProps.linkRef}
        href={otherProps.href}
        title={title}
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
      ref={otherProps.buttonRef}
      title={title}
      data-testid={dataTestId}
      className={buttonClassNames}
      disabled={otherProps.disabled}
      onClick={otherProps.onClick}
      aria-label={otherProps['aria-label']}
      type="button"
      role="button"
      tabIndex={0}
    >
      {content}
    </button>
  );
};

export default Button;
