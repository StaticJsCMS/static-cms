import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@styled-icons/material/KeyboardArrowUp';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';

import {
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
  SORT_DIRECTION_NONE,
} from '@staticcms/core/constants';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type {
  SortableField,
  SortDirection,
  SortMap,
  TranslatedProps,
} from '@staticcms/core/interface';

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
    <Menu
      label={t('collection.collectionTop.sortBy')}
      variant={selectedSort.key ? 'contained' : 'outlined'}
    >
      <MenuGroup>
        {fields.map(field => {
          const sortDir = sort?.[field.name]?.direction ?? SORT_DIRECTION_NONE;
          const nextSortDir = nextSortDirection(sortDir);
          return (
            <MenuItemButton
              key={field.name}
              onClick={() => onSortClick(field.name, nextSortDir)}
              active={field.name === selectedSort.key}
              endIcon={
                field.name === selectedSort.key
                  ? selectedSort.direction === SORT_DIRECTION_ASCENDING
                    ? KeyboardArrowUpIcon
                    : KeyboardArrowDownIcon
                  : undefined
              }
            >
              {field.label ?? field.name}
            </MenuItemButton>
          );
        })}
      </MenuGroup>
    </Menu>
  );
};

export default translate()(SortControl);
