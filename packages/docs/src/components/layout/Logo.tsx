import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

interface StyledLogoWrapperProps {
  inMenu: boolean;
}

const StyledLogoWrapper = styled('div')<StyledLogoWrapperProps>(
  ({ theme, inMenu }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    ${theme.breakpoints.only('md')} {
      position: ${inMenu ? 'relative' : 'absolute'};
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

export interface LogoProps {
  inMenu?: boolean;
}

const Logo: FC<LogoProps> = ({ inMenu = false }) => {
  return (
    <StyledLogoWrapper inMenu={inMenu}>
      <StyledImageLink href="/">
        <StyledImage src="/static-cms-logo.svg" alt="Static CMS" width={182} height={72} />
      </StyledImageLink>
    </StyledLogoWrapper>
  );
};

export default Logo;
