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
    <tr {...attributes} {...nodeProps}>
      {children}
    </tr>
  );
};

export default TableRowElement;
