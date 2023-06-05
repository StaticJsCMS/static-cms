import { Gitea as GiteaIcon } from '@styled-icons/simple-icons/Gitea';
import React, { useCallback, useMemo, useState } from 'react';

import Login from '@staticcms/core/components/login/Login';
import { PkceAuthenticator } from '@staticcms/core/lib/auth';

import type { AuthenticationPageProps, TranslatedProps } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

const GiteaAuthenticationPage = ({
  inProgress = false,
  config,
  base_url,
  siteId,
  clearHash,
  onLogin,
  t,
}: TranslatedProps<AuthenticationPageProps>) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const auth = useMemo(() => {
    const {
      base_url = 'https://try.gitea.io',
      app_id = '',
    } = config.backend;

    const clientSizeAuth = new PkceAuthenticator({
      base_url,
      auth_endpoint: 'login/oauth/authorize',
      app_id,
      auth_token_endpoint: 'login/oauth/access_token',
      clearHash,
    });

    // Complete authentication if we were redirected back to from the provider.
    clientSizeAuth.completeAuth((err, data) => {
      if (err) {
        setLoginError(err.toString());
      } else if (data) {
        onLogin(data);
      }
    });
    return clientSizeAuth;
  }, [clearHash, config.backend, onLogin]);

  const handleLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      auth.authenticate({ scope: 'repository' }, err => {
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
      label={t('auth.loginWithGitea')}
      icon={GiteaIcon}
      inProgress={inProgress}
      error={loginError}
    />
  );
};

export default GiteaAuthenticationPage;
