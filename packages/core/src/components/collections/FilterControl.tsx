import React, { useCallback, useMemo } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Checkbox from '../common/checkbox/Checkbox';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type { FilterMap, ViewFilterWithDefaults } from '@staticcms/core';
import type { FC, MouseEvent } from 'react';

import './FilterControl.css';

export const classes = generateClassNames('FilterControl', [
  'root',
  'filter',
  'filter-label',
  'list-root',
  'list-label',
  'list-filter',
  'list-filter-label',
]);

export interface FilterControlProps {
  filter: Record<string, FilterMap> | undefined;
  viewFilters: ViewFilterWithDefaults[] | undefined;
  variant?: 'menu' | 'list';
  onFilterClick: ((viewFilter: ViewFilterWithDefaults) => void) | undefined;
}

const FilterControl: FC<FilterControlProps> = ({
  filter = {},
  viewFilters = [],
  variant = 'menu',
  onFilterClick,
}) => {
  const t = useTranslate();

  const anyActive = useMemo(() => Object.keys(filter).some(key => filter[key]?.active), [filter]);

  const handleFilterClick = useCallback(
    (viewFilter: ViewFilterWithDefaults) => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      onFilterClick?.(viewFilter);
    },
    [onFilterClick],
  );

  if (variant === 'list') {
    return (
      <div key="filter-by-list" className={classes['list-root']}>
        <h3 className={classes['list-label']}>{t('collection.collectionTop.filterBy')}</h3>
        {viewFilters.map(viewFilter => {
          const checked = Boolean(viewFilter.id && filter[viewFilter?.id]?.active) ?? false;
          const labelId = `filter-list-label-${viewFilter.label}`;
          return (
            <div
              key={viewFilter.id}
              className={classes['list-filter']}
              onClick={handleFilterClick(viewFilter)}
            >
              <input
                key={`${labelId}-${checked}`}
                id={labelId}
                type="checkbox"
                value=""
                checked={checked}
                readOnly
              />
              <label className={classes['list-filter-label']}>{viewFilter.label}</label>
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
      color={anyActive ? 'primary' : 'secondary'}
      variant={anyActive ? 'contained' : 'outlined'}
      rootClassName={classes.root}
      aria-label="filter options dropdown"
      data-testid="filter-by"
    >
      <MenuGroup>
        {viewFilters.map(viewFilter => {
          const checked = Boolean(viewFilter.id && filter[viewFilter?.id]?.active) ?? false;
          const labelId = `filter-list-label-${viewFilter.label}`;
          return (
            <MenuItemButton
              key={viewFilter.id}
              onClick={handleFilterClick(viewFilter)}
              rootClassName={classes.filter}
              data-testid={`filter-by-option-${viewFilter.label}`}
            >
              <Checkbox
                key={`${labelId}-${checked}`}
                id={labelId}
                checked={checked}
                size="sm"
                readOnly
              />
              <label className={classes['filter-label']}>{viewFilter.label}</label>
            </MenuItemButton>
          );
        })}
      </MenuGroup>
    </Menu>
  );
};

export default FilterControl;
