import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC } from 'react';

import './Hint.css';

export const classes = generateClassNames('Hint', [
  'root',
  'inline',
  'cursor-pointer',
  'cursor-text',
  'cursor-default',
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
        finalCursor === 'pointer' && classes['cursor-pointer'],
        finalCursor === 'text' && classes['cursor-text'],
        finalCursor === 'default' && classes['cursor-default'],
        variant === 'inline' && classes.inline,
        className,
      )}
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
