import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, { useMemo } from 'react';

import SidebarContent from './SidebarContent';

const DRAWER_WIDTH = 320;

interface NavigationDrawerProps {
  mobileOpen: boolean;
  onMobileOpenToggle: () => void;
}

const NavigationDrawer = ({ mobileOpen, onMobileOpenToggle }: NavigationDrawerProps) => {
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
        <SidebarContent />
      </div>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
