import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';
import { NavLink } from 'react-router-dom';

import { searchCollections } from '../../actions/collections';
import { transientOptions } from '../../lib';
import { getAdditionalLinks, getIcon } from '../../lib/registry';
import { colors, components, Icon } from '../../ui';
import CollectionSearch from './CollectionSearch';
import NestedCollection from './NestedCollection';

import type { ReactNode } from 'react';
import type { Collection, Collections, TranslatedProps } from '../../interface';

const styles = {
  sidebarNavLinkActive: css`
    color: ${colors.active};
    background-color: ${colors.activeBackground};
    border-left-color: #4863c6;
  `,
};

const SidebarContainer = styled.aside`
  ${components.card};
  width: 250px;
  padding: 8px 0 12px;
  position: fixed;
  max-height: calc(100vh - 112px);
  display: flex;
  flex-direction: column;
`;

const SidebarHeading = styled.h2`
  font-size: 23px;
  font-weight: 600;
  padding: 0;
  margin: 18px 12px 12px;
  color: ${colors.textLead};
`;

const SidebarNavList = styled.ul`
  margin: 16px 0 0;
  padding-left: 0;
  list-style: none;
  overflow: auto;
`;

interface SidebarNavLinkProps {
  $activeClassName: string;
}

const SidebarNavLink = styled(
  NavLink,
  transientOptions,
)<SidebarNavLinkProps>(
  ({ $activeClassName }) => `
    display: flex;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
    padding: 8px 12px;
    border-left: 2px solid #fff;
    z-index: -1;

    ${Icon} {
      margin-right: 0;
      flex-shrink: 0;
    }

    &:hover,
    &:active,
    &.${$activeClassName} {
      ${styles.sidebarNavLinkActive};
    }
  `,
);

const StyledAdditionalLink = styled.a`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  padding: 8px 12px;
  border-left: 2px solid #fff;
  z-index: -1;

  ${Icon} {
    margin-right: 0;
    flex-shrink: 0;
  }

  &:hover,
  &:active {
    ${styles.sidebarNavLinkActive};
  }
`;

const IconWrapper = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
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
          let icon: ReactNode = <Icon type="write" />;
          if (iconName) {
            const storedIcon = getIcon(iconName);
            if (storedIcon) {
              icon = storedIcon();
            }
          }

          if ('nested' in collection) {
            console.log('nested collectionName', `'nested-${collectionName}'`);
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

          console.log('collectionName', `'${collectionName}'`);

          return (
            <li key={collectionName}>
              <SidebarNavLink
                to={`/collections/${collectionName}`}
                $activeClassName="sidebar-active"
                data-testid={collectionName}
              >
                <>
                  {icon}
                  {collection.label}
                </>
              </SidebarNavLink>
            </li>
          );
        }),
    [collections, filterTerm],
  );

  const additionalLinks = useMemo(() => getAdditionalLinks(), []);
  const links = useMemo(
    () =>
      Object.values(additionalLinks).map(({ id, title, data, options: { iconName } = {} }) => {
        let icon: ReactNode = <Icon type="write" />;
        if (iconName) {
          const storedIcon = getIcon(iconName);
          if (storedIcon) {
            icon = storedIcon();
          }
        }

        const content = (
          <>
            <IconWrapper>{icon}</IconWrapper>
            {title}
          </>
        );

        console.log('title', `'${title}'`, additionalLinks);

        return (
          <li key={title}>
            {typeof data === 'string' ? (
              <StyledAdditionalLink href={data} target="_blank" rel="noopener">
                {content}
              </StyledAdditionalLink>
            ) : (
              <SidebarNavLink to={`/page/${id}`} $activeClassName="sidebar-active">
                {content}
              </SidebarNavLink>
            )}
          </li>
        );
      }),
    [additionalLinks],
  );

  return (
    <SidebarContainer>
      <SidebarHeading>{t('collection.sidebar.collections')}</SidebarHeading>
      {isSearchEnabled && (
        <CollectionSearch
          searchTerm={searchTerm}
          collections={collections}
          collection={collection}
          onSubmit={(query: string, collection?: string) => searchCollections(query, collection)}
        />
      )}
      <SidebarNavList>
        {collectionLinks}
        {links}
      </SidebarNavList>
    </SidebarContainer>
  );
};

export default translate()(Sidebar);
