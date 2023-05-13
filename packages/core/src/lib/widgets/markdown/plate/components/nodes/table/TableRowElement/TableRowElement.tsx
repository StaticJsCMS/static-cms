import React from 'react';

import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';
import type { MdTableRowElement, MdValue } from '@staticcms/markdown';

const TableRowElement: FC<PlateRenderElementProps<MdValue, MdTableRowElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <tr
      {...attributes}
      {...nodeProps}
      className="
        border-b
        border-gray-200
        last:border-0
        dark:border-gray-800
      "
    >
      {children}
    </tr>
  );
};

export default TableRowElement;
