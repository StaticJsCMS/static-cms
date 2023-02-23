import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';

import Menu from '../common/menu/Menu';
import MenuItemButton from '../common/menu/MenuItemButton';
import MenuGroup from '../common/menu/MenuGroup';

import type { GroupMap, TranslatedProps, ViewGroup } from '@staticcms/core/interface';

interface GroupControlProps {
  group: Record<string, GroupMap>;
  viewGroups: ViewGroup[];
  onGroupClick: (viewGroup: ViewGroup) => void;
}

const GroupControl = ({
  viewGroups,
  group,
  t,
  onGroupClick,
}: TranslatedProps<GroupControlProps>) => {
  const activeGroup = useMemo(() => Object.values(group).find(f => f.active === true), [group]);

  return (
    <Menu
      label={t('collection.collectionTop.groupBy')}
      variant={activeGroup ? 'contained' : 'outlined'}
    >
      <MenuGroup>
        {viewGroups.map(viewGroup => (
          <MenuItemButton
            key={viewGroup.id}
            onClick={() => onGroupClick(viewGroup)}
            endIcon={viewGroup.id === activeGroup?.id ? CheckIcon : undefined}
          >
            {viewGroup.label}
          </MenuItemButton>
        ))}
      </MenuGroup>
    </Menu>
  );
};

export default translate()(GroupControl);
