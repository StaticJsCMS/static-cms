import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useEffect, useMemo } from 'react';
import { translate } from 'react-polyglot';

import { checkBackendStatus } from '@staticcms/core/actions/status';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectConfig, selectDisplayUrl } from '@staticcms/core/reducers/selectors/config';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../common/button/Button';
import { StaticCmsIcon } from '../images/_index';
import Breadcrumbs from './Breadcrumbs';
import QuickCreate from './QuickCreate';
import SettingsDropdown from './SettingsDropdown';

import type { Breadcrumb, TranslatedProps } from '@staticcms/core/interface';
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
  'site-url-label',
  'site-url-icon',
  'quick-create',
]);

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
    <nav className={classNames(classes.root, inEditor && classes['in-editor'])}>
      <div key="nav" className={classes['content-wrapper']}>
        <div className={classes.content}>
          <div className={classes.breadcrumbs}>
            <div className={classes['logo-wrapper']}>
              {config?.logo_url ? (
                <div
                  className={classNames(classes.logo, classes['custom-logo'])}
                  style={{ backgroundImage: `url('${config.logo_url}')` }}
                />
              ) : (
                <StaticCmsIcon className={classes.logo} />
              )}
            </div>
            <Breadcrumbs breadcrumbs={breadcrumbs} inEditor={inEditor} />
          </div>
          <div className={classes.actions}>
            {displayUrl ? (
              <Button variant="text" className={classes['site-url']} href={displayUrl}>
                <div className={classes['site-url-label']}>{displayUrl}</div>
                <OpenInNewIcon className={classes['site-url-icon']} />
              </Button>
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

export default translate()(Navbar) as FC<NavbarProps>;
