import Typography from '@mui/material/Typography';

import { useNodeText } from '../../../../util/node.util';
import useAnchor from './hooks/useAnchor';

import type { ReactNode } from 'react';

interface Header1Props {
  children?: ReactNode;
}

const Header1 = ({ children }: Header1Props) => {
  const textContent = useNodeText(children);
  const anchor = useAnchor(textContent);

  return (
    <Typography variant="h1" id={anchor}>
      {children}
    </Typography>
  );
};

export default Header1;
