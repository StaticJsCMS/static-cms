import React from 'react';

import type { ColorField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const ColorPreview: FC<WidgetPreviewProps<string, ColorField>> = ({ value }) => {
  return <div>{value}</div>;
};

export default ColorPreview;
