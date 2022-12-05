import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { RelationField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const RelationPreview: FC<WidgetPreviewProps<string | string[], RelationField>> = ({ value }) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default RelationPreview;
