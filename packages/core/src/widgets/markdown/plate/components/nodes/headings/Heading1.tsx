import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdH1Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './Heading1.css';

const classes = generateClassNames('WidgetMarkdown_Heading1', ['root']);

const Heading1: FC<PlateRenderElementProps<MdValue, MdH1Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h1 {...attributes} {...nodeProps} className={classes.root}>
      {children}
    </h1>
  );
};

export default Heading1;
