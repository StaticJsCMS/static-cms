import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';

import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type { GroupMap, TranslatedProps, ViewGroup } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

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
      <div key="filter-by-list" className="flex flex-col gap-2">
        <h3
          className="
            text-lg
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          {t('collection.collectionTop.groupBy')}
        </h3>
        {viewGroups.map(viewGroup => {
          const active = Boolean(viewGroup.id && group[viewGroup?.id]?.active) ?? false;
          return (
            <div
              key={viewGroup.id}
              className="
                ml-0.5
                font-medium
                flex
                items-center
                text-gray-800
                dark:text-gray-300
              "
              onClick={handleGroupClick(viewGroup)}
            >
              <label className="ml-2 text-md font-medium text-gray-800 dark:text-gray-300">
                {viewGroup.label}
              </label>
              {active ? (
                <CheckIcon key="checkmark" className="ml-2 w-6 h-6 text-blue-500" />
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
      label={t('collection.collectionTop.groupBy')}
      variant={activeGroup ? 'contained' : 'outlined'}
      rootClassName="hidden lg:block"
    >
      <MenuGroup>
        {viewGroups.map(viewGroup => (
          <MenuItemButton
            key={viewGroup.id}
            onClick={() => onGroupClick?.(viewGroup)}
            endIcon={viewGroup.id === activeGroup?.id ? CheckIcon : undefined}
          >
            {viewGroup.label}
          </MenuItemButton>
        ))}
      </MenuGroup>
    </Menu>
  );
};

export default translate()(GroupControl) as FC<GroupControlProps>;
