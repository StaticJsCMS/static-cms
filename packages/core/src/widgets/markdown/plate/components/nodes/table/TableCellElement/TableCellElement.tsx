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
    <td
      {...attributes}
      {...nodeProps}
      className="
        px-2
        py-1
        [&>div>p]:m-0
        border-r
        border-gray-200
        last:border-0
        dark:border-gray-800
        text-sm
      "
    >
      <div>{children}</div>
    </td>
  );
};

export default TableHeaderCellElement;
