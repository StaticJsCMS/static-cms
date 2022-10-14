import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FieldNumber, WidgetPreviewProps } from '../../interface';

function NumberPreview({ value }: WidgetPreviewProps<string | number, FieldNumber>) {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
}

export default NumberPreview;
