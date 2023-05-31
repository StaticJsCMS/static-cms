import { FilterList as FilterListIcon } from '@styled-icons/material/FilterList';
import React, { useCallback, useState } from 'react';

import IconButton from '../../common/button/IconButton';
import MobileCollectionControlsDrawer from './MobileCollectionControlsDrawer';

import type { FC } from 'react';
import type { FilterControlProps } from '../FilterControl';
import type { GroupControlProps } from '../GroupControl';
import type { SortControlProps } from '../SortControl';

export type MobileCollectionControlsProps = Omit<FilterControlProps, 'variant'> &
  Omit<GroupControlProps, 'variant'> &
  Omit<SortControlProps, 'variant'> & {
    showGroupControl: boolean;
    showFilterControl: boolean;
    showSortControl: boolean;
  };

const MobileCollectionControls: FC<MobileCollectionControlsProps> = props => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => {
    setMobileOpen(old => !old);
  }, []);

  return (
    <>
      <IconButton className="flex lg:hidden" variant="text" onClick={toggleMobileMenu}>
        <FilterListIcon className="w-5 h-5" />
      </IconButton>
      <MobileCollectionControlsDrawer
        {...props}
        mobileOpen={mobileOpen}
        onMobileOpenToggle={toggleMobileMenu}
      />
    </>
  );
};

export default MobileCollectionControls;
