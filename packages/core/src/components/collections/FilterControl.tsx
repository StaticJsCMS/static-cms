import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';

import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type { FilterMap, TranslatedProps, ViewFilter } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

export interface FilterControlProps {
  filter: Record<string, FilterMap> | undefined;
  viewFilters: ViewFilter[] | undefined;
  variant?: 'menu' | 'list';
  onFilterClick: ((viewFilter: ViewFilter) => void) | undefined;
}

const FilterControl = ({
  filter = {},
  viewFilters = [],
  variant = 'menu',
  onFilterClick,
  t,
}: TranslatedProps<FilterControlProps>) => {
  const anyActive = useMemo(() => Object.keys(filter).some(key => filter[key]?.active), [filter]);

  const handleFilterClick = useCallback(
    (viewFilter: ViewFilter) => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      onFilterClick?.(viewFilter);
    },
    [onFilterClick],
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
          {t('collection.collectionTop.filterBy')}
        </h3>
        {viewFilters.map(viewFilter => {
          const checked = Boolean(viewFilter.id && filter[viewFilter?.id]?.active) ?? false;
          const labelId = `filter-list-label-${viewFilter.label}`;
          return (
            <div
              key={viewFilter.id}
              className="
                ml-1.5
                font-medium
                flex
                items-center
                text-gray-800
                dark:text-gray-300
              "
              onClick={handleFilterClick(viewFilter)}
            >
              <input
                key={`${labelId}-${checked}`}
                id={labelId}
                type="checkbox"
                value=""
                className=""
                checked={checked}
                readOnly
              />
              <label className="ml-2 text-md font-medium text-gray-800 dark:text-gray-300">
                {viewFilter.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Menu
      key="filter-by-menu"
      label={t('collection.collectionTop.filterBy')}
      variant={anyActive ? 'contained' : 'outlined'}
      rootClassName="hidden lg:block"
    >
      <MenuGroup>
        {viewFilters.map(viewFilter => {
          const checked = Boolean(viewFilter.id && filter[viewFilter?.id]?.active) ?? false;
          const labelId = `filter-list-label-${viewFilter.label}`;
          return (
            <MenuItemButton key={viewFilter.id} onClick={handleFilterClick(viewFilter)}>
              <input
                key={`${labelId}-${checked}`}
                id={labelId}
                type="checkbox"
                value=""
                className=""
                checked={checked}
                readOnly
              />
              <label className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">
                {viewFilter.label}
              </label>
            </MenuItemButton>
          );
        })}
      </MenuGroup>
    </Menu>
  );
};

export default translate()(FilterControl) as FC<FilterControlProps>;
