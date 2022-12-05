import { createElement, memo } from 'react';

import type { TemplatePreviewComponent, TemplatePreviewProps } from '@staticcms/core/interface';

interface EditorPreviewContentProps {
  previewComponent?: TemplatePreviewComponent;
  previewProps: TemplatePreviewProps;
}

const EditorPreviewContent = memo(
  ({ previewComponent, previewProps }: EditorPreviewContentProps) => {
    if (!previewComponent) {
      return null;
    }

    return createElement(previewComponent, previewProps);
  },
);

EditorPreviewContent.displayName = 'EditorPreviewContent';

export default EditorPreviewContent;
