import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC, ReactNode } from 'react';

interface PillProps {
  children: ReactNode | ReactNode[];
  noWrap?: boolean;
}

const Pill: FC<PillProps> = ({ children, noWrap }) => {
  return (
    <span
      className={classNames(
        `bg-gray-200
        text-gray-900
        text-xs
        font-medium
        mr-2
        px-3
        py-1
        rounded-lg
        dark:bg-gray-700
        dark:text-gray-100`,
        noWrap && 'whitespace-nowrap',
      )}
    >
      {children}
    </span>
  );
};

export default Pill;
