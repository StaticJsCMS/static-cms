import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback } from 'react';
import { translate } from 'react-polyglot';

import type { GroupMap, TranslatedProps, ViewGroup } from '../../interface';

interface GroupControlProps {
  group: Record<string, GroupMap>;
  viewGroups: ViewGroup[];
  onGroupClick: (viewGroup: ViewGroup) => void;
}

const GroupControl = ({ viewGroups, t, onGroupClick }: TranslatedProps<GroupControlProps>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // TODO ACTIVE
  // const hasActiveGroup = useMemo(() => Object.values(group).find(f => f.active === true), [group]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t('collection.collectionTop.groupBy')}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {viewGroups.map(viewGroup => (
          /* TODO: isActive={group.getIn([viewGroup.id, 'active'], false)} */
          <MenuItem key={viewGroup.id} onClick={() => onGroupClick(viewGroup)}>
            {viewGroup.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default translate()(GroupControl);
