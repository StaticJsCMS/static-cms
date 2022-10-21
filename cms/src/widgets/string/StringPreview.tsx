import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { StringOrTextField, WidgetPreviewProps } from '../../interface';

const StringPreview = ({ value = '' }: WidgetPreviewProps<string, StringOrTextField>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default StringPreview;
