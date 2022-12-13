import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { StringOrTextField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const StringPreview: FC<WidgetPreviewProps<string, StringOrTextField>> = ({ value = '' }) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default StringPreview;
