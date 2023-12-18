import type { Collection, Entry, MarkdownField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { MdValue } from './plateTypes';
export interface PlateEditorProps {
    initialValue: MdValue;
    collection: Collection<MarkdownField>;
    entry: Entry;
    field: MarkdownField;
    useMdx: boolean;
    controlProps: WidgetControlProps<string, MarkdownField>;
    onChange: (value: MdValue) => void;
    onFocus: () => void;
    onBlur: () => void;
}
declare const PlateEditor: FC<PlateEditorProps>;
export default PlateEditor;
