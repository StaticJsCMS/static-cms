import React from 'react';
import type { MarkdownField, WidgetControlProps } from '@staticcms/core/interface';
import './MarkdownControl.css';
export interface WithMarkdownControlProps {
    useMdx: boolean;
}
declare const withMarkdownControl: ({ useMdx }: WithMarkdownControlProps) => React.FC<WidgetControlProps<string, MarkdownField, import("@staticcms/core/interface").ObjectValue>>;
export default withMarkdownControl;
