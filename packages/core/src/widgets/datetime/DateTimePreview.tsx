import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { DateTimeField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const DatePreview: FC<WidgetPreviewProps<string, DateTimeField>> = ({ value }) => {
  return <WidgetPreviewContainer>{value ? value.toString() : null}</WidgetPreviewContainer>;
};

export default DatePreview;
