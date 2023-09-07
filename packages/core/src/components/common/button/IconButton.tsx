import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Button from './Button';

import type { FC } from 'react';
import type { ButtonLinkProps } from './Button';

export const classes = generateClassNames('IconButton', ['root', 'sm', 'md']);

export type IconButtonProps = Omit<ButtonLinkProps, 'children'> & {
  children: FC<{ className?: string }>;
};

const IconButton = ({ children, size = 'medium', className, ...otherProps }: ButtonLinkProps) => {
  return (
    <Button
      className={classNames(
        classes.root,
        size === 'small' && classes.sm,
        size === 'medium' && classes.md,
        className,
      )}
      size={size}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default IconButton;
