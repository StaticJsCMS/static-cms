import React, { useMemo } from 'react';

import ViewStyleControl from '../common/view-style/ViewStyleControl';
import FilterControl from './FilterControl';
import GroupControl from './GroupControl';
import MobileCollectionControls from './mobile/MobileCollectionControls';
import SortControl from './SortControl';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type {
  FilterMap,
  GroupMap,
  SortableField,
  SortDirection,
  SortMap,
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
  filter,
  group,
}: CollectionControlsProps) => {
  const showGroupControl = useMemo(
    () => Boolean(viewGroups && onGroupClick && group && viewGroups.length > 0),
    [group, onGroupClick, viewGroups],
  );

  const showFilterControl = useMemo(
    () => Boolean(viewFilters && onFilterClick && filter && viewFilters.length > 0),
    [filter, onFilterClick, viewFilters],
  );

  const showSortControl = useMemo(
    () => Boolean(sortableFields && onSortClick && sort && sortableFields.length > 0),
    [onSortClick, sort, sortableFields],
  );

  return (
    <>
      <div
        className="
          flex
          items-center
          relative
          z-20
          w-full
          justify-end
          gap-1.5
          sm:w-auto
          sm:justify-normal
          lg:gap-2
        "
      >
        <ViewStyleControl viewStyle={viewStyle} onChangeViewStyle={onChangeViewStyle} />
        {showGroupControl || showFilterControl || showFilterControl ? (
          <MobileCollectionControls
            showFilterControl={showFilterControl}
            viewFilters={viewFilters}
            onFilterClick={onFilterClick}
            filter={filter}
            showGroupControl={showGroupControl}
            viewGroups={viewGroups}
            onGroupClick={onGroupClick}
            group={group}
            showSortControl={showSortControl}
            fields={sortableFields}
            sort={sort}
            onSortClick={onSortClick}
          />
        ) : null}
        {showGroupControl ? (
          <GroupControl viewGroups={viewGroups} onGroupClick={onGroupClick} group={group} />
        ) : null}
        {showFilterControl ? (
          <FilterControl viewFilters={viewFilters} onFilterClick={onFilterClick} filter={filter} />
        ) : null}
        {showSortControl ? (
          <SortControl fields={sortableFields} sort={sort} onSortClick={onSortClick} />
        ) : null}
      </div>
    </>
  );
};

export default CollectionControls;
