import React from 'react';

import type { MdNumberedListElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const OrderedListElement: FC<PlateRenderElementProps<MdValue, MdNumberedListElement>> = ({
  children,
}) => {
  return (
    <ol
      className="
        list-decimal
        pl-10
      "
    >
      {children}
    </ol>
  );
};

export default OrderedListElement;
