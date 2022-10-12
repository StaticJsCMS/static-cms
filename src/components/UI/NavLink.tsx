import React, { forwardRef } from 'react';
import { NavLink as NavLinkBase } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { Icon, colors } from '../../ui';
import { transientOptions } from '../../lib';

import type { RefAttributes } from 'react';
import type { NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

export type NavLinkBaseProps = RouterNavLinkProps & RefAttributes<HTMLAnchorElement>;

export interface NavLinkProps extends RouterNavLinkProps {
  activeClassName: string;
}

interface StyledNavLinkProps {
  $activeClassName?: string;
}

const StyledNavLinkWrapper = styled(
  'div',
  transientOptions,
)<StyledNavLinkProps>(
  ({ $activeClassName }) => `
    a {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    & > .${$activeClassName} {
      color: ${colors.active};

      ${Icon} {
        color: ${colors.active};
      }
    }
  `,
);

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ activeClassName, ...props }, ref) => (
    <StyledNavLinkWrapper $activeClassName={activeClassName}>
      <NavLinkBase
        ref={ref}
        {...props}
        className={({ isActive }) => (isActive ? activeClassName : '')}
      />
    </StyledNavLinkWrapper>
  ),
);

NavLink.displayName = 'NavLink';

export default NavLink;
