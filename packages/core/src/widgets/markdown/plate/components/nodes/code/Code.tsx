import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './Code.css';

const classes = generateClassNames('WidgetMarkdown_Code', ['root']);

const CodeElement: FC<PlateRenderElementProps<MdValue>> = ({ attributes, children, nodeProps }) => {
  return (
    <code {...attributes} {...nodeProps} className={classes.root}>
      {children}
    </code>
  );
};

export default CodeElement;
