import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC, ReactNode } from 'react';

interface PillProps {
  children: ReactNode | ReactNode[];
  noWrap?: boolean;
  className?: string;
  color?: 'default' | 'primary';
}

const Pill: FC<PillProps> = ({ children, noWrap, className, color = 'default' }) => {
  const colorClassNames = useMemo(() => {
    switch (color) {
      case 'primary':
        return `
          bg-blue-700
          text-gray-100
          dark:bg-blue-700
          dark:text-gray-100
        `;
      default:
        return `
          bg-gray-200
          text-gray-900
          dark:bg-gray-700
          dark:text-gray-100
        `;
    }
  }, [color]);

  return (
    <span
      className={classNames(
        `
          text-xs
          font-medium
          mr-2
          px-3
          py-1
          rounded-lg
        `,
        noWrap && 'whitespace-nowrap',
        colorClassNames,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Pill;
