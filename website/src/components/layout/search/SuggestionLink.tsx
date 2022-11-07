import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import type { FC } from 'react';

const StyledSuggestionLink = styled(MuiLink)`
  text-decoration: none;
  display: flex;
  padding-left: 8px;
  transition: gap .1s ease-in-out;
  gap: 0;
  &:hover {
    text-decoration: underline;
    gap: 4px;
  }
`;

interface SuggestionLinkProps {
  href: string;
  children: string;
}

const SuggestionLink: FC<SuggestionLinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <StyledSuggestionLink href={href} color="primary">
        {children}
        <ChevronRightIcon fontSize="small" sx={{ marginTop: '1px', marginLeft: '2px' }} />
      </StyledSuggestionLink>
    </Link>
  );
};

export default SuggestionLink;
