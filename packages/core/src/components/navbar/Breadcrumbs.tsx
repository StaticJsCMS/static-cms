import { ArrowBack as ArrowBackIcon } from '@styled-icons/material/ArrowBack';
import React, { Fragment, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { Breadcrumb } from '@staticcms/core/interface';
import type { FC } from 'react';

import './Breadcrumbs.css';

export const classes = generateClassNames('Breadcrumbs', [
  'root',
  'links-wrapper',
  'links',
  'breadcrumb-link',
  'breadcrumb-text',
  'breadcrumb-truncated',
  'last-non-editor-breadcrumb-link',
  'mobile-current-breadcrumb-link',
  'mobile-backlink',
  'mobile-current-breadcrumb-text',
]);

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  inEditor?: boolean;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs, inEditor = false }) => {
  const [searchParams] = useSearchParams();
  const backTo = searchParams.get('backTo') as string | undefined;

  const finalNonEditorBreadcrumb = useMemo(() => {
    const nonEditorBreadcrumbs = breadcrumbs.filter(b => !b.editor);
    if (nonEditorBreadcrumbs.length === 0) {
      return undefined;
    }

    return nonEditorBreadcrumbs[nonEditorBreadcrumbs.length - 1];
  }, [breadcrumbs]);

  return (
    <div className={classes.root}>
      <div className={classes['links-wrapper']}>
        <div className={classes.links}>
          {breadcrumbs.map((breadcrumb, index) =>
            breadcrumb.name ? (
              <Fragment key={`breadcrumb-${index}`}>
                {index > 0 ? <span key={`separator-${index}`}>&#62;</span> : null}
                {breadcrumb.to ? (
                  <Link
                    key={`link-${index}`}
                    className={classNames(
                      classes['breadcrumb-link'],
                      index + 1 === breadcrumbs.length && classes['breadcrumb-truncated'],
                    )}
                    to={breadcrumb.to}
                  >
                    {breadcrumb.name}
                  </Link>
                ) : (
                  <span
                    key={`text-${index}`}
                    className={classNames(
                      classes['breadcrumb-text'],
                      index + 1 === breadcrumbs.length && classes['breadcrumb-truncated'],
                    )}
                  >
                    {breadcrumb.name}
                  </span>
                )}
              </Fragment>
            ) : null,
          )}
        </div>
      </div>
      {finalNonEditorBreadcrumb ? (
        finalNonEditorBreadcrumb.to || backTo ? (
          <Link
            key="final-non-editor-breadcrumb-link"
            className={classes['mobile-current-breadcrumb-link']}
            to={backTo ? backTo : finalNonEditorBreadcrumb.to!}
          >
            {inEditor ? <ArrowBackIcon className={classes['mobile-backlink']} /> : null}
            {finalNonEditorBreadcrumb.name}
          </Link>
        ) : (
          <div
            key="final-non-editor-breadcrumb-text"
            className={classes['mobile-current-breadcrumb-text']}
          >
            {finalNonEditorBreadcrumb?.name ?? ''}
          </div>
        )
      ) : null}
    </div>
  );
};

export default Breadcrumbs;
