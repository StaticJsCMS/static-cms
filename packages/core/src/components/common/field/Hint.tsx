import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC } from 'react';

export interface HintProps {
  children: string;
  hasErrors: boolean;
  variant?: 'default' | 'inline';
  cursor?: 'default' | 'pointer' | 'text';
  className?: string;
}

const Hint: FC<HintProps> = ({
  children,
  hasErrors,
  variant = 'default',
  cursor = 'default',
  className,
}) => {
  return (
    <div
      data-testid="hint"
      className={classNames(
        `w-full
        flex
        text-xs
        italic
        group-focus-within/active:text-blue-500
        group-hover/active:text-blue-500`,
        cursor === 'pointer' ? 'cursor-pointer' : 'cursor-text',
        hasErrors
          ? 'text-red-500'
          : `
            text-slate-500
            dark:text-slate-400
          `,
        variant === 'default' && 'px-3 pt-1',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Hint;
