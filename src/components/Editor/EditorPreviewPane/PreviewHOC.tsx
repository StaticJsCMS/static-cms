import React from 'react';

import type { CmsWidgetPreviewComponent, CmsWidgetPreviewProps } from '../../../interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PreviewHOCProps extends CmsWidgetPreviewProps<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previewComponent: CmsWidgetPreviewComponent<any>;
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
