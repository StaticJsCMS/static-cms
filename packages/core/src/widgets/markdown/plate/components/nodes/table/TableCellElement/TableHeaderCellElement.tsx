import React from 'react';

import type { MdTableCellElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const TableHeaderCellElement: FC<PlateRenderElementProps<MdValue, MdTableCellElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <th
      {...attributes}
      {...nodeProps}
      className="
        px-2
        py-1
        [&>div>p]:m-0
        text-left
        bg-slate-300
        text-sm
        border-r
        border-gray-200
        last:border-0
        dark:bg-slate-700
        dark:border-gray-800
      "
    >
      <div>{children}</div>
    </th>
  );
};

export default TableHeaderCellElement;
