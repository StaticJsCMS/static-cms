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
    <h1
      {...attributes}
      {...nodeProps}
      className="
        text-[2em]
        leading-[1.5em]
        font-bold
        my-[0.67em]
      "
    >
      {children}
    </h1>
  );
};

export default Heading1;
