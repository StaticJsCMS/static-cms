import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldRelation, CmsWidgetPreviewProps } from '../../interface';

function RelationPreview({ value }: CmsWidgetPreviewProps<string | string[], CmsFieldRelation>) {
  return <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;
}

export default RelationPreview;
