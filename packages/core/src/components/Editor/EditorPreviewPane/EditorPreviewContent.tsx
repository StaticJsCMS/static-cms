import { createElement, memo } from 'react';

import type {
  ObjectValue,
  TemplatePreviewComponent,
  TemplatePreviewProps,
  UnknownField,
} from '@staticcms/core/interface';
import type { FC } from 'react';

interface EditorPreviewContentProps {
  previewComponent?: TemplatePreviewComponent<ObjectValue, UnknownField>;
  previewProps: TemplatePreviewProps<ObjectValue>;
}

const EditorPreviewContent: FC<EditorPreviewContentProps> = memo(
  ({ previewComponent, previewProps }: EditorPreviewContentProps) => {
    if (!previewComponent) {
      return null;
    }

    return createElement(previewComponent, previewProps);
  },
);

EditorPreviewContent.displayName = 'EditorPreviewContent';

export default EditorPreviewContent;
