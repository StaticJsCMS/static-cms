import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ColorField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const classes = generateClassNames('WidgetColorPreview', ['root']);

const ColorPreview: FC<WidgetPreviewProps<string, ColorField>> = ({ value }) => {
  return <div className={classes.root}>{value}</div>;
};

export default ColorPreview;
