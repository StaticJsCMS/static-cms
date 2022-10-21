import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button/Button';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

import type { GroupMap, TranslatedProps, ViewGroup } from '../../interface';

const StyledMenuIconWrapper = styled('div')`
  width: 32px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface GroupControlProps {
  group: Record<string, GroupMap>;
  viewGroups: ViewGroup[];
  onGroupClick: (viewGroup: ViewGroup) => void;
}

const GroupControl = ({
  viewGroups,
  group,
  t,
  onGroupClick,
}: TranslatedProps<GroupControlProps>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const activeGroup = useMemo(() => Object.values(group).find(f => f.active === true), [group]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant={activeGroup ? 'contained' : 'outlined'}
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
          <MenuItem key={viewGroup.id} onClick={() => onGroupClick(viewGroup)}>
            <ListItemText>{viewGroup.label}</ListItemText>
            <StyledMenuIconWrapper>
              {viewGroup.id === activeGroup?.id ? <CheckIcon fontSize="small" /> : null}
            </StyledMenuIconWrapper>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default translate()(GroupControl);
