import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { ColorField, WidgetPreviewProps } from '../../interface';

const ColorPreview = ({ value }: WidgetPreviewProps<string, ColorField>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default ColorPreview;
