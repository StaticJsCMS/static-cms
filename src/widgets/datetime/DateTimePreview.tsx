import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldDateTime, CmsWidgetPreviewProps } from '../../interface';

function DatePreview({ value }: CmsWidgetPreviewProps<string, CmsFieldDateTime>) {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
}

export default DatePreview;
