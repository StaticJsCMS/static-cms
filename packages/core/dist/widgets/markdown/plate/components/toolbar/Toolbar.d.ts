import type { Collection, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';
import './Toolbar.css';
export interface ToolbarProps {
    useMdx: boolean;
    collection: Collection<MarkdownField>;
    field: MarkdownField;
    disabled: boolean;
}
declare const Toolbar: FC<ToolbarProps>;
export default Toolbar;
