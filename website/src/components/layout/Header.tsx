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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import type { ButtonTypeMap } from '@mui/material/Button';
import type { ExtendButtonBase } from '@mui/material/ButtonBase';
import type { PaletteMode } from '@mui/material';

const StyledAppBar = styled(AppBar)(
  ({ theme }) => `
    background: ${theme.palette.mode === 'light' ? theme.palette.primary.main : '#121212'};
  `,
);

const StyledToolbar = styled(Toolbar)`
  gap: 16px;
`;

const StyledGithubLink = styled('a')`
  display: flex;
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

const StyledImageLink = styled('a')`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

interface HeaderProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const Header = ({ mode, toggleColorMode }: HeaderProps) => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <StyledMenuButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon fontSize="large" />
        </StyledMenuButton>
        <Link href="/">
          <StyledImageLink>
            <StyledImage src="/static-cms-logo.svg" width={182} height={72} />
          </StyledImageLink>
        </Link>
        <StyledSearchBox
          placeholder="Search the docs"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggleColorMode}
          color="inherit"
          title={mode === 'dark' ? 'Turn on the light' : 'Turn off the light'}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <StyledGap />
        <StyledGithubLink
          href="https://github.com/StaticJsCMS/static-cms"
          aria-label="Star StaticJsCMS/static-cms on GitHub"
        >
          <img
            alt="Star StaticJsCMS/static-cms on GitHub"
            src="https://img.shields.io/github/stars/StaticJsCMS/static-cms?style=social"
          />
        </StyledGithubLink>
        <Link href="/docs/intro">
          <StyledLink component="a">Docs</StyledLink>
        </Link>
        <Link href="/docs/contributor-guide">
          <StyledLink component="a">Contributing</StyledLink>
        </Link>
        <Link href="/community">
          <StyledLink component="a">Community</StyledLink>
        </Link>
        {/* <Link href="/blog">
          <StyledLink component="a">Blog</StyledLink>
        </Link> */}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
