import type { ValueOrNestedValue } from '@staticcms/core/interface';
import type { FC } from 'react';
export interface DataProps {
    path: string;
    value: ValueOrNestedValue;
}
declare const Data: FC<DataProps>;
export default Data;
