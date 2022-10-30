import LinkIcon from '@mui/icons-material/Link';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import type { ReactNode } from 'react';

const StyledLink = styled('a')(
  ({ theme }) => `
    position: absolute;
    margin-left: -28px;
    top: 0;
    font-weight: 300;
    color: ${theme.palette.secondary.main};
    transform: rotateZ(-45deg)
  `,
);

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

interface Header2Props {
  children?: ReactNode;
}

const Header2 = ({ children = '' }: Header2Props) => {
  const anchor = getAnchor(String(children));
  const link = `#${anchor}`;
  const theme = useTheme();
  return (
    <Typography
      variant="h2"
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
            fontSize="medium"
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                height: '20px',
                width: '20px',
                marginTop: '2px'
              },
            }}
          />
        </StyledLink>
      </Link>
      {children}
    </Typography>
  );
};

export default Header2;
