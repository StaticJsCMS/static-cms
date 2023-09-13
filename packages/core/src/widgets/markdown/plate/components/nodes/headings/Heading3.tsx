import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdH3Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './Heading3.css';

const classes = generateClassNames('WidgetMarkdown_Heading3', ['root']);

const Heading3: FC<PlateRenderElementProps<MdValue, MdH3Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h3 {...attributes} {...nodeProps} className={classes.root}>
      {children}
    </h3>
  );
};

export default Heading3;
