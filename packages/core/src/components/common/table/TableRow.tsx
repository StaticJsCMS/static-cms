import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <tr
      className={classNames(
        `
          border-t
          first:border-t-0
          border-gray-100
          dark:border-gray-700
          bg-white
          hover:bg-slate-50
          dark:bg-slate-800
          dark:hover:bg-slate-700
        `,
        className,
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
