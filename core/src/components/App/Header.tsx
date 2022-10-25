import { styled } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback, useEffect, useMemo } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import { logoutUser as logoutUserAction } from '../../actions/auth';
import { createNewEntry } from '../../actions/collections';
import { openMediaLibrary as openMediaLibraryAction } from '../../actions/mediaLibrary';
import { checkBackendStatus as checkBackendStatusAction } from '../../actions/status';
import { buttons, colors } from '../../components/UI/styles';
import { stripProtocol } from '../../lib/urlHelper';
import NavLink from '../UI/NavLink';
import SettingsDropdown from '../UI/SettingsDropdown';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { TranslatedProps } from '../../interface';
import type { RootState } from '../../store';

const StyledAppBar = styled(AppBar)`
  background-color: ${colors.foreground};
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

  &:hover,
  &:active,
  &:focus {
    color: ${colors.active};
  }
`;

const StyledSpacer = styled('div')`
  flex-grow: 1;
`;

const StyledAppHeaderActions = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({
  user,
  collections,
  logoutUser,
  openMediaLibrary,
  displayUrl,
  isTestRepo,
  t,
  showMediaButton,
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

  const handleCreatePostClick = useCallback((collectionName: string) => {
    createNewEntry(collectionName);
  }, []);

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

  const handleMediaClick = useCallback(() => {
    openMediaLibrary();
  }, [openMediaLibrary]);

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <Link to="/collections" component={NavLink} activeClassName={'header-link-active'}>
          <DescriptionIcon />
          {t('app.header.content')}
        </Link>
        {showMediaButton ? (
          <StyledButton onClick={handleMediaClick}>
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
              href="https://staticjscms.netlify.app/docs/test-backend"
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
            onLogoutClick={logoutUser}
          />
        </StyledAppHeaderActions>
      </StyledToolbar>
    </StyledAppBar>
  );
};

function mapStateToProps(state: RootState) {
  const { auth, config, collections, mediaLibrary } = state;
  const user = auth.user;
  const showMediaButton = mediaLibrary.showMediaButton;
  return {
    user,
    collections,
    displayUrl: config.config?.display_url,
    isTestRepo: config.config?.backend.name === 'test-repo',
    showMediaButton,
  };
}

const mapDispatchToProps = {
  checkBackendStatus: checkBackendStatusAction,
  openMediaLibrary: openMediaLibraryAction,
  logoutUser: logoutUserAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type HeaderProps = ConnectedProps<typeof connector>;

export default connector(translate()(Header) as ComponentType<HeaderProps>);
