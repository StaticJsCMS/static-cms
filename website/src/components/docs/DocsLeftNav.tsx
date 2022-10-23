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
        position: 'absolute',
        left: 0,
        height: '100%',
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
