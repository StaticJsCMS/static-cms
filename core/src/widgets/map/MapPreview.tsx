import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { MapField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const MapPreview: FC<WidgetPreviewProps<string, MapField>> = ({ value }) => {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
};

export default MapPreview;
