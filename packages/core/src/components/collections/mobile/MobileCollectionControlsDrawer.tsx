import Drawer from '@mui/material/Drawer';
import React, { useMemo } from 'react';

import FilterControl from '../FilterControl';
import GroupControl from '../GroupControl';
import SortControl from '../SortControl';

import type { FilterControlProps } from '../FilterControl';
import type { GroupControlProps } from '../GroupControl';
import type { SortControlProps } from '../SortControl';

const DRAWER_WIDTH = 240;

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

const MobileCollectionControlsDrawer = ({
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
}: MobileCollectionControlsDrawerProps) => {
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
      sx={{
        width: '80%',
        maxWidth: DRAWER_WIDTH,
        '& .MuiBackdrop-root': {
          width: '100%',
        },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '80%',
          maxWidth: DRAWER_WIDTH,
        },
      }}
    >
      <div
        onClick={onMobileOpenToggle}
        className="
          px-5
          py-4
          flex
          flex-col
          gap-6
          h-full
          w-full
          overflow-y-auto
          bg-white
          dark:bg-slate-800
          CMS_Scrollbar_root
        "
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
