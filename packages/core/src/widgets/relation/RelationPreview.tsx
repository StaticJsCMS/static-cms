import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { RelationField, WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';

const classes = generateClassNames('WidgetRelationPreview', ['root']);

const RelationPreview: FC<WidgetPreviewProps<string | string[], RelationField>> = ({ value }) => {
  return <div className={classes.root}>{value}</div>;
};

export default RelationPreview;
