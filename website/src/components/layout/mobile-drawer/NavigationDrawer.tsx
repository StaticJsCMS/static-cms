import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useMemo } from 'react';

import MobileNavItem from './MobileNavItem';
import Logo from '../Logo';

import type { MenuItem } from '../../../interface';

const DRAWER_WIDTH = 300;

const StyledDrawerContents = styled('div')`
  padding-top: 16px;
  text-align: center;
`;

const StyledLogoWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

interface NavigationDrawerProps {
  items: MenuItem[];
  mobileOpen: boolean;
  onMobileOpenToggle: () => void;
}

const NavigationDrawer = ({ items, mobileOpen, onMobileOpenToggle }: NavigationDrawerProps) => {
  const theme = useTheme();

  const iOS = useMemo(
    () => typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent),
    [],
  );

  const drawer = useMemo(
    () => (
      <StyledDrawerContents onClick={onMobileOpenToggle}>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.8)', pt: 2 }} />
        <List>
          {items.map(item => (
            <MobileNavItem key={`drawer-nav-item-${item.title}`} item={item} />
          ))}
        </List>
      </StyledDrawerContents>
    ),
    [items, onMobileOpenToggle],
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
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
        width: '80%',
        maxWidth: DRAWER_WIDTH,
        '& .MuiBackdrop-root': {
          width: '100%',
        },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '80%',
          maxWidth: DRAWER_WIDTH,
          background: '#2e3034',
        },
        '& .MuiListSubheader-root': {
          textAlign: 'left',
        },
      }}
    >
      {drawer}
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
