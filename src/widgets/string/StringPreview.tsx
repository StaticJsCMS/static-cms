import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldStringOrText, CmsWidgetPreviewProps } from '../../interface';

const StringPreview = ({ value = '' }: CmsWidgetPreviewProps<string, CmsFieldStringOrText>) => {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
};

export default StringPreview;
