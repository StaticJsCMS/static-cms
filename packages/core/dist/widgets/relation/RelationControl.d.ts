import type { EntryData, RelationField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './RelationControl.css';
export declare const classes: Record<"values" | "root" | "error" | "disabled" | "required" | "loading" | "for-single-list", string>;
export interface HitOption {
    data: EntryData;
    value: string;
    label: string;
}
export interface Option {
    value: string;
    label: string;
}
declare const RelationControl: FC<WidgetControlProps<string | string[], RelationField>>;
export default RelationControl;
