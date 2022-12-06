import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { DocsGroupLink } from '../../interface';

export interface DocsLeftNavGroupProps {
  name: string;
  links: DocsGroupLink[];
}

const DocsLeftNavGroup = ({ name, links }: DocsLeftNavGroupProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { asPath } = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={name} />
        <ExpandLessIcon
          sx={{
            transform: `rotateZ(${open ? 0 : 90}deg)`,
            transition: theme.transitions.create(['transform']),
          }}
        />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {links.map(link => {
            const url = `/docs/${link.slug}`;
            const selected = asPath === url;
            return (
              <ListItemButton
                key={link.slug}
                component={Link}
                href={url}
                sx={{
                  pl: 4,
                }}
                selected={selected}
              >
                <ListItemText
                  primaryTypographyProps={{
                    color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
                    fontWeight: selected ? 600 : 400,
                  }}
                  primary={link.title}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default DocsLeftNavGroup;
