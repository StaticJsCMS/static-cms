import React from 'react';

import Button from './Button';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC } from 'react';
import type { ButtonProps } from './Button';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  children: FC<{ className?: string }>;
};

const IconButton = ({ children, className, ...otherProps }: ButtonProps) => {
  return (
    <Button className={classNames('px-1.5', className)} {...otherProps}>
      {children}
    </Button>
  );
};

export default IconButton;
