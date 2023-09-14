import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC, ReactNode } from 'react';

import './Pill.css';

export const classes = generateClassNames('Pill', [
  'root',
  'no-wrap',
  'primary',
  'default',
  'disabled',
]);

interface PillProps {
  children: ReactNode | ReactNode[];
  noWrap?: boolean;
  className?: string;
  disabled?: boolean;
  color?: 'default' | 'primary';
}

const Pill: FC<PillProps> = ({
  children,
  noWrap,
  className,
  disabled = false,
  color = 'default',
}) => {
  const colorClassNames = useMemo(() => {
    switch (color) {
      case 'primary':
        return classes.primary;
      default:
        return classes.default;
    }
  }, [color]);

  return (
    <span
      className={classNames(
        classes.root,
        noWrap && classes['no-wrap'],
        disabled && classes.disabled,
        colorClassNames,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Pill;
