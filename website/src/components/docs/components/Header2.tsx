import LinkIcon from '@mui/icons-material/Link';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { getNodeText } from '../../../util/node.util';

import type { ReactNode } from 'react';

const StyledLink = styled('a')(
  ({ theme }) => `
    position: absolute;
    margin-left: -28px;
    top: -1px;
    font-weight: 300;
    color: ${theme.palette.secondary.main};
    transform: rotateZ(-45deg);

    ${theme.breakpoints.down('sm')} {
      margin-left: -22px;
    }
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
  const textContent = getNodeText(children);
  const anchor = getAnchor(textContent);
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

export default Header2;
