import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';

import { SortDirection } from '../../interface';

import type { SortableField, SortMap, TranslatedProps } from '../../interface';

function nextSortDirection(direction: SortDirection) {
  switch (direction) {
    case SortDirection.Ascending:
      return SortDirection.Descending;
    case SortDirection.Descending:
      return SortDirection.None;
    default:
      return SortDirection.Ascending;
  }
}

const sortIconDirections: Record<string, string> = {
  [SortDirection.Ascending]: 'up',
  [SortDirection.Descending]: 'down',
};

// TODO Remove?
function sortIconProps(sortDir: SortDirection) {
  return {
    icon: 'chevron',
    iconDirection: sortIconDirections[sortDir],
    iconSmall: true,
  };
}

interface SortControlProps {
  fields: SortableField[];
  onSortClick: (key: string, direction?: SortDirection) => Promise<void>;
  sort: SortMap | undefined;
}

const SortControl = ({ t, fields, onSortClick, sort }: TranslatedProps<SortControlProps>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const hasActiveSort = useMemo(
    () => Boolean(Object.values(sort ?? {}).find(s => s.direction !== SortDirection.None)),
    [sort],
  );

  // TODO Fix button active
  // <ControlButton active={hasActiveSort} title={t('collection.collectionTop.sortBy')} />
  return (
    <div>
      <Button
        id="sort-button"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {t('collection.collectionTop.sortBy')}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
      >
        {fields.map(field => {
          const sortDir = sort?.[field.name].direction ?? SortDirection.None;
          const isActive = sortDir && sortDir !== SortDirection.None;
          const nextSortDir = nextSortDirection(sortDir);
          // TODO Fix active
          // isActive={isActive}
          // {...(isActive && sortIconProps(sortDir))}
          return (
            <MenuItem key={field.name} onClick={() => onSortClick(field.name, nextSortDir)}>
              {field.label ?? field.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default translate()(SortControl);
