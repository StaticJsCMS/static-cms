import React from 'react';

import type { ReactNode } from 'react';

interface TableHeaderCellProps {
  children: ReactNode;
}

const TableHeaderCell = ({ children }: TableHeaderCellProps) => {
  return (
    <th scope="col" className="px-4 py-3 text-gray-500 dark:text-gray-400">
      {children}
    </th>
  );
};

export default TableHeaderCell;
