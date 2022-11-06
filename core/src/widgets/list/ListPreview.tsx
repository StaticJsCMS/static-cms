import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { ListField, ObjectValue, WidgetPreviewProps } from '../../interface';

function ObjectPreview({ field }: WidgetPreviewProps<ObjectValue[], ListField>) {
  return <WidgetPreviewContainer>{field.fields ?? null}</WidgetPreviewContainer>;
}

export default ObjectPreview;
