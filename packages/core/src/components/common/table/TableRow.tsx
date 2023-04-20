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
          border-b
          bg-white
          hover:bg-slate-50
          dark:bg-slate-800
          dark:border-gray-700
        `,
        className,
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
