import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, { useCallback } from 'react';
import { translate } from 'react-polyglot';

import { stripProtocol } from '../../lib/urlHelper';
import { colors, Icon } from '../../ui';

import type { TranslatedProps } from '../../interface';

const AvatarPlaceholderIcon = styled(Icon)`
  width: 32px;
  border-radius: 32px;
  height: 32px;
  color: #1e2532;
  background-color: ${colors.textFieldBorder};
`;

const AppHeaderSiteLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #7b8290;
  padding: 10px 16px;
`;

const AppHeaderTestRepoIndicator = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #7b8290;
  padding: 10px 16px;
`;

interface AvatarImageProps {
  imageUrl: string | undefined;
}

const AvatarImage = ({ imageUrl }: AvatarImageProps) => {
  return imageUrl ? (
    <Avatar sx={{ width: 32, height: 32 }} src={imageUrl} />
  ) : (
    <Avatar sx={{ width: 32, height: 32 }}>
      <AvatarPlaceholderIcon type="user" size="large" />
    </Avatar>
  );
};

interface SettingsDropdownProps {
  displayUrl?: string;
  isTestRepo?: boolean;
  imageUrl?: string;
  onLogoutClick: () => void;
}

const SettingsDropdown = ({
  displayUrl,
  isTestRepo,
  imageUrl,
  onLogoutClick,
  t,
}: TranslatedProps<SettingsDropdownProps>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <AppHeaderTestRepoIndicator
        href="https://staticjscms.github.io/static-cms/docs/test-backend"
        target="_blank"
        rel="noopener noreferrer"
      >
        Test Backend ↗
      </AppHeaderTestRepoIndicator>
      {isTestRepo && (
        <AppHeaderTestRepoIndicator
          href="https://staticjscms.github.io/static-cms/docs/test-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          Test Backend ↗
        </AppHeaderTestRepoIndicator>
      )}
      {displayUrl ? (
        <AppHeaderSiteLink href={displayUrl} target="_blank">
          {stripProtocol(displayUrl)}
        </AppHeaderSiteLink>
      ) : null}
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <AvatarImage imageUrl={imageUrl} />
        </IconButton>
      </Tooltip>
      <Button
        id="settings-button"
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'settings-button',
        }}
      >
        <MenuItem onClick={onLogoutClick}>{t('ui.settingsDropdown.logOut')}</MenuItem>
      </Menu>
    </div>
  );
};

export default translate()(SettingsDropdown);
