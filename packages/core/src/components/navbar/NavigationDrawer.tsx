import Drawer from '@mui/material/Drawer';
import React, { useMemo } from 'react';

import SidebarContent from './SidebarContent';

const DRAWER_WIDTH = 320;

interface NavigationDrawerProps {
  mobileOpen: boolean;
  onMobileOpenToggle: () => void;
}

const NavigationDrawer = ({ mobileOpen, onMobileOpenToggle }: NavigationDrawerProps) => {
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
    </Drawer>
  );
};

export default NavigationDrawer;
