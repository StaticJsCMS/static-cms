import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC, ReactNode } from 'react';

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
        return disabled
          ? `
              bg-blue-300/75
              text-gray-100/75
              dark:bg-blue-700/25
              dark:text-gray-500
            `
          : `
              bg-blue-700
              text-gray-100
              dark:bg-blue-700
              dark:text-gray-100
            `;
      default:
        return disabled
          ? `
              bg-gray-100
              text-gray-400/75
              dark:bg-gray-800/75
              dark:text-gray-500
            `
          : `
              bg-gray-200
              text-gray-900
              dark:bg-gray-700
              dark:text-gray-100
            `;
    }
  }, [color, disabled]);

  return (
    <span
      className={classNames(
        `
          text-xs
          font-medium
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
