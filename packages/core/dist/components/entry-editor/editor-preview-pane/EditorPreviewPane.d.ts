import React from 'react';
import type { EditorSize } from '@staticcms/core/constants/views';
import type { Collection, Entry, Field } from '@staticcms/core/interface';
import './EditorPreviewPane.css';
export declare const classes: Record<"root" | "frame" | "compact" | "inline" | "show-mobile-preview" | "live-preview", string>;
export interface EditorPreviewPaneProps {
    collection: Collection;
    fields: Field[];
    entry: Entry;
    previewInFrame: boolean;
    livePreviewUrlTemplate: string | undefined;
    editorSize: EditorSize;
    showMobilePreview: boolean;
}
declare const _default: React.FC<EditorPreviewPaneProps>;
export default _default;
