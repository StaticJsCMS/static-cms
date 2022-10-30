import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import MobileNavLink from './MobileNavLink';

import type { MouseEvent } from 'react';
import type { MenuItem, MenuLink, MenuLinkGroup } from '../../../interface';

interface MobileNavItemProps {
  item: MenuItem;
}

function isMenuLinkGroup(link: MenuItem): link is MenuLinkGroup {
  return 'menuLinks' in link;
}

const MobileNavItem = ({ item }: MobileNavItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOnClick = useCallback(
    (link: MenuItem | MenuLink) => (event: MouseEvent) => {
      if (isMenuLinkGroup(link)) {
        event.stopPropagation();
        setOpen(!open);
        return;
      }

      setOpen(false);
    },
    [open],
  );

  const url = useMemo(() => {
    if (isMenuLinkGroup(item)) {
      return undefined;
    }

    return item.url;
  }, [item]);

  const wrappedLink = useMemo(() => {
    const button = (
      <ListItemButton
        key={`drawer-nav-item-${item.title}`}
        sx={{ color: '#fde7a5', textTransform: 'uppercase', '&:hover': { color: '#fde7a5' } }}
        onClick={handleOnClick(item)}
      >
        <ListItemText primary={item.title} />
        {isMenuLinkGroup(item) ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
    );

    if (!url) {
      return button;
    }

    return (
      <Link target={url?.startsWith('http') ? '_blank' : undefined} href={url}>
        {button}
      </Link>
    );
  }, [handleOnClick, item, open, url]);

  return (
    <>
      {wrappedLink}
      {isMenuLinkGroup(item) ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.menuLinks.map(link => (
              <MobileNavLink
                key={`drawer-nav-item-${item.title}-sub-item-${link.title}`}
                link={link}
                onClick={handleOnClick(link)}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};

export default MobileNavItem;
