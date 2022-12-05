import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const StyledImageLink = styled('a')`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

const Logo = () => {
  return (
    <Link href="/">
      <StyledImageLink>
        <StyledImage src="/static-cms-logo.svg" alt="Static CMS" width={182} height={72} />
      </StyledImageLink>
    </Link>
  );
};

export default Logo;
