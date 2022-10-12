import styled from '@emotion/styled';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback, useEffect, useMemo } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import { checkBackendStatus } from '../../actions/status';
import { stripProtocol } from '../../lib/urlHelper';
import { buttons, colors, Icon, zIndex } from '../../ui';
import NavLink from '../UI/NavLink';
import SettingsDropdown from '../UI/SettingsDropdown';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Collections, TranslatedProps, User } from '../../interface';

const StyledAppBar = styled(AppBar)`
  background-color: ${colors.foreground};
  z-index: ${zIndex.zIndex300};
`;

const StyledToolbar = styled(Toolbar)`
  gap: 12px;
`;

const StyledButton = styled(Button)`
  ${buttons.button};
  background: none;
  color: #7b8290;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  text-transform: none;
  gap: 2px;

  ${Icon} {
    margin-right: 4px;
    color: #b3b9c4;
  }

  &:hover,
  &:active,
  &:focus {
    color: ${colors.active};

    ${Icon} {
      color: ${colors.active};
    }
  }
`;

const StyledSpacer = styled.div`
  flex-grow: 1;
`;

const StyledAppHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Link to="/collections" component={NavLink} activeClassName={'header-link-active'}>
            <DescriptionIcon />
            {t('app.header.content')}
          </Link>
          {showMediaButton ? (
            <StyledButton onClick={openMediaLibrary}>
              <ImageIcon />
              {t('app.header.media')}
            </StyledButton>
          ) : null}
          <StyledSpacer />
          <StyledAppHeaderActions>
            {createableCollections.length > 0 && (
              <div key="quick-create">
                <Button
                  id="quick-create-button"
                  aria-controls={open ? 'quick-create-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  variant="contained"
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {t('app.header.quickAdd')}
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
            {isTestRepo && (
              <Button
                href="https://staticjscms.github.io/static-cms/docs/test-backend"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textTransform: 'none' }}
                endIcon={<OpenInNewIcon />}
              >
                Test Backend
              </Button>
            )}
            {displayUrl ? (
              <Button
                href={displayUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textTransform: 'none' }}
                endIcon={<OpenInNewIcon />}
              >
                {stripProtocol(displayUrl)}
              </Button>
            ) : null}
            <SettingsDropdown
              displayUrl={displayUrl}
              isTestRepo={isTestRepo}
              imageUrl={user?.avatar_url}
              onLogoutClick={onLogoutClick}
            />
          </StyledAppHeaderActions>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
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
