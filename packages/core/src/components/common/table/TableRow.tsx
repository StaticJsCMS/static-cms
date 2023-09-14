import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import tableClasses from './Table.classes';

import type { KeyboardEvent, ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
  className?: string;
  to?: string;
}

const TableRow = ({ children, className, to }: TableRowProps) => {
  const navigate = useNavigate();
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!to) {
        return;
      }

      if (event.key === 'Enter' || event.key === 'Space') {
        navigate(to);
      }
    },
    [navigate, to],
  );

  return (
    <tr
      className={classNames(tableClasses['body-row'], className)}
      tabIndex={to ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      {children}
    </tr>
  );
};

export default TableRow;
