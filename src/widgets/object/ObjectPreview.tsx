import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsWidgetPreviewProps, CmsFieldObject, ValueOrNestedValue } from '../../interface';

function ObjectPreview({
  value,
}: CmsWidgetPreviewProps<
  {
    [key: string]: ValueOrNestedValue;
  },
  CmsFieldObject
>) {
  return <WidgetPreviewContainer>{JSON.stringify(value, null, 2)}</WidgetPreviewContainer>;
}

export default ObjectPreview;
