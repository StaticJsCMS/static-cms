import React from 'react';
import type { GroupMap, ViewGroup } from '@staticcms/core/interface';
import './GroupControl.css';
export declare const classes: Record<"option" | "list" | "root" | "list-label" | "list-option" | "list-option-label" | "list-option-checked-icon" | "list-option-not-checked", string>;
export interface GroupControlProps {
    group: Record<string, GroupMap> | undefined;
    viewGroups: ViewGroup[] | undefined;
    variant?: 'menu' | 'list';
    onGroupClick: ((viewGroup: ViewGroup) => void) | undefined;
}
declare const _default: React.FC<GroupControlProps>;
export default _default;
