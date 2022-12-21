import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const StyledImageLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

const Logo = () => {
  return (
    <StyledImageLink href="/">
      <StyledImage src="/static-cms-logo.svg" alt="Static CMS" width={182} height={72} />
    </StyledImageLink>
  );
};

export default Logo;
