import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useMemo } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type { GroupMap, ViewGroupWithDefaults } from '@staticcms/core';
import type { FC, MouseEvent } from 'react';

import './GroupControl.css';

export const classes = generateClassNames('GroupControl', [
  'root',
  'option',
  'list',
  'list-label',
  'list-option',
  'list-option-label',
  'list-option-checked-icon',
  'list-option-not-checked',
]);

export interface GroupControlProps {
  group: Record<string, GroupMap> | undefined;
  viewGroups: ViewGroupWithDefaults[] | undefined;
  variant?: 'menu' | 'list';
  onGroupClick: ((viewGroup: ViewGroupWithDefaults) => void) | undefined;
}

const GroupControl: FC<GroupControlProps> = ({
  viewGroups = [],
  group = {},
  variant = 'menu',
  onGroupClick,
}) => {
  const t = useTranslate();

  const activeGroup = useMemo(() => Object.values(group).find(f => f.active === true), [group]);

  const handleGroupClick = useCallback(
    (viewGroup: ViewGroupWithDefaults) => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      onGroupClick?.(viewGroup);
    },
    [onGroupClick],
  );

  if (variant === 'list') {
    return (
      <div key="filter-by-list" className={classes.list}>
        <h3 className={classes['list-label']}>{t('collection.collectionTop.groupBy')}</h3>
        {viewGroups.map(viewGroup => {
          const active = Boolean(viewGroup.id && group[viewGroup?.id]?.active) ?? false;
          return (
            <div
              key={viewGroup.id}
              className={classes['list-option']}
              onClick={handleGroupClick(viewGroup)}
            >
              <label className={classes['list-option-label']}>{viewGroup.label}</label>
              {active ? (
                <CheckIcon key="checkmark" className={classes['list-option-checked-icon']} />
              ) : (
                <div key="not-checked" className={classes['list-option-not-checked']} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Menu
      label={t('collection.collectionTop.groupBy')}
      color={activeGroup ? 'primary' : 'secondary'}
      variant={activeGroup ? 'contained' : 'outlined'}
      rootClassName={classes.root}
      aria-label="group by options dropdown"
      data-testid="group-by"
    >
      <MenuGroup>
        {viewGroups.map(viewGroup => (
          <MenuItemButton
            key={viewGroup.id}
            onClick={() => onGroupClick?.(viewGroup)}
            endIcon={viewGroup.id === activeGroup?.id ? CheckIcon : undefined}
            rootClassName={classes.option}
            data-testid={`group-by-option-${viewGroup.label}`}
          >
            {viewGroup.label}
          </MenuItemButton>
        ))}
      </MenuGroup>
    </Menu>
  );
};

export default GroupControl;
