import type { FieldError, ObjectField } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';
export interface ObjectFieldWrapperProps {
    field: ObjectField;
    openLabel: string;
    closedLabel: string;
    children: ReactNode | ReactNode[];
    errors: FieldError[];
    hasChildErrors: boolean;
    hint?: string;
    disabled: boolean;
    forSingleList: boolean;
}
declare const ObjectFieldWrapper: FC<ObjectFieldWrapperProps>;
export default ObjectFieldWrapper;
