import React from 'react';

import { isEmpty } from '@staticcms/core/lib/util/string.util';
import tableClasses from './Table.classes';

import type { FC, ReactNode } from 'react';

interface TableHeaderCellProps {
  children: ReactNode;
}

const TableHeaderCell: FC<TableHeaderCellProps> = ({ children }) => {
  return (
    <th scope="col" className={tableClasses['header-cell']}>
      <div className={tableClasses['header-cell-content']}>
        {typeof children === 'string' && isEmpty(children) ? <>&nbsp;</> : children}
      </div>
    </th>
  );
};

export default TableHeaderCell;
