import React from 'react';
import type { SortableField, SortDirection, SortMap } from '@staticcms/core/interface';
import './SortControl.css';
export declare const classes: Record<"option" | "list" | "root" | "list-label" | "list-option" | "list-option-label" | "list-option-sorted-icon" | "list-option-not-sorted", string>;
export interface SortControlProps {
    fields: SortableField[] | undefined;
    sort: SortMap | undefined;
    variant?: 'menu' | 'list';
    onSortClick: ((key: string, direction?: SortDirection) => Promise<void>) | undefined;
}
declare const _default: React.FC<SortControlProps>;
export default _default;
