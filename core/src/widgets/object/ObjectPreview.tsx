import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { WidgetPreviewProps, ObjectField, ListField, ObjectValue } from '../../interface';

function ObjectPreview({
  field,
}: WidgetPreviewProps<ObjectValue | ObjectValue[], ObjectField | ListField>) {
  return <WidgetPreviewContainer>{field.fields ?? null}</WidgetPreviewContainer>;
}

export default ObjectPreview;
