import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FieldMap, WidgetPreviewProps } from '../../interface';

const MapPreview = ({ value }: WidgetPreviewProps<string, FieldMap>) => {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
};

export default MapPreview;
