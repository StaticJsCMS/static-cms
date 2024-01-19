import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useEffect, useMemo } from 'react';

import { checkBackendStatus } from '@staticcms/core/actions/status';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectConfig, selectDisplayUrl } from '@staticcms/core/reducers/selectors/config';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../common/button/Button';
import IconButton from '../common/button/IconButton';
import { StaticCmsIcon } from '../images/_index';
import Breadcrumbs from './Breadcrumbs';
import QuickCreate from './QuickCreate';
import SettingsDropdown from './SettingsDropdown';

import type { Breadcrumb } from '@staticcms/core';
import type { FC, ReactNode } from 'react';

import './Navbar.css';

export const classes = generateClassNames('Navbar', [
  'root',
  'in-editor',
  'content-wrapper',
  'content',
  'breadcrumbs',
  'logo-wrapper',
  'logo',
  'custom-logo',
  'actions',
  'site-url',
  'site-url-mobile',
  'site-url-label',
  'site-url-icon',
  'quick-create',
]);

export interface NavbarProps {
  breadcrumbs?: Breadcrumb[];
  showQuickCreate?: boolean;
  navbarActions?: ReactNode;
}

const Navbar: FC<NavbarProps> = ({
  showQuickCreate = false,
  navbarActions = null,
  breadcrumbs = [],
}) => {
  const dispatch = useAppDispatch();
  const config = useAppSelector(selectConfig);

  const displayUrl = useAppSelector(selectDisplayUrl);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        dispatch(checkBackendStatus());
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const inEditor = useMemo(
    () => Boolean(breadcrumbs.length > 0 && breadcrumbs[breadcrumbs.length - 1].editor),
    [breadcrumbs],
  );

  return (
    <nav className={classNames(classes.root, inEditor && classes['in-editor'])}>
      <div key="nav" className={classes['content-wrapper']}>
        <div className={classes.content}>
          <div className={classes.breadcrumbs}>
            <div className={classes['logo-wrapper']}>
              {config?.logo_url ? (
                config.logo_link ? (
                  <a href={config.logo_link}>
                    <div
                      className={classNames(classes.logo, classes['custom-logo'])}
                      style={{ backgroundImage: `url('${config.logo_url}')` }}
                    />
                  </a>
                ) : (
                  <div
                    className={classNames(classes.logo, classes['custom-logo'])}
                    style={{ backgroundImage: `url('${config.logo_url}')` }}
                  />
                )
              ) : config?.logo_link ? (
                <a href={config.logo_link}>
                  <StaticCmsIcon className={classes.logo} />
                </a>
              ) : (
                <StaticCmsIcon className={classes.logo} />
              )}
            </div>
            <Breadcrumbs breadcrumbs={breadcrumbs} inEditor={inEditor} />
          </div>
          <div className={classes.actions}>
            {displayUrl ? (
              <>
                <Button variant="text" className={classes['site-url']} href={displayUrl}>
                  <div className={classes['site-url-label']}>{displayUrl}</div>
                  <OpenInNewIcon className={classes['site-url-icon']} />
                </Button>
                <IconButton
                  icon={OpenInNewIcon}
                  variant="text"
                  href={displayUrl}
                  title={displayUrl}
                  rootClassName={classes['site-url-mobile']}
                  iconClassName={classes['site-url-icon']}
                  aria-label="go to site"
                />
              </>
            ) : null}
            {showQuickCreate ? (
              <QuickCreate key="quick-create" rootClassName={classes['quick-create']} />
            ) : null}
            {navbarActions}
            <SettingsDropdown inEditor={inEditor} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
