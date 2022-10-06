import styled from '@emotion/styled';
import React from 'react';

import { lengths } from '../../ui';
import FilterControl from './FilterControl';
import GroupControl from './GroupControl';
import SortControl from './SortControl';
import ViewStyleControl from './ViewStyleControl';

import type { CollectionViewStyle } from '../../constants/collectionViews';
import type {
  FilterMap,
  GroupMap,
  SortableField,
  SortDirection,
  SortMap,
  TranslatedProps,
  ViewFilter,
  ViewGroup,
} from '../../interface';

const CollectionControlsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-top: 22px;
  width: ${lengths.topCardWidth};
  max-width: 100%;

  & > div {
    margin-left: 6px;
  }
`;

interface CollectionControlsProps {
  viewStyle: CollectionViewStyle;
  onChangeViewStyle: (viewStyle: CollectionViewStyle) => void;
  sortableFields: SortableField[];
  onSortClick: (key: string, direction?: SortDirection) => Promise<void>;
  sort: SortMap | undefined;
  filter: Record<string, FilterMap>;
  viewFilters: ViewFilter[];
  onFilterClick: (filter: ViewFilter) => void;
  group: Record<string, GroupMap>;
  viewGroups: ViewGroup[];
  onGroupClick: (filter: ViewGroup) => void;
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
  return (
    <CollectionControlsContainer>
      <ViewStyleControl viewStyle={viewStyle} onChangeViewStyle={onChangeViewStyle} />
      {viewGroups.length > 0 && (
        <GroupControl viewGroups={viewGroups} onGroupClick={onGroupClick} t={t} group={group} />
      )}
      {viewFilters.length > 0 && (
        <FilterControl
          viewFilters={viewFilters}
          onFilterClick={onFilterClick}
          t={t}
          filter={filter}
        />
      )}
      {sortableFields.length > 0 && (
        <SortControl fields={sortableFields} sort={sort} onSortClick={onSortClick} />
      )}
    </CollectionControlsContainer>
  );
};

export default CollectionControls;
