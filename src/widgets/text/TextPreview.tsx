import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldStringOrText, CmsWidgetPreviewProps } from '../../interface';

const TextPreview = ({ value }: CmsWidgetPreviewProps<string, CmsFieldStringOrText>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default TextPreview;
