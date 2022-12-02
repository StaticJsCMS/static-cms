import React from 'react';

import type { MdH5Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const Heading5: FC<PlateRenderElementProps<MdValue, MdH5Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h5 {...attributes} {...nodeProps}>
      {children}
    </h5>
  );
};

export default Heading5;
