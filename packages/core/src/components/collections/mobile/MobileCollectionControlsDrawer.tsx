import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, { useMemo } from 'react';

import FilterControl from '../FilterControl';
import GroupControl from '../GroupControl';

import type { FilterControlProps } from '../FilterControl';
import type { GroupControlProps } from '../GroupControl';

const DRAWER_WIDTH = 240;

export type MobileCollectionControlsDrawerProps = Omit<FilterControlProps, 'variant'> &
  Omit<GroupControlProps, 'variant'> & {
    mobileOpen: boolean;
    onMobileOpenToggle: () => void;
  };

const MobileCollectionControlsDrawer = ({
  mobileOpen,
  onMobileOpenToggle,
  filter,
  viewFilters,
  onFilterClick,
  group,
  viewGroups,
  onGroupClick,
}: MobileCollectionControlsDrawerProps) => {
  const iOS = useMemo(
    () => typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent),
    [],
  );

  const container = useMemo(
    () => (typeof window !== 'undefined' ? window.document.body : undefined),
    [],
  );

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      container={container}
      variant="temporary"
      open={mobileOpen}
      onOpen={onMobileOpenToggle}
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
      <div onClick={onMobileOpenToggle} className="w-full h-full">
        <FilterControl
          filter={filter}
          viewFilters={viewFilters}
          onFilterClick={onFilterClick}
          variant="list"
        />
        <GroupControl
          group={group}
          viewGroups={viewGroups}
          onGroupClick={onGroupClick}
          variant="list"
        />
      </div>
    </SwipeableDrawer>
  );
};

export default MobileCollectionControlsDrawer;
