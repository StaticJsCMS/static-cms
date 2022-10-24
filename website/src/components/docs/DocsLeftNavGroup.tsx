import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';

import type { DocsGroupLink } from '../../interface';

export interface DocsLeftNavGroupProps {
  name: string;
  links: DocsGroupLink[];
}

const DocsLeftNavGroup = ({ name, links }: DocsLeftNavGroupProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

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
          {links.map(link => (
            <Link key={link.slug} href={`/docs/${link.slug}`}>
              <ListItemButton href={`/docs/${link.slug}`} sx={{ pl: 4 }}>
                <ListItemText
                  primaryTypographyProps={{ color: 'text.secondary' }}
                  primary={link.title}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default DocsLeftNavGroup;
