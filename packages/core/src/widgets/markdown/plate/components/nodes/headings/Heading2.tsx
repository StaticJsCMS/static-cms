import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdH2Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './Heading2.css';

const classes = generateClassNames('WidgetMarkdown_Heading2', ['root']);

const Heading2: FC<PlateRenderElementProps<MdValue, MdH2Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h2 {...attributes} {...nodeProps} className={classes.root}>
      {children}
    </h2>
  );
};

export default Heading2;
