import { ReactNode } from 'react';
import Header from './Header';

export interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Page;
