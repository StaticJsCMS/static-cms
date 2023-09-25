import Drawer from '@mui/material/Drawer';
import React, { useMemo } from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import SidebarContent from './SidebarContent';

import type { FC } from 'react';

import './NavigationDrawer.css';

export const classes = generateClassNames('NavigationDrawer', ['root', 'content']);

const DRAWER_WIDTH = 320;

interface NavigationDrawerProps {
  mobileOpen: boolean;
  onMobileOpenToggle: () => void;
}

const NavigationDrawer: FC<NavigationDrawerProps> = ({ mobileOpen, onMobileOpenToggle }) => {
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
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      slotProps={{
        root: {
          className: classes.root,
        },
      }}
      sx={{
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
      <div onClick={onMobileOpenToggle} className={classes.content}>
        <SidebarContent />
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
