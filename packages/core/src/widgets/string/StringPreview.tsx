import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { StringField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const classes = generateClassNames('WidgetStringPreview', ['root']);

const StringPreview: FC<WidgetPreviewProps<string, StringField>> = ({ value = '' }) => {
  return <div className={classes.root}>{value}</div>;
};

export default StringPreview;
