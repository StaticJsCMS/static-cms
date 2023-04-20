import { Add as AddIcon } from '@styled-icons/material/Add';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';

import { getNewEntryUrl } from '@staticcms/core/lib/urlHelper';
import { selectCollections } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Menu from '../common/menu/Menu';
import MenuItemLink from '../common/menu/MenuItemLink';
import MenuGroup from '../common/menu/MenuGroup';

import type { TranslateProps } from 'react-polyglot';

const QuickCreate = ({ t }: TranslateProps) => {
  const collections = useAppSelector(selectCollections);

  const createableCollections = useMemo(
    () =>
      Object.values(collections).filter(collection =>
        'folder' in collection ? collection.create ?? false : false,
      ),
    [collections],
  );

  return (
    <Menu label={t('app.header.quickAdd')} startIcon={AddIcon}>
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

export default translate()(QuickCreate);
