import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useEffect } from 'react';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';

import { checkBackendStatus } from '@staticcms/core/actions/status';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { StaticCmsIcon } from '../images/_index';
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(checkBackendStatus());
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <Disclosure as="nav" className="bg-white dark:bg-slate-800 drop-shadow-lg z-20 relative">
      {({ open }) => (
        <>
          <div key="nav" className="mx-auto pr-2 sm:pr-4 lg:pr-5">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span key="open-sr" className="sr-only">
                    Open main menu
                  </span>
                  {open ? (
                    <XMarkIcon key="open-icon" className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <Bars3Icon key="closed-icon" className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center h-full sm:items-stretch sm:justify-start gap-4">
                <div className="flex flex-shrink-0 items-center justify-center bg-slate-700 dark:bg-slate-700 w-16">
                  <StaticCmsIcon className="inline-flex w-10 h-10" />
                </div>
                <div className="flex h-full items-center text-xl font-semibold gap-1 text-gray-800 dark:text-white">
                  {breadcrumbs.map((breadcrumb, index) => (
                    <Fragment key={`breadcrumb-${index}`}>
                      {index > 0 ? <span key={`separator-${index}`}>&#62;</span> : null}
                      {breadcrumb.to ? (
                        <Link
                          key={`link-${index}`}
                          className="hover:text-gray-400 dark:hover:text-gray-400"
                          to={breadcrumb.to}
                        >
                          {breadcrumb.name}
                        </Link>
                      ) : (
                        <span key={`text-${index}`}>{breadcrumb.name}</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                {showQuickCreate ? <QuickCreate key="quick-create" /> : null}
                {navbarActions}
                <SettingsDropdown />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* TODO {navigation.map(item => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-slate-900 text-white'
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white',
                'block px-3 py-2 rounded-md text-base font-medium',
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))} */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default translate()(Navbar) as ComponentType<NavbarProps>;
