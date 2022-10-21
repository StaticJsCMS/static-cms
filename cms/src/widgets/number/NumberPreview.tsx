import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { NumberField, WidgetPreviewProps } from '../../interface';

function NumberPreview({ value }: WidgetPreviewProps<string | number, NumberField>) {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
}

export default NumberPreview;
