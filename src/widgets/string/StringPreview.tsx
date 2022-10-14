import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FieldStringOrText, WidgetPreviewProps } from '../../interface';

const StringPreview = ({ value = '' }: WidgetPreviewProps<string, FieldStringOrText>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default StringPreview;
