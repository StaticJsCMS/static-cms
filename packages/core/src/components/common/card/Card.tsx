import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={classNames(
        `
          bg-white
          border
          border-gray-100
          rounded-lg
          shadow-sm
          dark:bg-slate-800
          dark:border-gray-700/40
          dark:shadow-md
          flex
          flex-col
          h-full
        `,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
