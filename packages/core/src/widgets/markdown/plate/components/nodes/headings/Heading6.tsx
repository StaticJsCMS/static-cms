import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdH6Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './Heading6.css';

const classes = generateClassNames('WidgetMarkdown_Heading6', ['root']);

const Heading6: FC<PlateRenderElementProps<MdValue, MdH6Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h6 {...attributes} {...nodeProps} className={classes.root}>
      {children}
    </h6>
  );
};

export default Heading6;
