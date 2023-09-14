import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type { GroupMap, TranslatedProps, ViewGroup } from '@staticcms/core/interface';
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
  viewGroups: ViewGroup[] | undefined;
  variant?: 'menu' | 'list';
  onGroupClick: ((viewGroup: ViewGroup) => void) | undefined;
}

const GroupControl = ({
  viewGroups = [],
  group = {},
  variant = 'menu',
  onGroupClick,
  t,
}: TranslatedProps<GroupControlProps>) => {
  const activeGroup = useMemo(() => Object.values(group).find(f => f.active === true), [group]);

  const handleGroupClick = useCallback(
    (viewGroup: ViewGroup) => (event: MouseEvent) => {
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
      variant={activeGroup ? 'contained' : 'outlined'}
      rootClassName={classes.root}
    >
      <MenuGroup>
        {viewGroups.map(viewGroup => (
          <MenuItemButton
            key={viewGroup.id}
            onClick={() => onGroupClick?.(viewGroup)}
            endIcon={viewGroup.id === activeGroup?.id ? CheckIcon : undefined}
            className={classes.option}
          >
            {viewGroup.label}
          </MenuItemButton>
        ))}
      </MenuGroup>
    </Menu>
  );
};

export default translate()(GroupControl) as FC<GroupControlProps>;
