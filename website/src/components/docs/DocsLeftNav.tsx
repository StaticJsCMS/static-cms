import List from '@mui/material/List';

import DocsLeftNavGroup from './DocsLeftNavGroup';

import type { DocsPage } from '../../interface';

export interface DocsLeftNavProps {
  groupedDocPages: Record<string, DocsPage[]>;
}

const DocsLeftNav = ({ groupedDocPages }: DocsLeftNavProps) => {
  return (
    <List
      component="nav"
      aria-labelledby="docs-left-nav"
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'fixed',
        left: 0,
        top: '72px',
        bottom: 0,
        overflowY: 'auto',
      }}
    >
      {Object.keys(groupedDocPages).map(group => (
        <DocsLeftNavGroup key={group} name={group} docPages={groupedDocPages[group]} />
      ))}
    </List>
  );
};

export default DocsLeftNav;
