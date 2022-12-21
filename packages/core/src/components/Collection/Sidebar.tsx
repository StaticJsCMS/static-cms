import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';

import { searchCollections } from '@staticcms/core/actions/collections';
import { colors } from '@staticcms/core/components/UI/styles';
import { getAdditionalLinks, getIcon } from '@staticcms/core/lib/registry';
import NavLink from '../UI/NavLink';
import CollectionSearch from './CollectionSearch';
import NestedCollection from './NestedCollection';

import type { ReactNode } from 'react';
import type { Collection, Collections, TranslatedProps } from '@staticcms/core/interface';

const StyledSidebar = styled('div')`
  position: sticky;
  top: 88px;
  align-self: flex-start;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 0;
  margin-right: 12px;
`;

interface SidebarProps {
  collections: Collections;
  collection: Collection;
  isSearchEnabled: boolean;
  searchTerm: string;
  filterTerm: string;
}

const Sidebar = ({
  collections,
  collection,
  isSearchEnabled,
  searchTerm,
  t,
  filterTerm,
}: TranslatedProps<SidebarProps>) => {
  const collectionLinks = useMemo(
    () =>
      Object.values(collections)
        .filter(collection => collection.hide !== true)
        .map(collection => {
          const collectionName = collection.name;
          const iconName = collection.icon;
          let icon: ReactNode = <ArticleIcon />;
          if (iconName) {
            const StoredIcon = getIcon(iconName);
            if (StoredIcon) {
              icon = <StoredIcon />;
            }
          }

          if ('nested' in collection) {
            return (
              <li key={`nested-${collectionName}`}>
                <NestedCollection
                  collection={collection}
                  filterTerm={filterTerm}
                  data-testid={collectionName}
                />
              </li>
            );
          }

          return (
            <ListItem
              key={collectionName}
              to={`/collections/${collectionName}`}
              component={NavLink}
              disablePadding
              activeClassName="sidebar-active"
            >
              <ListItemButton>
                <StyledListItemIcon>{icon}</StyledListItemIcon>
                <ListItemText primary={collection.label} />
              </ListItemButton>
            </ListItem>
          );
        }),
    [collections, filterTerm],
  );

  const additionalLinks = useMemo(() => getAdditionalLinks(), []);
  const links = useMemo(
    () =>
      Object.values(additionalLinks).map(
        ({ id, title, data, options: { icon: iconName } = {} }) => {
          let icon: ReactNode = <ArticleIcon />;
          if (iconName) {
            const StoredIcon = getIcon(iconName);
            if (StoredIcon) {
              icon = <StoredIcon />;
            }
          }

          const content = (
            <>
              <StyledListItemIcon>{icon}</StyledListItemIcon>
              <ListItemText primary={title} />
            </>
          );

          return typeof data === 'string' ? (
            <ListItem
              key={title}
              href={data}
              component="a"
              disablePadding
              target="_blank"
              rel="noopener"
              sx={{
                color: colors.inactive,
                '&:hover': {
                  color: colors.active,
                  '.MuiListItemIcon-root': {
                    color: colors.active,
                  },
                },
              }}
            >
              <ListItemButton>{content}</ListItemButton>
            </ListItem>
          ) : (
            <ListItem
              key={title}
              to={`/page/${id}`}
              component={NavLink}
              disablePadding
              activeClassName="sidebar-active"
            >
              <ListItemButton>{content}</ListItemButton>
            </ListItem>
          );
        },
      ),
    [additionalLinks],
  );

  return (
    <StyledSidebar>
      <Card sx={{ minWidth: 275 }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography gutterBottom variant="h5" component="div">
            {t('collection.sidebar.collections')}
          </Typography>
          {isSearchEnabled && (
            <CollectionSearch
              searchTerm={searchTerm}
              collections={collections}
              collection={collection}
              onSubmit={(query: string, collection?: string) =>
                searchCollections(query, collection)
              }
            />
          )}
        </CardContent>
        <List>
          {collectionLinks}
          {links}
        </List>
      </Card>
    </StyledSidebar>
  );
};

export default translate()(Sidebar);
