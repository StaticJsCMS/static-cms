import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdParagraphElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './ParagraphElement.css';

const classes = generateClassNames('WidgetMarkdown_Paragraph', ['root']);

const ParagraphElement: FC<PlateRenderElementProps<MdValue, MdParagraphElement>> = ({
  children,
  element: { align },
}) => {
  return (
    <p style={{ textAlign: align }} className={classes.root}>
      {children}
    </p>
  );
};

export default ParagraphElement;
