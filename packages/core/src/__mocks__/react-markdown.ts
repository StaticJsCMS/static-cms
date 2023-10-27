import React from 'react';

import type { FC, PropsWithChildren } from 'react';

const ReactMarkdown: FC<PropsWithChildren> = ({ children }) => {
  return React.createElement('div', {}, [children]);
};

export default ReactMarkdown;
