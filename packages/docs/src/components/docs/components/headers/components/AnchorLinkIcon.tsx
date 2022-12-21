import LinkIcon from '@mui/icons-material/Link';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

interface AnchorLinkIconProps {
  variant: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const AnchorLinkIcon = ({ variant }: AnchorLinkIconProps) => {
  const theme = useTheme();

  const color = useMemo(() => {
    if (variant === 'h2') {
      return theme.palette.primary.main;
    }

    if (variant === 'h3') {
      return theme.palette.text.primary;
    }

    return theme.palette.text.secondary;
  }, [
    theme.palette.primary.main,
    theme.palette.text.primary,
    theme.palette.text.secondary,
    variant,
  ]);

  return (
    <LinkIcon
      fontSize={variant === 'h2' ? 'medium' : 'small'}
      sx={{
        color,
        [theme.breakpoints.down('sm')]: {
          fontSize: '20px',
          height: '20px',
          width: '20px',
          marginTop: '2px',
        },
      }}
    />
  );
};

export default AnchorLinkIcon;
