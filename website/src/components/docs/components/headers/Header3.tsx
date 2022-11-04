import LinkIcon from '@mui/icons-material/Link';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useMemo } from 'react';

import { useNodeText } from '../../../../util/node.util';
import useAnchor from './hooks/useAnchor';

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
  children?: ReactNode;
}

const Header3 = ({ children = '' }: Header3Props) => {
  const textContent = useNodeText(children);
  const anchor = useAnchor(textContent);
  const link = useMemo(() => `#${anchor}`, [anchor]);
  const theme = useTheme();
  return (
    <Typography
      variant="h3"
      id={anchor}
      sx={{
        [theme.breakpoints.down('sm')]: {
          marginLeft: '8px',
        },
      }}
    >
      <Link href={link} className="anchor-link">
        <StyledLink href={link}>
          <LinkIcon
            fontSize="small"
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                height: '20px',
                width: '20px',
                marginTop: '2px',
              },
            }}
          />
        </StyledLink>
      </Link>
      {children}
    </Typography>
  );
};

export default Header3;
