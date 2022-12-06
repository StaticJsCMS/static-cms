import LinkedHeader from './components/LinkedHeader';

import type { ReactNode } from 'react';

interface Header4Props {
  children?: ReactNode;
}

const Header4 = ({ children }: Header4Props) => {
  return <LinkedHeader variant="h4">{children}</LinkedHeader>;
};

export default Header4;
