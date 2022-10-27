import React, { useMemo } from 'react';

import type { ReactNode } from 'react';
import type { TemplatePreviewComponent, TemplatePreviewProps } from '../../../interface';

interface EditorPreviewContentProps {
  previewComponent?: TemplatePreviewComponent;
  previewProps: TemplatePreviewProps;
}

const EditorPreviewContent = ({ previewComponent, previewProps }: EditorPreviewContentProps) => {
  return useMemo(() => {
    let children: ReactNode;
    if (!previewComponent) {
      children = null;
    } else if (React.isValidElement(previewComponent)) {
      children = React.cloneElement(previewComponent, previewProps);
    } else {
      children = React.createElement(previewComponent, previewProps);
    }

    return children;
  }, [previewComponent, previewProps]);
};

export default EditorPreviewContent;
