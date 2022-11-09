import React, { memo } from 'react';

import type { TemplatePreviewComponent, TemplatePreviewProps } from '../../../interface';

interface EditorPreviewContentProps {
  previewComponent?: TemplatePreviewComponent;
  previewProps: TemplatePreviewProps;
}

const EditorPreviewContent = memo(
  ({ previewComponent, previewProps }: EditorPreviewContentProps) => {
    if (!previewComponent) {
      return null;
    }

    return React.createElement(previewComponent, previewProps);
  },
);

EditorPreviewContent.displayName = 'EditorPreviewContent';

export default EditorPreviewContent;
