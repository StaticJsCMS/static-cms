import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { RelationField, WidgetPreviewProps } from '../../interface';

function RelationPreview({ value }: WidgetPreviewProps<string | string[], RelationField>) {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
}

export default RelationPreview;
