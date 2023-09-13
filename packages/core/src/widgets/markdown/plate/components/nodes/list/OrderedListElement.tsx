import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdNumberedListElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './OrderedListElement.css';

const classes = generateClassNames('WidgetMarkdown_OrderedList', ['root']);

const OrderedListElement: FC<PlateRenderElementProps<MdValue, MdNumberedListElement>> = ({
  children,
}) => {
  return <ol className={classes.root}>{children}</ol>;
};

export default OrderedListElement;
