import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import type { Breadcrumb } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div
      className="
        flex
        h-full
        w-breadcrumb-title
        md:w-full
        items-center
        text-xl
        font-semibold
        gap-1
        text-gray-800
        dark:text-white
      "
    >
      <div className="hidden md:flex">
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.name ? (
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
          ) : null,
        )}
      </div>
      <div
        className="
          block
          md:hidden
          overflow-hidden
          whitespace-nowrap
          text-ellipsis
          w-full
        "
      >
        {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].name : ''}
      </div>
    </div>
  );
};

export default Breadcrumbs;
