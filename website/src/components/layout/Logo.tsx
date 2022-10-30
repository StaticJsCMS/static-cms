import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const StyledImageLink = styled('a')(
  ({ theme }) => `
    display: flex;
    align-items: center;

    ${theme.breakpoints.down('lg')} {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }
  `,
);

const StyledImage = styled(Image)`
  cursor: pointer;
`;

const Logo = () => {
  return (
    <Link href="/">
      <StyledImageLink>
        <StyledImage src="/static-cms-logo.svg" width={182} height={72} />
      </StyledImageLink>
    </Link>
  );
};

export default Logo;
