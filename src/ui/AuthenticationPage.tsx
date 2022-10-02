import styled from '@emotion/styled';
import React from 'react';

import GoBackButton from './GoBackButton';
import Icon from './Icon';
import { buttons, shadows } from './styles';

import type { MouseEventHandler, ReactNode } from 'react';
import type { TranslatedProps } from '../interface';

const StyledAuthenticationPage = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const CustomIconWrapper = styled.span`
  width: 300px;
  height: 200px;
  margin-top: -150px;
`;

const SimpleLogoIcon = styled(Icon)`
  color: #c4c6d2;
  margin-top: -300px;
`;

const SimpleCmsIcon = styled(Icon)`
  color: #c4c6d2;
  position: absolute;
  bottom: 10px;
`;

function CustomLogoIcon({ url }: { url: string }) {
  return (
    <CustomIconWrapper>
      <img src={url} alt="Logo" />
    </CustomIconWrapper>
  );
}

function renderPageLogo(logoUrl?: string) {
  if (logoUrl) {
    return <CustomLogoIcon url={logoUrl} />;
  }
  return <SimpleLogoIcon size="300px" type="simple-cms" />;
}

const LoginButton = styled.button`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};
  &[disabled] {
    ${buttons.disabled};
  }

  padding: 0 12px;
  margin-top: -40px;
  display: flex;
  align-items: center;
  position: relative;
`;

const TextButton = styled.button`
  ${buttons.button};
  ${buttons.default};
  ${buttons.grayText};

  margin-top: 40px;
  display: flex;
  align-items: center;
  position: relative;
`;

export interface AuthenticationPageProps {
  onLogin: MouseEventHandler<HTMLButtonElement>;
  logoUrl?: string;
  siteUrl?: string;
  loginDisabled: boolean;
  loginErrorMessage: ReactNode;
  renderButtonContent?: () => ReactNode;
  renderPageContent?: (options: {
    LoginButton: typeof LoginButton;
    TextButton: typeof TextButton;
    showAbortButton: boolean;
  }) => ReactNode;
}

function AuthenticationPage({
  onLogin,
  loginDisabled,
  loginErrorMessage,
  renderButtonContent,
  renderPageContent,
  logoUrl,
  siteUrl,
  t,
}: TranslatedProps<AuthenticationPageProps>) {
  return (
    <StyledAuthenticationPage>
      {renderPageLogo(logoUrl)}
      {loginErrorMessage ? <p>{loginErrorMessage}</p> : null}
      {!renderPageContent
        ? null
        : renderPageContent({ LoginButton, TextButton, showAbortButton: !siteUrl })}
      {!renderButtonContent ? null : (
        <LoginButton disabled={loginDisabled} onClick={onLogin}>
          {renderButtonContent()}
        </LoginButton>
      )}
      {siteUrl ? <GoBackButton href={siteUrl} t={t} /> : null}
      {logoUrl ? <SimpleCmsIcon size="100px" type="simple-cms" /> : null}
    </StyledAuthenticationPage>
  );
}

export default AuthenticationPage;
