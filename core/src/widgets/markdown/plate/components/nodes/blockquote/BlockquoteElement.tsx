import React from 'react';

import type { MdBlockquoteElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const BlockquoteElement: FC<PlateRenderElementProps<MdValue, MdBlockquoteElement>> = ({
  children,
}) => {
  return <blockquote>{children}</blockquote>;
};

export default BlockquoteElement;
