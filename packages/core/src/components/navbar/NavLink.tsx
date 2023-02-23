import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
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
      <>
        {icon}
        <span className="ml-3">{children}</span>
      </>
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
            <ArrowTopRightOnSquareIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
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
            'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-blue-700 dark:text-white',
        )}
        onClick={onClick}
      >
        {content}
      </BaseNavLink>
    </li>
  );
};

export default NavLink;
