import React from 'react';

import widgetMarkdownTableClasses from '../Table.classes';

import type { MdTableRowElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const TableRowElement: FC<PlateRenderElementProps<MdValue, MdTableRowElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <tr {...attributes} {...nodeProps} className={widgetMarkdownTableClasses.row}>
      {children}
    </tr>
  );
};

export default TableRowElement;
