import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdH4Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './Heading4.css';

const classes = generateClassNames('WidgetMarkdown_Heading4', ['root']);

const Heading4: FC<PlateRenderElementProps<MdValue, MdH4Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h4 {...attributes} {...nodeProps} className={classes.root}>
      {children}
    </h4>
  );
};

export default Heading4;
