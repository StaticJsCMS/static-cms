import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { WidgetPreviewProps, ObjectField, ListField, ObjectValue } from '../../interface';

function ObjectPreview({
  value,
}: WidgetPreviewProps<ObjectValue | ObjectValue[], ObjectField | ListField>) {
  return <WidgetPreviewContainer>{JSON.stringify(value, null, 2)}</WidgetPreviewContainer>;
}

export default ObjectPreview;
