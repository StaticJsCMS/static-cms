import React from 'react';

import type { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return (
    <tr className="border-b bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-gray-700">
      {children}
    </tr>
  );
};

export default TableRow;
