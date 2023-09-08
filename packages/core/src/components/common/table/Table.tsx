import React from 'react';

import { tableClasses } from './Table.util';
import TableHeaderCell from './TableHeaderCell';

import type { ReactNode } from 'react';

import './Table.css';

interface TableCellProps {
  columns: ReactNode[];
  children: ReactNode[];
}

const TableCell = ({ columns, children }: TableCellProps) => {
  return (
    <div className={tableClasses.root}>
      <table className={tableClasses.table}>
        <thead className={tableClasses.header}>
          <tr className={tableClasses['header-row']}>
            {columns.map((column, index) => (
              <TableHeaderCell key={index}>{column}</TableHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody className={tableClasses.body}>{children}</tbody>
      </table>
    </div>
  );
};

export default TableCell;
