import { useMediaQuery } from '@mui/material';

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

export function useIsSmallScreen() {
  return useMediaQuery('(max-width: 1024px)');
}
