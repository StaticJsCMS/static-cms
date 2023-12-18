import type { ListField, ValueOrNestedValue, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './ListControl.css';
export declare enum ListValueType {
    MULTIPLE = 0,
    MIXED = 1,
    DELIMITED = 2
}
declare const ListControl: FC<WidgetControlProps<ValueOrNestedValue[], ListField>>;
export default ListControl;
