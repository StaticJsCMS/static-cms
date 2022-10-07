import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsWidgetPreviewProps } from '../../interface';

const TextPreview = ({ value }: CmsWidgetPreviewProps<string>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default TextPreview;
