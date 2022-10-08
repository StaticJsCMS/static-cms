import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldMap, CmsWidgetPreviewProps } from '../../interface';

const MapPreview = ({ value }: CmsWidgetPreviewProps<string, CmsFieldMap>) => {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
};

export default MapPreview;
