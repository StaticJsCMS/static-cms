import React from 'react';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC } from 'react';

import './Label.css';

export const classes = generateClassNames('Label', [
  'root',
  'disabled',
  'cursor-pointer',
  'cursor-text',
  'cursor-default',
  'error',
  'inline',
]);

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
        classes.root,
        disabled && classes.disabled,
        finalCursor === 'pointer' && classes['cursor-pointer'],
        finalCursor === 'text' && classes['cursor-text'],
        finalCursor === 'default' && classes['cursor-default'],
        hasErrors && classes.error,
        variant === 'inline' && classes.inline,
        className,
      )}
    >
      {children}
    </label>
  );
};

export default Label;
