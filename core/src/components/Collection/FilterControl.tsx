import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';

import type { FilterMap, TranslatedProps, ViewFilter } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

interface FilterControlProps {
  filter: Record<string, FilterMap>;
  viewFilters: ViewFilter[];
  onFilterClick: (viewFilter: ViewFilter) => void;
}

const FilterControl = ({
  viewFilters,
  t,
  onFilterClick,
  filter,
}: TranslatedProps<FilterControlProps>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const anyActive = useMemo(() => Object.keys(filter).some(key => filter[key]?.active), [filter]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant={anyActive ? 'contained' : 'outlined'}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t('collection.collectionTop.filterBy')}
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
        {viewFilters.map(viewFilter => {
          const checked = filter[viewFilter.id]?.active ?? false;
          const labelId = `filter-list-label-${viewFilter.label}`;
          return (
            <MenuItem
              key={viewFilter.id}
              onClick={() => onFilterClick(viewFilter)}
              sx={{ height: '36px' }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={viewFilter.label} />
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default translate()(FilterControl);
