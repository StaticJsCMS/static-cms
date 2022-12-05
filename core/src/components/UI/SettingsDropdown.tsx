import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, { useCallback, useState } from 'react';
import { translate } from 'react-polyglot';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

interface AvatarImageProps {
  imageUrl: string | undefined;
}

const AvatarImage = ({ imageUrl }: AvatarImageProps) => {
  return imageUrl ? (
    <Avatar sx={{ width: 32, height: 32 }} src={imageUrl} />
  ) : (
    <Avatar sx={{ width: 32, height: 32 }}>
      <PersonIcon />
    </Avatar>
  );
};

interface SettingsDropdownProps {
  imageUrl?: string;
  onLogoutClick: () => void;
}

const SettingsDropdown = ({
  imageUrl,
  onLogoutClick,
  t,
}: TranslatedProps<SettingsDropdownProps>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
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
