import type { ReactNode } from 'react';

export const getNodeText = (node: ReactNode): string => {
  if (['string', 'number'].includes(typeof node)) {
    return `${node}`;
  }

  if (node instanceof Array) {
    return node.map(getNodeText).join('');
  }

  if (typeof node === 'object' && node && 'props' in node) {
    return getNodeText(node.props.children);
  }

  return '';
};
