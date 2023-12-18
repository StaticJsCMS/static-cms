import React from 'react';
import type { FilterMap, ViewFilter } from '@staticcms/core/interface';
import './FilterControl.css';
export declare const classes: Record<"filter" | "root" | "filter-label" | "list-root" | "list-label" | "list-filter" | "list-filter-label", string>;
export interface FilterControlProps {
    filter: Record<string, FilterMap> | undefined;
    viewFilters: ViewFilter[] | undefined;
    variant?: 'menu' | 'list';
    onFilterClick: ((viewFilter: ViewFilter) => void) | undefined;
}
declare const _default: React.FC<FilterControlProps>;
export default _default;
