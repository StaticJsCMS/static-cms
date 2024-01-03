import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC, ReactNode } from 'react';

import './Pill.css';

export const classes = generateClassNames('Pill', [
  'root',
  'no-wrap',
  'primary',
  'default',
  'info',
  'warning',
  'error',
  'success',
  'disabled',
]);

export interface PillProps {
  children: ReactNode | ReactNode[];
  noWrap?: boolean;
  className?: string;
  disabled?: boolean;
  color?: 'default' | 'primary' | 'info' | 'warning' | 'error' | 'success';
}

const Pill: FC<PillProps> = ({
  children,
  noWrap,
  className,
  disabled = false,
  color = 'default',
}) => {
  return (
    <span
      className={classNames(
        className,
        classes.root,
        noWrap && classes['no-wrap'],
        disabled && classes.disabled,
        classes[color],
      )}
    >
      {children}
    </span>
  );
};

export default Pill;
