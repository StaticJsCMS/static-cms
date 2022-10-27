import React from 'react';

import type { WidgetPreviewComponent, WidgetPreviewProps } from '../../../interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PreviewHOCProps extends Omit<WidgetPreviewProps, 'widgetFor'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previewComponent: WidgetPreviewComponent;
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
