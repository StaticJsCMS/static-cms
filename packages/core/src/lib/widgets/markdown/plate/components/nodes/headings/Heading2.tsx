import React from 'react';

import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';
import type { MdH2Element, MdValue } from '@staticcms/markdown';

const Heading2: FC<PlateRenderElementProps<MdValue, MdH2Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h2
      {...attributes}
      {...nodeProps}
      className="
        text-[1.5em]
        leading-[1.25em]
        font-bold
        my-[0.83em]
      "
    >
      {children}
    </h2>
  );
};

export default Heading2;
