import React from 'react';

import type { MdParagraphElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const ParagraphElement: FC<PlateRenderElementProps<MdValue, MdParagraphElement>> = ({
  children,
  element: { align },
}) => {
  return (
    <p
      style={{ textAlign: align }}
      className="
        block
        my-[1em]
      "
    >
      {children}
    </p>
  );
};

export default ParagraphElement;
