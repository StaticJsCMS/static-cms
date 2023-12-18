import React from 'react';
import type { MarkdownField, WidgetPreviewProps } from '@staticcms/core/interface';
export interface WithShortcodeMdxComponentProps {
    previewProps: WidgetPreviewProps<string, MarkdownField>;
}
interface ShortcodeMdxComponentProps {
    shortcode: string;
    args: string[];
}
declare const withShortcodeMdxComponent: ({ previewProps }: WithShortcodeMdxComponentProps) => React.FC<ShortcodeMdxComponentProps>;
export default withShortcodeMdxComponent;
