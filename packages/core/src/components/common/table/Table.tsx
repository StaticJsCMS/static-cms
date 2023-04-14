import React from 'react';

import TableHeaderCell from './TableHeaderCell';

import type { ReactNode } from 'react';

interface TableCellProps {
  columns: ReactNode[];
  children: ReactNode[];
}

const TableCell = ({ columns, children }: TableCellProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-slate-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300 ">
        <thead className="text-xs text-gray-700 bg-gray-100 dark:bg-slate-700 dark:text-gray-300">
          <tr>
            {columns.map((column, index) => (
              <TableHeaderCell key={index}>{column}</TableHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableCell;
