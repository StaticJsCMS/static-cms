import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ObjectField, ObjectValue, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const classes = generateClassNames('WidgetObjectPreview', ['root']);

const ObjectPreview: FC<WidgetPreviewProps<ObjectValue, ObjectField>> = ({ field }) => {
  return <div className={classes.root}>{field.renderedFields ?? null}</div>;
};

export default ObjectPreview;
