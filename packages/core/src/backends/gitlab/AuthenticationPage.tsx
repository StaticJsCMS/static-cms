import { styled } from '@mui/material/styles';
import React, { useCallback, useMemo, useState } from 'react';

import AuthenticationPage from '@staticcms/core/components/UI/AuthenticationPage';
import Icon from '@staticcms/core/components/UI/Icon';
import { NetlifyAuthenticator, PkceAuthenticator } from '@staticcms/core/lib/auth';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';

import type { MouseEvent } from 'react';
import type {
  AuthenticationPageProps,
  AuthenticatorConfig,
  TranslatedProps,
} from '@staticcms/core/interface';

const LoginButtonIcon = styled(Icon)`
  margin-right: 18px;
`;

const clientSideAuthenticators = {
  pkce: (config: AuthenticatorConfig) => new PkceAuthenticator(config),
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
      icon={<LoginButtonIcon type="gitlab" />}
      buttonContent={inProgress ? t('auth.loggingIn') : t('auth.loginWithGitLab')}
      t={t}
    />
  );
};

export default GitLabAuthenticationPage;
