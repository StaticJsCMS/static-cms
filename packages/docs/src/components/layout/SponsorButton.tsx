import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import type { SxProps, Theme } from '@mui/material/styles';

export interface SponsorButtonProps {
  sx?: SxProps<Theme>;
}

const SponsorButton = ({ sx }: SponsorButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      component="a"
      variant="outlined"
      color={theme.palette.mode === 'dark' ? 'secondary' : 'inherit'}
      href="https://github.com/sponsors/StaticJsCMS"
      title="Sponsor StaticJsCMS"
      startIcon={<FavoriteBorderIcon />}
      sx={sx}
    >
      Sponsor
    </Button>
  );
};

export default SponsorButton;
