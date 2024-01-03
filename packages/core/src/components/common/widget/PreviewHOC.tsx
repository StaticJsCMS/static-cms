import { cloneElement, createElement, isValidElement } from 'react';

import type { WidgetPreviewComponent, WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PreviewHOCProps extends Omit<WidgetPreviewProps, 'widgetFor'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previewComponent: WidgetPreviewComponent;
}

const PreviewHOC: FC<PreviewHOCProps> = ({ previewComponent, ...props }) => {
  if (!previewComponent) {
    return null;
  } else if (isValidElement(previewComponent)) {
    return cloneElement(previewComponent, props);
  } else {
    return createElement(previewComponent, props);
  }
};

export default PreviewHOC;
