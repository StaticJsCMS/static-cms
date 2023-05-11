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
