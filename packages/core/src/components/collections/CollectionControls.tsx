import React, { useMemo } from 'react';

import FilterControl from './FilterControl';
import GroupControl from './GroupControl';
import SortControl from './SortControl';
import ViewStyleControl from '../common/view-style/ViewStyleControl';
import MobileCollectionControls from './mobile/MobileCollectionControls';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type {
  FilterMap,
  GroupMap,
  SortableField,
  SortDirection,
  SortMap,
  TranslatedProps,
  ViewFilter,
  ViewGroup,
} from '@staticcms/core/interface';

interface CollectionControlsProps {
  viewStyle: ViewStyle;
  onChangeViewStyle: (viewStyle: ViewStyle) => void;
  sortableFields?: SortableField[];
  onSortClick?: (key: string, direction?: SortDirection) => Promise<void>;
  sort?: SortMap | undefined;
  filter?: Record<string, FilterMap>;
  viewFilters?: ViewFilter[];
  onFilterClick?: (filter: ViewFilter) => void;
  group?: Record<string, GroupMap>;
  viewGroups?: ViewGroup[];
  onGroupClick?: (filter: ViewGroup) => void;
}

const CollectionControls = ({
  viewStyle,
  onChangeViewStyle,
  sortableFields,
  onSortClick,
  sort,
  viewFilters,
  viewGroups,
  onFilterClick,
  onGroupClick,
  t,
  filter,
  group,
}: TranslatedProps<CollectionControlsProps>) => {
  const showGroupControl = useMemo(
    () => viewGroups && onGroupClick && group && viewGroups.length > 0,
    [group, onGroupClick, viewGroups],
  );

  const showFilterControl = useMemo(
    () => viewFilters && onFilterClick && filter && viewFilters.length > 0,
    [filter, onFilterClick, viewFilters],
  );

  const showSortControl = useMemo(
    () => sortableFields && onSortClick && sort && sortableFields.length > 0,
    [onSortClick, sort, sortableFields],
  );

  return (
    <div className="flex gap-2 items-center relative z-20 w-full justify-end sm:w-auto sm:justify-normal">
      <ViewStyleControl viewStyle={viewStyle} onChangeViewStyle={onChangeViewStyle} />
      {showGroupControl || showFilterControl || showFilterControl ? (
        <MobileCollectionControls />
      ) : null}
      {showGroupControl ? (
        <GroupControl viewGroups={viewGroups} onGroupClick={onGroupClick} t={t} group={group} />
      ) : null}
      {showFilterControl ? (
        <FilterControl
          viewFilters={viewFilters}
          onFilterClick={onFilterClick}
          t={t}
          filter={filter}
        />
      ) : null}
      {showSortControl ? (
        <SortControl fields={sortableFields} sort={sort} onSortClick={onSortClick} />
      ) : null}
    </div>
  );
};

export default CollectionControls;
