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
      className={classNames(
        `
          text-gray-500
          bg-slate-50
          dark:text-gray-400
          dark:bg-slate-900
          sticky
          top-0
          p-0
        `,
        isFirst &&
          `
            before:flex
            before:absolute
            before:content-['']
            before:w-5
            before:h-5
            before:bg-slate-50
            before:dark:bg-slate-900
            before:z-[1]
            before:-left-[1px]
            before:-top-[1px]
          `,
        isLast &&
          `
            before:flex
            before:absolute
            before:content-['']
            before:w-5
            before:h-5
            before:bg-slate-50
            before:dark:bg-slate-900
            before:z-[1]
            before:-right-[1px]
            before:-top-[1px]
          `,
      )}
    >
      <div
        className={classNames(
          `
            relative
            bg-gray-100
            dark:bg-slate-700
            px-4
            py-3
            z-[2]
          `,
          isFirst && 'rounded-tl-[4px]',
          isLast && 'rounded-tr-[4px]',
        )}
      >
        {typeof children === 'string' && isEmpty(children) ? <>&nbsp;</> : children}
      </div>
    </th>
  );
};

export default TableHeaderCell;
