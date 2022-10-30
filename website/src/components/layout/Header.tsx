import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';

import Search from './Search';
import NavigationDrawer from './mobile-drawer/NavigationDrawer';

import type { PaletteMode } from '@mui/material';
import type { ButtonTypeMap } from '@mui/material/Button';
import type { ExtendButtonBase } from '@mui/material/ButtonBase';
import type { DocsGroup, MenuItem } from '../../interface';

const StyledAppBar = styled(AppBar)(
  ({ theme }) => `
    background: ${theme.palette.mode === 'light' ? theme.palette.primary.main : '#121212'};
  `,
);

const StyledToolbar = styled(Toolbar)(
  ({ theme }) => `
    gap: 16px;

    ${theme.breakpoints.down('md')} {
      justify-content: space-between;
    }
  `,
);

const StyledGithubLink = styled('a')(
  ({ theme }) => `
    display: flex;

    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `,
);

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

const StyledDesktopGap = styled('div')(
  ({ theme }) => `
    flex-grow: 1;

    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `,
);

const StyledDesktopLink = styled(Button)(
  ({ theme }) => `
    color: white;

    &:hover {
      color: rgba(255, 255, 255, 0.6);
    }

    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `,
) as ExtendButtonBase<ButtonTypeMap<{}, 'a'>>;

const StyledImageLink = styled('a')`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

interface HeaderProps {
  mode: PaletteMode;
  groups: DocsGroup[];
  toggleColorMode: () => void;
}

const Header = ({ mode, groups, toggleColorMode }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const items = useMemo(
    () =>
      [
        {
          title: 'Docs',
          menuItems: groups.flatMap(group =>
            group.links.map(link => ({
              title: link.title,
              url: `/docs/${link.slug}`,
            })),
          ),
        },
        {
          title: 'Contributing',
          url: '/docs/contributor-guide',
        },
        {
          title: 'Community',
          url: '/community',
        },
      ] as MenuItem[],
    [groups],
  );

  return (
    <>
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
          <Search />
          <IconButton
            sx={{ ml: 1 }}
            onClick={toggleColorMode}
            color="inherit"
            title={mode === 'dark' ? 'Turn on the light' : 'Turn off the light'}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <StyledDesktopGap />
          <StyledGithubLink
            href="https://github.com/StaticJsCMS/static-cms"
            aria-label="Star StaticJsCMS/static-cms on GitHub"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Star StaticJsCMS/static-cms on GitHub"
              src="https://img.shields.io/github/stars/StaticJsCMS/static-cms?style=social"
            />
          </StyledGithubLink>
          {items.map(item => {
            const url =
              'url' in item ? item.url : item.menuLinks.length > 0 ? item.menuLinks[0].url : '#';
            return (
              <Link key={`desktop-${item.title}-${url}`} href={url}>
                <StyledDesktopLink component="a">Docs</StyledDesktopLink>
              </Link>
            );
          })}
          {/* <Link href="/blog">
          <StyledLink component="a">Blog</StyledLink>
        </Link> */}
        </StyledToolbar>
      </StyledAppBar>
      <NavigationDrawer
        key="mobile-navigation-drawer"
        items={items}
        mobileOpen={mobileOpen}
        onMobileOpenToggle={handleDrawerToggle}
      />
    </>
  );
};

export default Header;
