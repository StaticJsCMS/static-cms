import { Add as AddIcon } from '@styled-icons/material/Add';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';

import { getNewEntryUrl } from '@staticcms/core/lib/urlHelper';
import { selectCollections } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemLink from '../common/menu/MenuItemLink';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { MenuProps } from '../common/menu/Menu';

export type QuickCreateProps = Pick<
  MenuProps,
  'rootClassName' | 'buttonClassName' | 'hideDropdownIcon' | 'hideLabel' | 'variant'
>;

const QuickCreate: FC<TranslatedProps<QuickCreateProps>> = ({ t, ...menuProps }) => {
  const collections = useAppSelector(selectCollections);

  const createableCollections = useMemo(
    () =>
      Object.values(collections).filter(collection =>
        'folder' in collection ? collection.create ?? false : false,
      ),
    [collections],
  );

  return (
    <Menu label={t('app.header.quickAdd')} startIcon={AddIcon} {...menuProps}>
      <MenuGroup>
        {createableCollections.map(collection => (
          <MenuItemLink key={collection.name} href={getNewEntryUrl(collection.name)}>
            {collection.label_singular || collection.label}
          </MenuItemLink>
        ))}
      </MenuGroup>
    </Menu>
  );
};

export default translate()(QuickCreate) as FC<QuickCreateProps>;
