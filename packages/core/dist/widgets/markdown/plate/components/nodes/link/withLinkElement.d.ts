import React from 'react';
import type { Collection, MarkdownField } from '@staticcms/core/interface';
import type { MdLinkElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import './LinkElement.css';
export interface WithLinkElementProps {
    collection: Collection<MarkdownField>;
    field: MarkdownField;
}
declare const withLinkElement: ({ collection, field }: WithLinkElementProps) => React.FC<PlateRenderElementProps<MdValue, MdLinkElement>>;
export default withLinkElement;
