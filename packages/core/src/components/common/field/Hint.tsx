import React from 'react';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC } from 'react';

import './Hint.css';

export const classes = generateClassNames('Hint', [
  'root',
  'inline',
  'disabled',
  'cursor-pointer',
  'cursor-text',
  'cursor-default',
  'error',
]);

export interface HintProps {
  children: string;
  hasErrors: boolean;
  variant?: 'default' | 'inline';
  cursor?: 'default' | 'pointer' | 'text';
  className?: string;
  disabled: boolean;
}

const Hint: FC<HintProps> = ({
  children,
  hasErrors,
  variant = 'default',
  cursor = 'default',
  className,
  disabled,
}) => {
  const finalCursor = useCursor(cursor, disabled);

  return (
    <div
      data-testid="hint"
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
    </div>
  );
};

export default Hint;
