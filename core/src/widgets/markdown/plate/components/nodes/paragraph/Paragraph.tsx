import React from 'react';

import type { MdParagraphElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const Paragraph: FC<PlateRenderElementProps<MdValue, MdParagraphElement>> = ({
  children,
  element: { align },
}) => {
  return <p style={{ textAlign: align }}>{children}</p>;
};

export default Paragraph;
