import React from 'react';

import type { MdBulletedListElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const UnorderedListElement: FC<PlateRenderElementProps<MdValue, MdBulletedListElement>> = ({
  children,
}) => {
  return (
    <ul
      className="
        list-disc
        pl-10
      "
    >
      {children}
    </ul>
  );
};

export default UnorderedListElement;
