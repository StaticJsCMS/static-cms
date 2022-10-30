import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';

import MobileNavLink from './MobileNavLink';

import type { MouseEvent } from 'react';
import type { MenuItem, MenuLink, MenuLinkGroup } from '../../../interface';

interface MobileNavItemProps {
  item: MenuItem;
}

function isMenuLinkGroup(link: MenuItem): link is MenuLinkGroup {
  return 'groups' in link;
}

const MobileNavItem = ({ item }: MobileNavItemProps) => {
  const theme = useTheme();

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
        onClick={handleOnClick(item)}
      >
        <ListItemText primary={item.title} />
        {isMenuLinkGroup(item) ? (
          <ExpandLessIcon
            sx={{
              transform: `rotateZ(${open ? 0 : 90}deg)`,
              transition: theme.transitions.create(['transform']),
            }}
          />
        ) : null}
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
  }, [handleOnClick, item, open, theme.transitions, url]);

  return (
    <>
      {wrappedLink}
      {isMenuLinkGroup(item) ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {item.groups.map(group => (
            <List
              key={group.title}
              component="div"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {group.title}
                </ListSubheader>
              }
              disablePadding
            >
              {group.links.map(link => (
                <MobileNavLink
                  key={`drawer-nav-item-${item.title}-sub-item-${link.title}`}
                  link={link}
                  onClick={handleOnClick(link)}
                />
              ))}
            </List>
          ))}
        </Collapse>
      ) : null}
    </>
  );
};

export default MobileNavItem;
