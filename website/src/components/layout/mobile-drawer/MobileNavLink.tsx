import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

import type { MouseEvent } from 'react';
import type { MenuLink } from '../../../interface';

interface MobileNavLinkProps {
  link: MenuLink;
  onClick: (event: MouseEvent) => void;
}

const MobileNavLink = ({ link, onClick }: MobileNavLinkProps) => {
  const { title, url } = link;

  return (
    <Link href={url} target={url.startsWith('http') ? '_blank' : undefined}>
      <ListItemButton
        sx={{ paddingLeft: '24px', paddingTop: '4px', paddingBottom: '4px' }}
        onClick={onClick}
      >
        <ListItemText primary={title} />
      </ListItemButton>
    </Link>
  );
};

export default MobileNavLink;
