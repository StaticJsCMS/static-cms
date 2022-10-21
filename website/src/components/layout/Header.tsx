import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';

import type { ButtonTypeMap } from '@mui/material/Button';
import type { ExtendButtonBase } from '@mui/material/ButtonBase';

const StyledToolbar = styled(Toolbar)`
  gap: 16px;
`;

const StyledMenuButton = styled(IconButton)(
  ({ theme }) => `
    ${theme.breakpoints.up('md')} {
      visibility: hidden;
      height: 0;
      width: 0;
      padding: 0;
    }
  `,
);

const StyledGap = styled('div')`
  flex-grow: 1;
`;

const StyledSearchBox = styled(TextField)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;

  .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.8);
  }

  .MuiInputBase-root {
    color: white;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const StyledLink = styled(Button)`
  color: white;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
` as ExtendButtonBase<ButtonTypeMap<{}, 'a'>>;

const Header = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <StyledMenuButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon fontSize="large" />
        </StyledMenuButton>
        <Image src="/static-cms-logo.svg" width={182} height={72} />
        <StyledSearchBox
          placeholder="Search the docs"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <StyledGap />
        <Link href="/docs/intro">
          <StyledLink component="a">Docs</StyledLink>
        </Link>
        <Link href="/docs/contributor-guide">
          <StyledLink component="a">Contributing</StyledLink>
        </Link>
        <Link href="/community">
          <StyledLink component="a">Community</StyledLink>
        </Link>
        <Link href="/blog">
          <StyledLink component="a">Blog</StyledLink>
        </Link>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
