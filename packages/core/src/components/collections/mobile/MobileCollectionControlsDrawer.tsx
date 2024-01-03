import Drawer from '@mui/material/Drawer';
import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import FilterControl from '../FilterControl';
import GroupControl from '../GroupControl';
import SortControl from '../SortControl';
import mobileCollectionControlsClasses from './MobileCollectionControls.classes';

import type { FC } from 'react';
import type { FilterControlProps } from '../FilterControl';
import type { GroupControlProps } from '../GroupControl';
import type { SortControlProps } from '../SortControl';

export type MobileCollectionControlsDrawerProps = Omit<FilterControlProps, 'variant'> &
  Omit<GroupControlProps, 'variant'> &
  Omit<SortControlProps, 'variant'> & {
    mobileOpen: boolean;
    onMobileOpenToggle: () => void;
  } & {
    showGroupControl: boolean;
    showFilterControl: boolean;
    showSortControl: boolean;
  };

const MobileCollectionControlsDrawer: FC<MobileCollectionControlsDrawerProps> = ({
  mobileOpen,
  onMobileOpenToggle,
  showFilterControl,
  filter,
  viewFilters,
  onFilterClick,
  showGroupControl,
  group,
  viewGroups,
  onGroupClick,
  showSortControl,
  sort,
  fields,
  onSortClick,
}) => {
  const container = useMemo(
    () => (typeof window !== 'undefined' ? window.document.body : undefined),
    [],
  );

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={onMobileOpenToggle}
      anchor="right"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      slotProps={{ root: { className: mobileCollectionControlsClasses.root } }}
    >
      <div
        onClick={onMobileOpenToggle}
        className={classNames(mobileCollectionControlsClasses.content, 'CMS_Scrollbar_root')}
      >
        {showSortControl ? (
          <SortControl fields={fields} sort={sort} onSortClick={onSortClick} variant="list" />
        ) : null}
        {showFilterControl ? (
          <FilterControl
            viewFilters={viewFilters}
            onFilterClick={onFilterClick}
            filter={filter}
            variant="list"
          />
        ) : null}
        {showGroupControl ? (
          <GroupControl
            viewGroups={viewGroups}
            onGroupClick={onGroupClick}
            group={group}
            variant="list"
          />
        ) : null}
      </div>
    </Drawer>
  );
};

export default MobileCollectionControlsDrawer;
