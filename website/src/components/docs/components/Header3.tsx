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
    color: ${theme.palette.text.primary};
    transform: rotateZ(-45deg);

    ${theme.breakpoints.down('sm')} {
      margin-left: -22px;
      top: -1px;
    }
  `,
);

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

interface Header3Props {
  children?: ReactNode;
}

const Header3 = ({ children = '' }: Header3Props) => {
  const anchor = getAnchor(String(children));
  const link = `#${anchor}`;
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
