import type { ObjectValue, TemplatePreviewComponent, TemplatePreviewProps, UnknownField } from '@staticcms/core/interface';
import type { FC } from 'react';
interface EditorPreviewContentProps {
    previewComponent?: TemplatePreviewComponent<ObjectValue, UnknownField>;
    previewProps: TemplatePreviewProps<ObjectValue>;
}
declare const EditorPreviewContent: FC<EditorPreviewContentProps>;
export default EditorPreviewContent;
