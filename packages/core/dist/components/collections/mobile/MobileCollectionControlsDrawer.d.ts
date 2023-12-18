import type { FilterControlProps } from '../FilterControl';
import type { GroupControlProps } from '../GroupControl';
import type { SortControlProps } from '../SortControl';
export type MobileCollectionControlsDrawerProps = Omit<FilterControlProps, 'variant'> & Omit<GroupControlProps, 'variant'> & Omit<SortControlProps, 'variant'> & {
    mobileOpen: boolean;
    onMobileOpenToggle: () => void;
} & {
    showGroupControl: boolean;
    showFilterControl: boolean;
    showSortControl: boolean;
};
declare const MobileCollectionControlsDrawer: ({ mobileOpen, onMobileOpenToggle, showFilterControl, filter, viewFilters, onFilterClick, showGroupControl, group, viewGroups, onGroupClick, showSortControl, sort, fields, onSortClick, }: MobileCollectionControlsDrawerProps) => JSX.Element;
export default MobileCollectionControlsDrawer;
