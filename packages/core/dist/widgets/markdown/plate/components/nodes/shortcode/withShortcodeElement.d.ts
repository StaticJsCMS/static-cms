import React from 'react';
import type { MarkdownField, WidgetControlProps } from '@staticcms/core/interface';
import type { MdShortcodeElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
export interface WithShortcodeElementProps {
    controlProps: WidgetControlProps<string, MarkdownField>;
}
declare const withShortcodeElement: ({ controlProps }: WithShortcodeElementProps) => React.FC<PlateRenderElementProps<MdValue, MdShortcodeElement>>;
export default withShortcodeElement;
