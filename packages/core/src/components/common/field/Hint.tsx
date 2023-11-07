import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC, MouseEvent } from 'react';

import './Hint.css';

export const classes = generateClassNames('Hint', [
  'root',
  'inline',
  'disabled',
  'cursor-pointer',
  'cursor-text',
  'cursor-default',
  'error',
  'link',
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

  const handleOnClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

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
      onClick={handleOnClick}
    >
      <ReactMarkdown
        remarkPlugins={[gfm]}
        allowedElements={['a', 'strong', 'em', 'del']}
        unwrapDisallowed={true}
        components={{
          a: ({ node: _node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" className={classes.link} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Hint;
