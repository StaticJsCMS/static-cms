import React from 'react';

import type { ComponentType } from 'react';
import type { CmsWidgetPreviewProps, GetAssetFunction } from '../../../interface';

interface PreviewHOCProps {
  previewComponent: ComponentType<CmsWidgetPreviewProps<unknown>>;
  field: Record<string, unknown>;
  value: unknown;
  metadata: Record<string, unknown>;
  getAsset: GetAssetFunction;
  entry: Record<string, unknown>;
  fieldsMetaData: Record<string, unknown>;
}

const PreviewHOC = ({ previewComponent, ...props }: PreviewHOCProps) => {
  return React.createElement(previewComponent, props);
};

export default PreviewHOC;
