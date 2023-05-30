import { Add as AddIcon } from '@styled-icons/material/Add';
import { Menu as MenuIcon } from '@styled-icons/material/Menu';
import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import useNewEntryUrl from '@staticcms/core/lib/hooks/useNewEntryUrl';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { selectDisplayUrl } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import IconButton from '../common/button/IconButton';
import NavigationDrawer from './NavigationDrawer';
import QuickCreate from './QuickCreate';

import type { Collection } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface BottomNavigationProps {
  collection: Collection | undefined;
}

const BottomNavigation: FC<BottomNavigationProps> = ({ collection }) => {
  const params = useParams();
  const filterTerm = useMemo(() => params['*'], [params]);
  const newEntryUrl = useNewEntryUrl(collection, filterTerm);

  const displayUrl = useAppSelector(selectDisplayUrl);

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => {
    setMobileOpen(old => !old);
  }, []);

  return (
    <>
      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          h-16
          shadow-bottom-navigation
          bg-gray-50
          dark:bg-gray-800
          flex
          px-6
          py-1
          md:hidden
        "
      >
        <IconButton variant="text" className="flex-grow" onClick={toggleMobileMenu}>
          <MenuIcon className="w-6 h-6" />
        </IconButton>
        {isNotEmpty(newEntryUrl) ? (
          <IconButton to={newEntryUrl} variant="text" className="flex-grow">
            <AddIcon className="w-6 h-6" />
          </IconButton>
        ) : (
          <QuickCreate
            key="quick-create"
            variant="text"
            rootClassName="flex-grow"
            buttonClassName="w-full"
            hideDropdownIcon
            hideLabel
          />
        )}
        {displayUrl ? (
          <IconButton variant="text" className="flex-grow" href={displayUrl}>
            <OpenInNewIcon className="h-6 w-6" />
          </IconButton>
        ) : null}
      </div>
      <NavigationDrawer mobileOpen={mobileOpen} onMobileOpenToggle={toggleMobileMenu} />
    </>
  );
};

export default BottomNavigation;
