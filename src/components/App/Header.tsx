import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useEffect, useMemo } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { checkBackendStatus } from '../../actions/status';
import { transientOptions } from '../../lib';
import { buttons, colors, Icon, lengths, shadows, zIndex } from '../../ui';
import { SettingsDropdown } from '../UI';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Collections, TranslatedProps, User } from '../../interface';

const styles = {
  buttonActive: css`
    color: ${colors.active};
  `,
};

const AppHeader = styled.header`
  ${shadows.dropMain};
  position: sticky;
  width: 100%;
  top: 0;
  background-color: ${colors.foreground};
  z-index: ${zIndex.zIndex300};
  height: ${lengths.topBarHeight};
`;

const AppHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 1200px;
  max-width: 1440px;
  padding: 0 12px;
  margin: 0 auto;
`;

interface AppHeaderButtonProps {
  $activeClassName?: string;
}

const AppHeaderButton = styled(
  'button',
  transientOptions,
)<AppHeaderButtonProps>(
  ({ $activeClassName }) => `
    ${buttons.button};
    background: none;
    color: #7b8290;
    font-family: inherit;
    font-size: 16px;
    font-weight: 500;
    display: inline-flex;
    padding: 16px 20px;
    align-items: center;

    ${Icon} {
      margin-right: 4px;
      color: #b3b9c4;
    }

    &:hover,
    &:active,
    &:focus {
      ${styles.buttonActive};

      ${Icon} {
        ${styles.buttonActive};
      }
    }

      &.${$activeClassName} {
        ${styles.buttonActive};

        ${Icon} {
          ${styles.buttonActive};
        }
      }
  `,
);

const AppHeaderNavLink = AppHeaderButton.withComponent(NavLink);

const AppHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
`;

const AppHeaderNavList = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;
`;

const Header = ({
  user,
  collections,
  onLogoutClick,
  openMediaLibrary,
  displayUrl,
  isTestRepo,
  t,
  showMediaButton,
  onCreateEntryClick,
  checkBackendStatus,
}: TranslatedProps<HeaderProps>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCreatePostClick = useCallback(
    (collectionName: string) => {
      if (onCreateEntryClick) {
        onCreateEntryClick(collectionName);
      }
    },
    [onCreateEntryClick],
  );

  const createableCollections = useMemo(
    () => Object.values(collections).filter(collection => collection.create),
    [collections],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkBackendStatus();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [checkBackendStatus]);

  return (
    <AppHeader>
      <AppHeaderContent>
        <nav>
          <AppHeaderNavList>
            <li>
              <AppHeaderNavLink
                to="/collections"
                $activeClassName="header-link-active"
                className={navData => (navData.isActive ? 'header-link-active' : '')}
              >
                <Icon type="page" />
                {t('app.header.content')}
              </AppHeaderNavLink>
            </li>
            {showMediaButton && (
              <li>
                <AppHeaderButton onClick={openMediaLibrary}>
                  <Icon type="media-alt" />
                  {t('app.header.media')}
                </AppHeaderButton>
              </li>
            )}
          </AppHeaderNavList>
        </nav>
        <AppHeaderActions>
          {createableCollections.length > 0 && (
            <div key="quick-create">
              <Button
                id="quick-create-button"
                aria-controls={open ? 'quick-create-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button>
              <Menu
                id="quick-create-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'quick-create-button',
                }}
              >
                {createableCollections.map(collection => (
                  <MenuItem
                    key={collection.name}
                    onClick={() => handleCreatePostClick(collection.name)}
                  >
                    {collection.label_singular || collection.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
          <SettingsDropdown
            displayUrl={displayUrl}
            isTestRepo={isTestRepo}
            imageUrl={user?.avatar_url}
            onLogoutClick={onLogoutClick}
          />
        </AppHeaderActions>
      </AppHeaderContent>
    </AppHeader>
  );
};

const mapDispatchToProps = {
  checkBackendStatus,
};

export interface HeaderOwnProps {
  user: User;
  collections: Collections;
  onCreateEntryClick: (collectionName: string) => void;
  onLogoutClick: () => void;
  openMediaLibrary: () => void;
  displayUrl?: string;
  isTestRepo?: boolean;
  showMediaButton?: boolean;
}

const connector = connect(null, mapDispatchToProps);
export type HeaderProps = HeaderOwnProps & ConnectedProps<typeof connector>;

export default connector(translate()(Header) as ComponentType<HeaderProps>);
