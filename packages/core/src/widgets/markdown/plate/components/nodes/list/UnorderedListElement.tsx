import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MdBulletedListElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

import './UnorderedListElement.css';

const classes = generateClassNames('WidgetMarkdown_UnorderedList', ['root']);

const UnorderedListElement: FC<PlateRenderElementProps<MdValue, MdBulletedListElement>> = ({
  children,
}) => {
  return <ul className={classes.root}>{children}</ul>;
};

export default UnorderedListElement;
