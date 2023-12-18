import type { FC } from 'react';
import type { FilterControlProps } from '../FilterControl';
import type { GroupControlProps } from '../GroupControl';
import type { SortControlProps } from '../SortControl';
import './MobileCollectionControls.css';
export type MobileCollectionControlsProps = Omit<FilterControlProps, 'variant'> & Omit<GroupControlProps, 'variant'> & Omit<SortControlProps, 'variant'> & {
    showGroupControl: boolean;
    showFilterControl: boolean;
    showSortControl: boolean;
};
declare const MobileCollectionControls: FC<MobileCollectionControlsProps>;
export default MobileCollectionControls;
