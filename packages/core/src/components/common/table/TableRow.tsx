import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';

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
      className={classNames(
        `
          border-t
          first:border-t-0
          border-gray-100
          dark:border-gray-700
          bg-white
          hover:bg-slate-50
          dark:bg-slate-800
          dark:hover:bg-slate-700
          focus:outline-none
          focus:bg-gray-100
          focus:dark:bg-slate-700
        `,
        className,
      )}
      tabIndex={to ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      {children}
    </tr>
  );
};

export default TableRow;
