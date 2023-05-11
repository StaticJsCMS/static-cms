import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';

import type { ReactNode } from 'react';

interface TableHeaderCellProps {
  children: ReactNode;
}

const TableHeaderCell = ({ children }: TableHeaderCellProps) => {
  return (
    <th
      scope="col"
      className={classNames(
        `
          font-bold
          sticky
          top-0
          border-0
          p-0
        `,
      )}
    >
      <div
        className="
          px-4
          py-3
          text-gray-900
          border-gray-100
          border-b
          bg-white
          dark:text-white
          dark:border-gray-700
          dark:bg-slate-800
          shadow-sm
          text-[14px]
        "
      >
        {typeof children === 'string' && isEmpty(children) ? <>&nbsp;</> : children}
      </div>
    </th>
  );
};

export default TableHeaderCell;
