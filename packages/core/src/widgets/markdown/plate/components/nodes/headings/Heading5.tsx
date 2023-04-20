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
    <h5
      {...attributes}
      {...nodeProps}
      className="
        text-[0.83em]
        leading-[1.25em]
        font-bold
        my-[1.67em]
      "
    >
      {children}
    </h5>
  );
};

export default Heading5;
