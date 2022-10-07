import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldNumber, CmsWidgetPreviewProps } from '../../interface';

function NumberPreview({ value }: CmsWidgetPreviewProps<string | number, CmsFieldNumber>) {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
}

export default NumberPreview;
