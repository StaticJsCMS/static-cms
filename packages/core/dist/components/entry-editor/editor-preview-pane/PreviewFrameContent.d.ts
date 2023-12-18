import type { ObjectValue, TemplatePreviewComponent, TemplatePreviewProps, UnknownField } from '@staticcms/core/interface';
import type { FC } from 'react';
import './PreviewFrameContent.css';
export declare const classes: Record<"content" | "root", string>;
interface PreviewFrameContentProps {
    previewComponent: TemplatePreviewComponent<ObjectValue, UnknownField>;
    previewProps: Omit<TemplatePreviewProps<ObjectValue, UnknownField>, 'document' | 'window'>;
}
declare const PreviewFrameContent: FC<PreviewFrameContentProps>;
export default PreviewFrameContent;
