import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useEffect, useMemo } from 'react';
import { translate } from 'react-polyglot';

import { checkBackendStatus } from '@staticcms/core/actions/status';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectConfig, selectDisplayUrl } from '@staticcms/core/reducers/selectors/config';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../common/button/Button';
import { StaticCmsIcon } from '../images/_index';
import Breadcrumbs from './Breadcrumbs';
import QuickCreate from './QuickCreate';
import SettingsDropdown from './SettingsDropdown';

import type { Breadcrumb, TranslatedProps } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(checkBackendStatus());
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const inEditor = useMemo(
    () => Boolean(breadcrumbs.length > 0 && breadcrumbs[breadcrumbs.length - 1].editor),
    [breadcrumbs],
  );

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
        <div
          className={classNames(
            `
              relative
              flex
              h-16
              items-center
              justify-between
              gap-2
            `,
            inEditor && 'pl-3 md:pl-0',
          )}
        >
          <div className="flex flex-1 h-full items-stretch justify-start gap-2 md:gap-4 truncate">
            <div
              className={classNames(
                `
                  flex-shrink-0
                  items-center
                  justify-center
                  w-16
                  bg-slate-500
                  dark:bg-slate-700
                `,
                inEditor ? 'hidden md:flex' : 'flex',
              )}
            >
              {config?.logo_url ? (
                <div
                  className="h-10 w-10 bg-cover bg-no-repeat bg-center object-cover"
                  style={{ backgroundImage: `url('${config.logo_url}')` }}
                />
              ) : (
                <StaticCmsIcon className="w-10 h-10" />
              )}
            </div>
            <Breadcrumbs breadcrumbs={breadcrumbs} inEditor={inEditor} />
          </div>
          <div className="flex gap-3 items-center">
            {displayUrl ? (
              <Button variant="text" className="gap-2 hidden lg:flex" href={displayUrl}>
                <div className="hidden lg:flex">{displayUrl}</div>
                <OpenInNewIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </Button>
            ) : null}
            {showQuickCreate ? (
              <QuickCreate key="quick-create" rootClassName="hidden md:block" />
            ) : null}
            {navbarActions}
            <SettingsDropdown inEditor={inEditor} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default translate()(Navbar) as FC<NavbarProps>;
