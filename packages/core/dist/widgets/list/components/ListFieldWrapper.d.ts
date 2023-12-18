import type { FieldError, ListField } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';
export interface ListFieldWrapperProps {
    field: ListField;
    openLabel: string;
    closedLabel: string;
    children: ReactNode | ReactNode[];
    errors: FieldError[];
    hasChildErrors: boolean;
    hint?: string;
    forSingleList: boolean;
    disabled: boolean;
}
declare const ListFieldWrapper: FC<ListFieldWrapperProps>;
export default ListFieldWrapper;
