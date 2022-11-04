import LinkedHeader from './components/LinkedHeader';

import type { ReactNode } from 'react';

interface Header2Props {
  children?: ReactNode;
}

const Header2 = ({ children }: Header2Props) => {
  return <LinkedHeader variant="h2">{children}</LinkedHeader>;
};

export default Header2;
