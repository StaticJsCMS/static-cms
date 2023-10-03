import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Button from './Button';

import type { FC } from 'react';
import type { ButtonExternalLinkProps, ButtonInternalLinkProps, ButtonProps } from './Button';

import './IconButton.css';

export const classes = generateClassNames('IconButton', ['root', 'sm', 'md', 'icon']);

export interface BaseIconButtonProps {
  rootClassName?: string;
  iconClassName?: string;
  icon: FC<{ className?: string }>;
}

export type IconButtonProps = Omit<ButtonProps, 'children' | 'className'> & BaseIconButtonProps;

export type IconButtonInternalLinkProps = Omit<ButtonInternalLinkProps, 'children' | 'className'> &
  BaseIconButtonProps;

export type IconButtonExternalLinkProps = Omit<ButtonExternalLinkProps, 'children' | 'className'> &
  BaseIconButtonProps;

export type IconLinkProps = IconButtonInternalLinkProps | IconButtonExternalLinkProps;

export type IconButtonLinkProps = IconButtonProps | IconLinkProps;

const IconButton: FC<IconButtonLinkProps> = ({
  icon: Icon,
  size = 'medium',
  rootClassName,
  iconClassName,
  ...otherProps
}) => {
  return (
    <Button
      className={classNames(
        rootClassName,
        classes.root,
        size === 'small' && classes.sm,
        size === 'medium' && classes.md,
      )}
      size={size}
      {...otherProps}
    >
      <Icon className={classNames(iconClassName, classes.icon)} />
    </Button>
  );
};

export default IconButton;
