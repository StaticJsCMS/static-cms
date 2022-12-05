import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';

import GoBackButton from './GoBackButton';
import Icon from './Icon';

import type { MouseEventHandler, ReactNode } from 'react';
import type { TranslatedProps } from '@staticcms/core/interface';

const StyledAuthenticationPage = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const CustomIconWrapper = styled('span')`
  width: 300px;
  height: 15∏0px;
  margin-top: -150px;
`;

const SimpleLogoIcon = styled(Icon)`
  color: #c4c6d2;
`;

const StaticCustomIcon = styled(Icon)`
  color: #c4c6d2;
`;

const CustomLogoIcon = ({ url }: { url: string }) => {
  return (
    <CustomIconWrapper>
      <img src={url} alt="Logo" />
    </CustomIconWrapper>
  );
};

const renderPageLogo = (logoUrl?: string) => {
  if (logoUrl) {
    return <CustomLogoIcon url={logoUrl} />;
  }
  return <SimpleLogoIcon width={300} height={150} type="static-cms" />;
};

export interface AuthenticationPageProps {
  onLogin?: MouseEventHandler<HTMLButtonElement>;
  logoUrl?: string;
  siteUrl?: string;
  loginDisabled?: boolean;
  loginErrorMessage?: ReactNode;
  icon?: ReactNode;
  buttonContent?: ReactNode;
  pageContent?: ReactNode;
}

const AuthenticationPage = ({
  onLogin,
  loginDisabled,
  loginErrorMessage,
  icon,
  buttonContent,
  pageContent,
  logoUrl,
  siteUrl,
  t,
}: TranslatedProps<AuthenticationPageProps>) => {
  return (
    <StyledAuthenticationPage>
      {renderPageLogo(logoUrl)}
      {loginErrorMessage ? <p>{loginErrorMessage}</p> : null}
      {pageContent ?? null}
      {buttonContent ? (
        <Button variant="contained" disabled={loginDisabled} onClick={onLogin} startIcon={icon}>
          {buttonContent}
        </Button>
      ) : null}
      {siteUrl ? <GoBackButton href={siteUrl} t={t} /> : null}
      {logoUrl ? <StaticCustomIcon width={100} height={100} type="static-cms" /> : null}
    </StyledAuthenticationPage>
  );
};

export default AuthenticationPage;
