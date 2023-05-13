import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useMemo } from 'react';
import { NavLink as BaseNavLink, useLocation } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { MouseEventHandler, ReactNode } from 'react';

export interface BaseNavLinkProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: MouseEventHandler;
}

export interface NavExternalLinkProps extends BaseNavLinkProps {
  href: string;
}

export interface NavInternalLinkProps extends BaseNavLinkProps {
  to: string;
}

export type NavLinkProps = NavExternalLinkProps | NavInternalLinkProps;

const linkClassNames = 'btn btn-text-primary w-full justify-start';

const NavLink = ({ icon, children, onClick, ...otherProps }: NavLinkProps) => {
  const content = useMemo(
    () => (
      <div className="flex w-full gap-3 items-center">
        <span className="w-6 h-6">{icon}</span>
        <span className="flex-grow">{children}</span>
      </div>
    ),
    [children, icon],
  );

  const { pathname } = useLocation();

  if ('href' in otherProps) {
    return (
      <li>
        <a
          href={otherProps.href}
          target="_blank"
          rel="noreferrer"
          className={linkClassNames}
          onClick={onClick}
        >
          <div className="flex justify-between w-full">
            <div className="flex items-center justify-start">{content}</div>
            <OpenInNewIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        </a>
      </li>
    );
  }

  return (
    <li>
      <BaseNavLink
        to={otherProps.to}
        className={classNames(
          linkClassNames,
          pathname === otherProps.to &&
            `
              bg-blue-200/75
              dark:bg-slate-700
              hover:bg-slate-200
              dark:hover:bg-slate-700/75
              text-blue-700
              dark:text-blue-400
            `,
        )}
        onClick={onClick}
      >
        {content}
      </BaseNavLink>
    </li>
  );
};

export default NavLink;
