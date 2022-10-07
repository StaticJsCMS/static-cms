import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsWidgetPreviewProps } from '../../interface';

const StringPreview = ({ value = '' }: CmsWidgetPreviewProps<string>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default StringPreview;
