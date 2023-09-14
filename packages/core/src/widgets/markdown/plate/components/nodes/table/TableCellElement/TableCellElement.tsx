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
    <td {...attributes} {...nodeProps} className={widgetMarkdownTableClasses['body-cell']}>
      <div>{children}</div>
    </td>
  );
};

export default TableHeaderCellElement;
