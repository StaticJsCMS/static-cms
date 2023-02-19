import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC } from 'react';

export interface LabelProps {
  children: string;
  hasErrors: boolean;
  variant?: 'default' | 'inline';
  cursor?: 'pointer' | 'text';
  className?: string;
}

const Label: FC<LabelProps> = ({
  children,
  hasErrors,
  variant = 'default',
  cursor = 'text',
  className,
}) => {
  return (
    <label
      data-testid="label"
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
