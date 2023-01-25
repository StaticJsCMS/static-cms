import React from 'react';

import type { ReactNode } from 'react';

interface WidgetPreviewContainerProps {
  children?: ReactNode;
}

const WidgetPreviewContainer = ({ children }: WidgetPreviewContainerProps) => {
  return <div>{children}</div>;
};

export default WidgetPreviewContainer;
