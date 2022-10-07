import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type {
  CmsWidgetPreviewProps,
  CmsFieldObject,
  ValueOrNestedValue,
  CmsFieldList,
  ListValue,
} from '../../interface';

function ObjectPreview({
  value,
}: CmsWidgetPreviewProps<
  | {
      [key: string]: ValueOrNestedValue;
    }
  | ListValue[],
  CmsFieldObject | CmsFieldList
>) {
  return <WidgetPreviewContainer>{JSON.stringify(value, null, 2)}</WidgetPreviewContainer>;
}

export default ObjectPreview;
