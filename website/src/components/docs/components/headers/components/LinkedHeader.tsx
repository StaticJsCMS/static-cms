import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useMemo } from 'react';

import { useNodeText } from '../../../../../util/node.util';
import AnchorLinkIcon from './AnchorLinkIcon';
import useAnchor from '../hooks/useAnchor';

import type { ReactNode } from 'react';

const StyledLink = styled('a')(
  ({ theme }) => `
    position: absolute;
    margin-left: -28px;
    top: 0;
    font-weight: 300;
    color: ${theme.palette.text.primary};
    transform: rotateZ(-45deg);

    ${theme.breakpoints.down('sm')} {
      margin-left: -22px;
      top: -1px;
    }
  `,
);

interface Header3Props {
  variant: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
}

const Header3 = ({ variant, children = '' }: Header3Props) => {
  const textContent = useNodeText(children);
  const anchor = useAnchor(textContent);
  const link = useMemo(() => `#${anchor}`, [anchor]);
  const theme = useTheme();
  return (
    <Typography
      variant={variant}
      id={anchor}
      sx={{
        [theme.breakpoints.down('sm')]: {
          marginLeft: '8px',
        },
      }}
    >
      <Link href={link} className="anchor-link">
        <StyledLink href={link}>
          <AnchorLinkIcon variant={variant} />
        </StyledLink>
      </Link>
      {children}
    </Typography>
  );
};

export default Header3;
