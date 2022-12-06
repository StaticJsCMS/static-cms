import LinkedHeader from './components/LinkedHeader';

import type { ReactNode } from 'react';

interface Header3Props {
  children?: ReactNode;
}

const Header3 = ({ children }: Header3Props) => {
  return <LinkedHeader variant="h3">{children}</LinkedHeader>;
};

export default Header3;
