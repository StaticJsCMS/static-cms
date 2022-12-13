import React from 'react';

import type { PlateRenderElementProps } from '@udecode/plate';
import type { MdValue, MdHrElement } from '@staticcms/markdown';
import type { FC } from 'react';

const HrElement: FC<PlateRenderElementProps<MdValue, MdHrElement>> = props => {
  const { attributes, children, nodeProps } = props;

  return (
    <div {...attributes} {...nodeProps}>
      <hr contentEditable={false} {...nodeProps} />
      {children}
    </div>
  );
};

export default HrElement;
