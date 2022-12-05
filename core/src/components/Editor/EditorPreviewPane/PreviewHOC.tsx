import { cloneElement, createElement, isValidElement } from 'react';

import type { WidgetPreviewComponent, WidgetPreviewProps } from '@staticcms/core/interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PreviewHOCProps extends Omit<WidgetPreviewProps, 'widgetFor'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previewComponent: WidgetPreviewComponent;
}

const PreviewHOC = ({ previewComponent, ...props }: PreviewHOCProps) => {
  if (!previewComponent) {
    return null;
  } else if (isValidElement(previewComponent)) {
    return cloneElement(previewComponent, props);
  } else {
    return createElement(previewComponent, props);
  }
};

export default PreviewHOC;
