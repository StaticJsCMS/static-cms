import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';

import type { FC } from 'react';

interface SuggestionLinkProps {
  href: string;
  children: string;
}

const SuggestionLink: FC<SuggestionLinkProps> = ({ href, children }) => {
  return (
    <MuiLink
      component={Link}
      href={href}
      color="primary"
      sx={{
        textDecoration: 'none',
        display: 'flex',
        paddingLeft: '8px',
        transition: 'gap 0.1s ease-in-out',
        gap: 0,
        '&:hover': {
          textDecoration: 'underline',
          gap: '4px',
        },
      }}
    >
      {children}
      <ChevronRightIcon fontSize="small" sx={{ marginTop: '1px', marginLeft: '2px' }} />
    </MuiLink>
  );
};

export default SuggestionLink;
