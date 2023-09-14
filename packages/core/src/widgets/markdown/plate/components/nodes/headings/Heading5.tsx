import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdH5Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './Heading5.css';

const classes = generateClassNames('WidgetMarkdown_Heading5', ['root']);

const Heading5: FC<PlateRenderElementProps<MdValue, MdH5Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h5 {...attributes} {...nodeProps} className={classes.root}>
      {children}
    </h5>
  );
};

export default Heading5;
