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
    <table
      {...attributes}
      {...nodeProps}
      className="
        border-collapse
        border
        border-gray-200
        dark:border-slate-700
        rounded-md
        my-4
      "
    >
      {children ? (
        <>
          <thead
            key="thead"
            className="
              border-r
              border-b
              bg-slate-300
              border-gray-200
              dark:bg-slate-700
              dark:border-gray-800
            "
          >
            {children[0]}
          </thead>
          <tbody key="tbody">{children.slice(1)}</tbody>
        </>
      ) : null}
    </table>
  );
};

export default TableElement;
