import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { ColorField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const ColorPreview: FC<WidgetPreviewProps<string, ColorField>> = ({ value }) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default ColorPreview;
