import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';

import {
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
  SORT_DIRECTION_NONE,
} from '@staticcms/core/constants';

import type {
  SortableField,
  SortDirection,
  SortMap,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

const StyledMenuIconWrapper = styled('div')`
  width: 32px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function nextSortDirection(direction: SortDirection) {
  switch (direction) {
    case SORT_DIRECTION_ASCENDING:
      return SORT_DIRECTION_DESCENDING;
    case SORT_DIRECTION_DESCENDING:
      return SORT_DIRECTION_NONE;
    default:
      return SORT_DIRECTION_ASCENDING;
  }
}

interface SortControlProps {
  fields: SortableField[];
  onSortClick: (key: string, direction?: SortDirection) => Promise<void>;
  sort: SortMap | undefined;
}

const SortControl = ({ t, fields, onSortClick, sort }: TranslatedProps<SortControlProps>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const selectedSort = useMemo(() => {
    if (!sort) {
      return { key: undefined, direction: undefined };
    }

    const sortValues = Object.values(sort);
    if (Object.values(sortValues).length < 1 || sortValues[0].direction === SORT_DIRECTION_NONE) {
      return { key: undefined, direction: undefined };
    }

    return sortValues[0];
  }, [sort]);

  return (
    <div>
      <Button
        id="sort-button"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant={selectedSort.key ? 'contained' : 'outlined'}
        endIcon={<KeyboardArrowDownIcon />}
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
          const sortDir = sort?.[field.name]?.direction ?? SORT_DIRECTION_NONE;
          const nextSortDir = nextSortDirection(sortDir);
          return (
            <MenuItem
              key={field.name}
              onClick={() => onSortClick(field.name, nextSortDir)}
              selected={field.name === selectedSort.key}
            >
              <ListItemText>{field.label ?? field.name}</ListItemText>
              <StyledMenuIconWrapper>
                {field.name === selectedSort.key ? (
                  selectedSort.direction === SORT_DIRECTION_ASCENDING ? (
                    <KeyboardArrowUpIcon fontSize="small" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="small" />
                  )
                ) : null}
              </StyledMenuIconWrapper>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default translate()(SortControl);
