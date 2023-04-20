import React from 'react';

import type { MdH6Element, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const Heading6: FC<PlateRenderElementProps<MdValue, MdH6Element>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <h6
      {...attributes}
      {...nodeProps}
      className="
        text-[0.67em]
        leading-[1.25em]
        font-bold
        my-[2.33em]
      "
    >
      {children}
    </h6>
  );
};

export default Heading6;
