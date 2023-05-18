import React from 'react';

import TableHeaderCell from './TableHeaderCell';

import type { ReactNode } from 'react';

interface TableCellProps {
  columns: ReactNode[];
  children: ReactNode[];
}

const TableCell = ({ columns, children }: TableCellProps) => {
  return (
    <div
      className="
        z-[2]
      "
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
        <thead className="text-xs">
          <tr className="shadow-sm">
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
