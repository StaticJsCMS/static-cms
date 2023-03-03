import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC } from 'react';

export interface LabelProps {
  htmlFor?: string;
  children: string;
  hasErrors?: boolean;
  variant?: 'default' | 'inline';
  cursor?: 'default' | 'pointer' | 'text';
  className?: string;
  'data-testid'?: string;
}

const Label: FC<LabelProps> = ({
  htmlFor,
  children,
  hasErrors = false,
  variant = 'default',
  cursor = 'default',
  className,
  'data-testid': dataTestId,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      data-testid={dataTestId ?? 'label'}
      className={classNames(
        `w-full
        flex
        text-xs
        font-bold
        dark:font-semibold
        group-focus-within/active:text-blue-500
        group-hover/active:text-blue-500`,
        cursor === 'pointer' ? 'cursor-pointer' : 'cursor-text',
        hasErrors
          ? 'text-red-500'
          : `
            text-slate-500
            dark:text-slate-400
          `,
        variant === 'default' && 'px-3 pt-3',
        className,
      )}
    >
      {children}
    </label>
  );
};

export default Label;
