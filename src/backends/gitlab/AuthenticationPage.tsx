import styled from '@emotion/styled';
import React, { useCallback, useMemo, useState } from 'react';

import Icon from '../../components/UI/Icon';
import { ImplicitAuthenticator, NetlifyAuthenticator, PkceAuthenticator } from '../../lib/auth';
import { isNotEmpty } from '../../lib/util/string.util';
import { AuthenticationPage } from '../../ui';

import type { MouseEvent } from 'react';
import type {
  AuthenticationPageProps,
  AuthenticatorConfig,
  TranslatedProps,
} from '../../interface';

const LoginButtonIcon = styled(Icon)`
  margin-right: 18px;
`;

const clientSideAuthenticators = {
  pkce: (config: AuthenticatorConfig) => new PkceAuthenticator(config),
  implicit: (config: AuthenticatorConfig) => new ImplicitAuthenticator(config),
} as const;

const GitLabAuthenticationPage = ({
  inProgress = false,
  config,
  siteId,
  authEndpoint,
  clearHash,
  onLogin,
  t,
}: TranslatedProps<AuthenticationPageProps>) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const auth = useMemo(() => {
    const {
      auth_type: authType = '',
      base_url = 'https://gitlab.com',
      auth_endpoint = 'oauth/authorize',
      app_id = '',
    } = config.backend;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isNotEmpty(authType) && authType in clientSideAuthenticators) {
      const clientSizeAuth = clientSideAuthenticators[
        authType as keyof typeof clientSideAuthenticators
      ]({
        base_url,
        auth_endpoint,
        app_id,
        auth_token_endpoint: 'oauth/token',
        clearHash,
      });
      // Complete implicit authentication if we were redirected back to from the provider.
      clientSizeAuth.completeAuth((err, data) => {
        if (err) {
          setLoginError(err.toString());
        } else if (data) {
          onLogin(data);
        }
      });
      return clientSizeAuth;
    } else {
      return new NetlifyAuthenticator({
        base_url,
        site_id: document.location.host.split(':')[0] === 'localhost' ? 'cms.netlify.com' : siteId,
        auth_endpoint: authEndpoint,
      });
    }
  }, [authEndpoint, clearHash, config.backend, onLogin, siteId]);

  const handleLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      auth.authenticate({ provider: 'gitlab', scope: 'api' }, err => {
        if (err) {
          setLoginError(err.toString());
          return;
        }
      });
    },
    [auth],
  );

  return (
    <AuthenticationPage
      onLogin={handleLogin}
      loginDisabled={inProgress}
      loginErrorMessage={loginError}
      logoUrl={config.logo_url}
      siteUrl={config.site_url}
      renderButtonContent={() => (
        <React.Fragment>
          <LoginButtonIcon type="gitlab" />{' '}
          {inProgress ? t('auth.loggingIn') : t('auth.loginWithGitLab')}
        </React.Fragment>
      )}
      t={t}
    />
  );
};

export default GitLabAuthenticationPage;
