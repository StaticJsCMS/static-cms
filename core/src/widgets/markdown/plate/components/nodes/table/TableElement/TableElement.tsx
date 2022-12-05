import { useSelectedCells } from '@udecode/plate';
import React from 'react';

import type { MdTableElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const TableElement: FC<PlateRenderElementProps<MdValue, MdTableElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  useSelectedCells();

  return (
    <table {...attributes} {...nodeProps}>
      <tbody>{children}</tbody>
    </table>
  );
};

export default TableElement;
