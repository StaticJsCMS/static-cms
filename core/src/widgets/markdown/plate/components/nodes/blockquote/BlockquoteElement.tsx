import Box from '@mui/system/Box';
import React from 'react';

import type { MdBlockquoteElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const BlockquoteElement: FC<PlateRenderElementProps<MdValue, MdBlockquoteElement>> = ({
  children,
}) => {
  return (
    <Box
      component="blockquote"
      sx={{ borderLeft: '2px solid rgba(209,213,219,0.5)', marginLeft: '8px', paddingLeft: '8px' }}
    >
      {children}
    </Box>
  );
};

export default BlockquoteElement;
