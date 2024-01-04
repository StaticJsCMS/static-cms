import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import tableClasses from './Table.classes';

import type { FC, ReactNode } from 'react';

export interface TableCellProps {
  children: ReactNode;
  emphasis?: boolean;
  to?: string;
  shrink?: boolean;
}

const TableCell: FC<TableCellProps> = ({ children, emphasis = false, to, shrink = false }) => {
  const content = useMemo(() => {
    if (to) {
      return (
        <Link to={to} className={tableClasses['body-cell-link']} tabIndex={-1}>
          {children}
        </Link>
      );
    }

    return children;
  }, [children, to]);

  return (
    <td
      className={classNames(
        tableClasses['body-cell'],
        to && tableClasses['body-cell-has-link'],
        emphasis && tableClasses['body-cell-emphasis'],
        shrink && tableClasses['body-cell-shrink'],
      )}
    >
      <div className={tableClasses['body-cell-content']}>{content}</div>
    </td>
  );
};

export default TableCell;
