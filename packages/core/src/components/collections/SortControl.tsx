import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@styled-icons/material/KeyboardArrowUp';
import React, { useCallback, useMemo } from 'react';
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
import type { FC, MouseEvent } from 'react';

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

export interface SortControlProps {
  fields: SortableField[] | undefined;
  sort: SortMap | undefined;
  variant?: 'menu' | 'list';
  onSortClick: ((key: string, direction?: SortDirection) => Promise<void>) | undefined;
}

const SortControl = ({
  fields = [],
  sort = {},
  variant = 'menu',
  onSortClick,
  t,
}: TranslatedProps<SortControlProps>) => {
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

  const handleSortClick = useCallback(
    (key: string, direction?: SortDirection) => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      onSortClick?.(key, direction);
    },
    [onSortClick],
  );

  if (variant === 'list') {
    return (
      <div key="filter-by-list" className="flex flex-col gap-2">
        <h3
          className="
            text-lg
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          {t('collection.collectionTop.sortBy')}
        </h3>
        {fields.map(field => {
          const sortDir = sort?.[field.name]?.direction ?? SORT_DIRECTION_NONE;
          const nextSortDir = nextSortDirection(sortDir);
          return (
            <div
              key={field.name}
              className="
                ml-0.5
                font-medium
                flex
                items-center
                text-gray-800
                dark:text-gray-300
              "
              onClick={handleSortClick(field.name, nextSortDir)}
            >
              <label className="ml-2 text-md font-medium text-gray-800 dark:text-gray-300">
                {field.label ?? field.name}
              </label>
              {field.name === selectedSort.key ? (
                selectedSort.direction === SORT_DIRECTION_ASCENDING ? (
                  <KeyboardArrowUpIcon key="checkmark" className="ml-2 w-6 h-6 text-blue-500" />
                ) : (
                  <KeyboardArrowDownIcon key="checkmark" className="ml-2 w-6 h-6 text-blue-500" />
                )
              ) : (
                <div key="not-checked" className="ml-2 w-6 h-6" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Menu
      label={t('collection.collectionTop.sortBy')}
      variant={selectedSort.key ? 'contained' : 'outlined'}
      rootClassName="hidden lg:block"
    >
      <MenuGroup>
        {fields.map(field => {
          const sortDir = sort?.[field.name]?.direction ?? SORT_DIRECTION_NONE;
          const nextSortDir = nextSortDirection(sortDir);
          return (
            <MenuItemButton
              key={field.name}
              onClick={handleSortClick(field.name, nextSortDir)}
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

export default translate()(SortControl) as FC<SortControlProps>;
