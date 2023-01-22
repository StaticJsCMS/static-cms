import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import BetaImage from '../../docs/BetaImage';

import type { MouseEvent } from 'react';
import type { MenuLink } from '../../../interface';

interface MobileNavLinkProps {
  link: MenuLink;
  onClick: (event: MouseEvent) => void;
}

const MobileNavLink = ({ link, onClick }: MobileNavLinkProps) => {
  const { title, url, beta = false } = link;
  const { asPath } = useRouter();

  const selected = useMemo(() => {
    return asPath === url;
  }, [asPath, url]);

  return (
    <ListItemButton
      component={Link}
      href={url}
      target={url.startsWith('http') ? '_blank' : undefined}
      sx={{ paddingLeft: '24px', paddingTop: '4px', paddingBottom: '4px', width: '100%' }}
      onClick={onClick}
      selected={selected}
    >
      <ListItemText
        primary={
          <>
            {title}
            {beta ? <BetaImage /> : null}
          </>
        }
        primaryTypographyProps={{
          sx: { display: 'flex', alignItems: 'center', gap: '8px' },
        }}
      />
    </ListItemButton>
  );
};

export default MobileNavLink;
