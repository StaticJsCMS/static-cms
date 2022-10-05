import React from 'react';

import type { CmsWidgetPreviewComponent, CmsWidgetPreviewProps } from '../../../interface';

interface PreviewHOCProps extends CmsWidgetPreviewProps<unknown> {
  previewComponent: CmsWidgetPreviewComponent<unknown>;
}

const PreviewHOC = ({ previewComponent, ...props }: PreviewHOCProps) => {
  if (!previewComponent) {
    return null;
  } else if (React.isValidElement(previewComponent)) {
    return React.cloneElement(previewComponent, props);
  } else {
    return React.createElement(previewComponent, props);
  }
};

export default PreviewHOC;
