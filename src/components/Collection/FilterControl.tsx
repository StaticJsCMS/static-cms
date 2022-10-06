import React from 'react';
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hasActiveFilter = Object.values(filter).find(f => f.active === true);

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
        t('collection.collectionTop.filterBy')
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
        return (
        <MenuItem onClick={() => onFilterClick(viewFilter)}>Profile</MenuItem>
      })}
      </Menu>
    </div>



    <Dropdown
      renderButton={() => {
        return (
        );
      }}
      closeOnSelection={false}
      dropdownTopOverlap="30px"
      dropdownPosition="left"
    >
      {viewFilters.map(viewFilter => {
        return (
          <DropdownCheckedItem
            key={viewFilter.id}
            label={viewFilter.label}
            id={viewFilter.id}
            checked={filter.getIn([viewFilter.id, 'active'], false)}
            onClick={() => onFilterClick(viewFilter)}
          />
        );
      })}
    </Dropdown>
  );
};

export default translate()(FilterControl);
