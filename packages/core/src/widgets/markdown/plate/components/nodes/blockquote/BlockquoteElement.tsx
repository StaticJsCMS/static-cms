import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdBlockquoteElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './BlockquoteElement.css';

const classes = generateClassNames('WidgetMarkdown_Blockquote', ['root']);

const BlockquoteElement: FC<PlateRenderElementProps<MdValue, MdBlockquoteElement>> = ({
  children,
}) => {
  return <blockquote className={classes.root}>{children}</blockquote>;
};

export default BlockquoteElement;
