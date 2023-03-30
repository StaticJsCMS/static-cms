import React from 'react';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC } from 'react';

export interface LabelProps {
  htmlFor?: string;
  children: string;
  hasErrors?: boolean;
  variant?: 'default' | 'inline';
  cursor?: 'default' | 'pointer' | 'text';
  className?: string;
  disabled: boolean;
  'data-testid'?: string;
}

const Label: FC<LabelProps> = ({
  htmlFor,
  children,
  hasErrors = false,
  variant = 'default',
  cursor = 'default',
  className,
  disabled,
  'data-testid': dataTestId,
}) => {
  const finalCursor = useCursor(cursor, disabled);

  return (
    <label
      htmlFor={htmlFor}
      data-testid={dataTestId ?? 'label'}
      className={classNames(
        `
          w-full
          flex
          text-xs
          font-bold
          dark:font-semibold
        `,
        !disabled &&
          `
            group-focus-within/active:text-blue-500
            group-hover/active:text-blue-500
          `,
        finalCursor === 'pointer' && 'cursor-pointer',
        finalCursor === 'text' && 'cursor-text',
        finalCursor === 'default' && 'cursor-default',
        hasErrors
          ? 'text-red-500'
          : disabled
          ? `
              text-slate-300
              dark:text-slate-600
            `
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
