import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldColor, CmsWidgetPreviewProps } from '../../interface';

const ColorPreview = ({ value }: CmsWidgetPreviewProps<string, CmsFieldColor>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default ColorPreview;
