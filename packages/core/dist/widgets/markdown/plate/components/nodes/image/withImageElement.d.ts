import React from 'react';
import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';
import type { MdImageElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
export interface WithImageElementProps {
    collection: Collection<MarkdownField>;
    entry: Entry;
    field: MarkdownField;
}
declare const withImageElement: ({ collection, entry, field }: WithImageElementProps) => React.FC<PlateRenderElementProps<MdValue, MdImageElement>>;
export default withImageElement;
