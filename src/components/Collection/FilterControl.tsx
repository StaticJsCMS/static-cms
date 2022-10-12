import Check from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback } from 'react';
import { translate } from 'react-polyglot';

import type { FilterMap, TranslatedProps, ViewFilter } from '../../interface';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // const hasActiveFilter = useMemo(
  //   () => Object.values(filter).find(f => f.active === true),
  //   [filter],
  // );

  // TODO Fix active filter
  // <ControlButton active={hasActiveFilter} title={t('collection.collectionTop.filterBy')} />
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
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
          return (
            <MenuItem key={viewFilter.id} onClick={() => onFilterClick(viewFilter)}>
              {checked ? (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              ) : null}
              {viewFilter.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default translate()(FilterControl);
