import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { NumberField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const NumberPreview: FC<WidgetPreviewProps<string | number, NumberField>> = ({ value }) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default NumberPreview;
