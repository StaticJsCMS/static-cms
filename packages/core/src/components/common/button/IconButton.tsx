import React from 'react';

import Button from './Button';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC } from 'react';
import type { ButtonLinkProps } from './Button';

export type IconButtonProps = Omit<ButtonLinkProps, 'children'> & {
  children: FC<{ className?: string }>;
};

const IconButton = ({ children, size = 'medium', className, ...otherProps }: ButtonLinkProps) => {
  return (
    <Button
      className={classNames(size === 'small' && 'px-0.5', size === 'medium' && 'px-1.5', className)}
      size={size}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default IconButton;
