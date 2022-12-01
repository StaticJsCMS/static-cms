import React from 'react';

import type { MdH1Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const Heading1: FC<PlateRenderElementProps<MdValue, MdH1Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h1 {...attributes} {...nodeProps}>
      {children}
    </h1>
  );
};

export default Heading1;
