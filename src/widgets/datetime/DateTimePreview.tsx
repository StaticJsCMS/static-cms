import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FieldDateTime, WidgetPreviewProps } from '../../interface';

function DatePreview({ value }: WidgetPreviewProps<string, FieldDateTime>) {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
}

export default DatePreview;
