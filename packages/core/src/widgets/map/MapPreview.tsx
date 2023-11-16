import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { MapField, WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';

const classes = generateClassNames('WidgetMapPreview', ['root']);

const MapPreview: FC<WidgetPreviewProps<string, MapField>> = ({ value }) => {
  return <div className={classes.root}>{value}</div>;
};

export default MapPreview;
