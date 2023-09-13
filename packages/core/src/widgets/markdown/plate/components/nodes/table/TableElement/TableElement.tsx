import { useSelectedCells } from '@udecode/plate';
import React from 'react';

import widgetMarkdownTableClasses from '../Table.classes';

import type { MdTableElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import '../Table.css';

const TableElement: FC<PlateRenderElementProps<MdValue, MdTableElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  useSelectedCells();

  return (
    <table {...attributes} {...nodeProps} className={widgetMarkdownTableClasses.root}>
      {children ? (
        <>
          <thead key="thead" className={widgetMarkdownTableClasses.header}>
            {children[0]}
          </thead>
          <tbody key="tbody" className={widgetMarkdownTableClasses.body}>
            {children.slice(1)}
          </tbody>
        </>
      ) : null}
    </table>
  );
};

export default TableElement;
