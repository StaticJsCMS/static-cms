import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { DateTimeField, WidgetPreviewProps } from '../../interface';

function DatePreview({ value }: WidgetPreviewProps<string, DateTimeField>) {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
}

export default DatePreview;
