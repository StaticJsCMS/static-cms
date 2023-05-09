import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';

import type { ReactNode } from 'react';

interface TableHeaderCellProps {
  children: ReactNode;
  isFirst: boolean;
  isLast: boolean;
}

const TableHeaderCell = ({ children, isFirst, isLast }: TableHeaderCellProps) => {
  return (
    <th
      scope="col"
      className="
        text-gray-500
        bg-slate-50
        dark:text-gray-400
        dark:bg-slate-900
        sticky
        top-0
        p-0
      "
    >
      <div
        className={classNames(
          `
            bg-gray-100
            border-slate-200
            dark:bg-slate-700
            dark:border-gray-700
            px-4
            py-3
          `,
          isFirst && 'rounded-tl-lg',
          isLast && 'rounded-tr-lg',
        )}
      >
        {typeof children === 'string' && isEmpty(children) ? <>&nbsp;</> : children}
      </div>
    </th>
  );
};

export default TableHeaderCell;
