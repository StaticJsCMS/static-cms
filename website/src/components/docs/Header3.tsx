import LinkIcon from '@mui/icons-material/Link';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

import type { ReactNode } from 'react';

const StyledLink = styled('a')(
  ({ theme }) => `
    position: absolute;
    margin-left: -28px;
    top: 0;
    font-weight: 300;
    color: ${theme.palette.text.primary};
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

const Header3 = ({ children = '' }: Header2Props) => {
  const anchor = getAnchor(String(children));
  const link = `#${anchor}`;
  return (
    <h3 id={anchor}>
      <Link href={link} className="anchor-link">
        <StyledLink href={link}>
          <LinkIcon fontSize="small" />
        </StyledLink>
      </Link>
      {children}
    </h3>
  );
};

export default Header3;
