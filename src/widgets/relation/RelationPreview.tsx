import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FieldRelation, WidgetPreviewProps } from '../../interface';

function RelationPreview({ value }: WidgetPreviewProps<string | string[], FieldRelation>) {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
}

export default RelationPreview;
