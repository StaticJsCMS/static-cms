import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { StringOrTextField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const classes = generateClassNames('WidgetTextPreview', ['root']);

const TextPreview: FC<WidgetPreviewProps<string, StringOrTextField>> = ({ value }) => {
  return <div className={classes.root}>{value}</div>;
};

export default TextPreview;
