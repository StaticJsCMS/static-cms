import type { Collection, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';
export interface InsertImageToolbarButtonProps {
    variant: 'button' | 'menu';
    currentValue?: {
        url: string;
        alt?: string;
    };
    collection: Collection<MarkdownField>;
    field: MarkdownField;
    disabled: boolean;
}
declare const InsertImageToolbarButton: FC<InsertImageToolbarButtonProps>;
export default InsertImageToolbarButton;
