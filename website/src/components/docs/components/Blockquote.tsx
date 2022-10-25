import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

import type { ReactNode } from 'react';

interface StyledBlockquoteProps {
  $color: 'success' | 'error' | 'default';
}

const StyledBlockquote = styled('blockquote')<StyledBlockquoteProps>(
  ({ theme, $color }) => `
    ${
      $color !== 'default'
        ? `
          blockquote&::before {
            border-left: 4px solid ${
              $color === 'success' ? theme.palette.success.main : theme.palette.error.main
            };
          }
        `
        : ''
    }
  `,
);

const getNodeText = (node: ReactNode): string => {
  if (!node) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'boolean' || typeof node === 'number') {
    return `${node}`;
  }

  if (node instanceof Array) {
    return node.map(getNodeText).join('');
  }

  if ('props' in node && 'children' in node.props) {
    return getNodeText(node.props.children);
  }

  return '';
};

interface BlockquoteProps {
  children?: ReactNode;
}

const Blockquote = ({ children = '' }: BlockquoteProps) => {
  const color = useMemo(() => {
    const text = getNodeText(children).trim();
    if (text === '') {
      console.log('[COLOR]', 'default', `"${text}"`);
      return 'default';
    }

    if (text.startsWith('Do: ')) {
      console.log('[COLOR]', 'success', `"${text}"`);
      return 'success';
    }

    if (text.startsWith("Don't: ")) {
      console.log('[COLOR]', 'error', `"${text}"`);
      return 'error';
    }

    console.log('[COLOR]', 'default', `"${text}"`);
    return 'default';
  }, [children]);

  return <StyledBlockquote $color={color}>{children}</StyledBlockquote>;
};

export default Blockquote;
