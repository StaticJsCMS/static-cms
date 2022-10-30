import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

import transientOptions from '../../util/transientOptions';

interface StyledImageLinkProps {
  $inDrawer: boolean;
}

const StyledImageLink = styled(
  'a',
  transientOptions,
)<StyledImageLinkProps>(
  ({ theme, $inDrawer }) => `
    display: flex;
    align-items: center;

    ${
      !$inDrawer
        ? `
          ${theme.breakpoints.down('lg')} {
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
          }
        `
        : ''
    }
  `,
);

const StyledImage = styled(Image)`
  cursor: pointer;
`;

interface LogoProps {
  inDrawer?: boolean;
}

const Logo = ({ inDrawer = false }: LogoProps) => {
  return (
    <Link href="/">
      <StyledImageLink $inDrawer={inDrawer}>
        <StyledImage src="/static-cms-logo.svg" width={182} height={72} />
      </StyledImageLink>
    </Link>
  );
};

export default Logo;
