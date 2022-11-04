import LinkedHeader from './components/LinkedHeader';

import type { ReactNode } from 'react';

interface Header5Props {
  children?: ReactNode;
}

const Header5 = ({ children }: Header5Props) => {
  return <LinkedHeader variant="h5">{children}</LinkedHeader>;
};

export default Header5;
