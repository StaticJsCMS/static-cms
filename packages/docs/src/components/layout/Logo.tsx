import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const StyledLogoWrapper = styled('div')(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    ${theme.breakpoints.only('md')} {
      position: absolute;
      left: 0;
      width: 100%;
    }
  `,
);

const StyledImageLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

const Logo = () => {
  return (
    <StyledLogoWrapper>
      <StyledImageLink href="/">
        <StyledImage src="/static-cms-logo.svg" alt="Static CMS" width={182} height={72} />
      </StyledImageLink>
    </StyledLogoWrapper>
  );
};

export default Logo;
