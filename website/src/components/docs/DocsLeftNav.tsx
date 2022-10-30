import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';

import DocsLeftNavGroup from './DocsLeftNavGroup';

import type { DocsGroup } from '../../interface';

export interface DocsLeftNavProps {
  docsGroups: DocsGroup[];
}

const DocsLeftNav = ({ docsGroups }: DocsLeftNavProps) => {
  const theme = useTheme();

  return (
    <List
      component="nav"
      aria-labelledby="docs-left-nav"
      sx={{
        width: '100%',
        maxWidth: 280,
        bgcolor: 'background.paper',
        position: 'fixed',
        left: 0,
        top: '72px',
        bottom: 0,
        overflowY: 'auto',
        paddingBottom: '24px',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }}
      dense
    >
      {docsGroups.map(group => (
        <DocsLeftNavGroup key={group.name} name={group.title} links={group.links} />
      ))}
    </List>
  );
};

export default DocsLeftNav;
