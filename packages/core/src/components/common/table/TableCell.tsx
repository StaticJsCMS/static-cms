import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ReactNode } from 'react';

interface TableCellProps {
  children: ReactNode;
  emphasis?: boolean;
  to?: string;
  shrink?: boolean;
}

const TableCell = ({ children, emphasis = false, to, shrink = false }: TableCellProps) => {
  const content = useMemo(() => {
    if (to) {
      return (
        <Link
          to={to}
          className="
            w-full
            h-full
            flex
            px-4
            py-3
            whitespace-nowrap
          "
        >
          {children}
        </Link>
      );
    }

    return children;
  }, [children, to]);

  return (
    <td
      className={classNames(
        !to ? 'px-4 py-3' : 'p-0',
        `
          text-gray-500
          dark:text-gray-300
        `,
        emphasis && 'font-medium text-gray-800 whitespace-nowrap dark:text-white',
        shrink && 'w-0',
      )}
    >
      <div
        className="
          h-[44px]
          text-ellipsis
          overflow-hidden
          whitespace-nowrap
          w-full
        "
      >
        {content}
      </div>
    </td>
  );
};

export default TableCell;
