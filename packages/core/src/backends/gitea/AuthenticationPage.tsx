import { Gitea as GiteaIcon } from '@styled-icons/simple-icons/Gitea';
import React, { useCallback, useMemo, useState } from 'react';

import Login from '@staticcms/core/components/login/Login';
import { PkceAuthenticator } from '@staticcms/core/lib/auth';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';

import type { AuthenticationPageProps } from '@staticcms/core';
import type { FC, MouseEvent } from 'react';

const GiteaAuthenticationPage: FC<AuthenticationPageProps> = ({
  inProgress = false,
  config,
  clearHash,
  onLogin,
}) => {
  const t = useTranslate();

  const [loginError, setLoginError] = useState<string | null>(null);

  const auth = useMemo(() => {
    const { base_url = 'https://try.gitea.io', app_id = '' } = config.backend;

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
