import React from 'react';

import type { RelationField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const RelationPreview: FC<WidgetPreviewProps<string | string[], RelationField>> = ({ value }) => {
  return <div>{value}</div>;
};

export default RelationPreview;
