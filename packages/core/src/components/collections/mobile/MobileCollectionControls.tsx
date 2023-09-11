import { FilterList as FilterListIcon } from '@styled-icons/material/FilterList';
import React, { useCallback, useState } from 'react';

import IconButton from '../../common/button/IconButton';
import mobileCollectionControlsClasses from './MobileCollectionControls.classes';
import MobileCollectionControlsDrawer from './MobileCollectionControlsDrawer';

import type { FC } from 'react';
import type { FilterControlProps } from '../FilterControl';
import type { GroupControlProps } from '../GroupControl';
import type { SortControlProps } from '../SortControl';

import './MobileCollectionControls.css';

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
      <IconButton
        className={mobileCollectionControlsClasses.toggle}
        variant="text"
        onClick={toggleMobileMenu}
      >
        <FilterListIcon className={mobileCollectionControlsClasses['toggle-icon']} />
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
