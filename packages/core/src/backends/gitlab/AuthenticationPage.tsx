import { Gitlab as GitlabIcon } from '@styled-icons/simple-icons/Gitlab';
import React, { useCallback, useMemo, useState } from 'react';

import Login from '@staticcms/core/components/login/Login';
import { NetlifyAuthenticator, PkceAuthenticator } from '@staticcms/core/lib/auth';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';

import type {
  AuthenticationPageProps,
  AuthenticatorConfig,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

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
    <Login
      login={handleLogin}
      label={t('auth.loginWithGitLab')}
      icon={GitlabIcon}
      inProgress={inProgress}
      error={loginError}
    />
  );
};

export default GitLabAuthenticationPage;
