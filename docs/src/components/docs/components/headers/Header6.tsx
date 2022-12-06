import LinkedHeader from './components/LinkedHeader';

import type { ReactNode } from 'react';

interface Header6Props {
  children?: ReactNode;
}

const Header6 = ({ children }: Header6Props) => {
  return <LinkedHeader variant="h6">{children}</LinkedHeader>;
};

export default Header6;
