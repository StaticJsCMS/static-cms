import React from 'react';

import type { ObjectField, ObjectValue, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const ObjectPreview: FC<WidgetPreviewProps<ObjectValue, ObjectField>> = ({ field }) => {
  return <div>{field.renderedFields ?? null}</div>;
};

export default ObjectPreview;
