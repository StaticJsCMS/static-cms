import { Menu as MenuIcon } from '@styled-icons/material/Menu';
import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useCallback, useEffect, useState } from 'react';
import { translate } from 'react-polyglot';

import { checkBackendStatus } from '@staticcms/core/actions/status';
import { selectConfig, selectDisplayUrl } from '@staticcms/core/reducers/selectors/config';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../common/button/Button';
import IconButton from '../common/button/IconButton';
import { StaticCmsIcon } from '../images/_index';
import Breadcrumbs from './Breadcrumbs';
import NavigationDrawer from './NavigationDrawer';
import QuickCreate from './QuickCreate';
import SettingsDropdown from './SettingsDropdown';

import type { Breadcrumb, TranslatedProps } from '@staticcms/core/interface';
import type { ComponentType, ReactNode } from 'react';

export interface NavbarProps {
  breadcrumbs?: Breadcrumb[];
  showQuickCreate?: boolean;
  navbarActions?: ReactNode;
}

const Navbar = ({
  showQuickCreate = false,
  navbarActions = null,
  breadcrumbs = [],
}: TranslatedProps<NavbarProps>) => {
  const dispatch = useAppDispatch();
  const config = useAppSelector(selectConfig);

  const displayUrl = useAppSelector(selectDisplayUrl);

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => {
    setMobileOpen(old => !old);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(checkBackendStatus());
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <nav
      className="
        z-40
        relative
        bg-white
        drop-shadow-md
        dark:bg-slate-800
        dark:drop-shadow-lg
      "
    >
      <div key="nav" className="mx-auto pr-2 sm:pr-4 lg:pr-5">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 h-full items-stretch justify-start gap-2 md:gap-4">
            <div className="flex flex-shrink-0 items-center justify-center w-16 md:bg-slate-500 md:dark:bg-slate-700">
              {config?.logo_url ? (
                <div
                  className="h-10 w-10 bg-cover bg-no-repeat bg-center object-cover hidden md:inline-flex"
                  style={{ backgroundImage: `url('${config.logo_url}')` }}
                />
              ) : (
                <StaticCmsIcon className="w-10 h-10 hidden md:inline-flex" />
              )}
              <div className="w-10 h-10 flex md:hidden items-center justify-center">
                <IconButton variant="text" onClick={toggleMobileMenu}>
                  <MenuIcon className="w-8 h-8" />
                </IconButton>
                <NavigationDrawer mobileOpen={mobileOpen} onMobileOpenToggle={toggleMobileMenu} />
              </div>
            </div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <div className="flex gap-3 items-center">
            {displayUrl ? (
              <Button variant="text" className="flex gap-2" href={displayUrl}>
                <div className="hidden md:block">{displayUrl}</div>
                <OpenInNewIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </Button>
            ) : null}
            {showQuickCreate ? <QuickCreate key="quick-create" /> : null}
            {navbarActions}
            <SettingsDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default translate()(Navbar) as ComponentType<NavbarProps>;
