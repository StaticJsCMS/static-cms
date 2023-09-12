import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { UUIDField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const classes = generateClassNames('WidgetUUIDPreview', ['root']);

const StringPreview: FC<WidgetPreviewProps<string, UUIDField>> = ({ value = '' }) => {
  return <div className={classes.root}>{value}</div>;
};

export default StringPreview;
