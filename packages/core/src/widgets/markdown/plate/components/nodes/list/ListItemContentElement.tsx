import React from 'react';

import type { MdListItemElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const ListItemContentElement: FC<PlateRenderElementProps<MdValue, MdListItemElement>> = ({
  children,
}) => {
  return <span>{children}</span>;
};

export default ListItemContentElement;
