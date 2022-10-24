import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import type { DocsPage } from '../../interface';

export interface DocsLeftNavGroupProps {
  name: string;
  docPages: DocsPage[];
}

const DocsLeftNavGroup = ({ name, docPages }: DocsLeftNavGroupProps) => {
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
        <List component="div" disablePadding>
          {docPages.map(docPage => (
            <ListItemButton
              key={docPage.data.slug}
              href={`/docs/${docPage.data.slug}`}
              sx={{ pl: 4 }}
            >
              <ListItemText secondary={docPage.data.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default DocsLeftNavGroup;
