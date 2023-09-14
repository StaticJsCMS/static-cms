import React from 'react';

import widgetMarkdownTableClasses from '../Table.classes';

import type { MdTableCellElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const TableHeaderCellElement: FC<PlateRenderElementProps<MdValue, MdTableCellElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <th {...attributes} {...nodeProps} className={widgetMarkdownTableClasses['header-cell']}>
      <div>{children}</div>
    </th>
  );
};

export default TableHeaderCellElement;
