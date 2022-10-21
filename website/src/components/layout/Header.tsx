import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';

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
        <Link href="/docs/intro">Docs</Link>
        <Link href="/docs/contributor-guide">Contributing</Link>
        <Link href="/community">Docs</Link>
        <Link href="/blog">Blog</Link>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
