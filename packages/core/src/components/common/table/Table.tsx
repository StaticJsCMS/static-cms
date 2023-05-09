import React from 'react';

import TableHeaderCell from './TableHeaderCell';

import type { ReactNode } from 'react';

interface TableCellProps {
  columns: ReactNode[];
  children: ReactNode[];
}

const TableCell = ({ columns, children }: TableCellProps) => {
  return (
    <div className="shadow-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
        <thead className="text-xs">
          <tr>
            {columns.map((column, index) => (
              <TableHeaderCell
                key={index}
                isFirst={index === 0}
                isLast={index + 1 === columns.length}
              >
                {column}
              </TableHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableCell;
