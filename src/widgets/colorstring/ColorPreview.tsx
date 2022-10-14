import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FieldColor, WidgetPreviewProps } from '../../interface';

const ColorPreview = ({ value }: WidgetPreviewProps<string, FieldColor>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default ColorPreview;
