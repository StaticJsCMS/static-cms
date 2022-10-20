import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { MapField, WidgetPreviewProps } from '../../interface';

const MapPreview = ({ value }: WidgetPreviewProps<string, MapField>) => {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
};

export default MapPreview;
