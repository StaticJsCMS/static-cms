import { Gitea as GiteaIcon } from '@styled-icons/simple-icons/Gitea';
import React, { useCallback, useState } from 'react';

import Login from '@staticcms/core/components/login/Login';
import { NetlifyAuthenticator } from '@staticcms/core/lib/auth';

import type { AuthenticationPageProps, TranslatedProps } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

const GiteaAuthenticationPage = ({
  inProgress = false,
  config,
  base_url,
  siteId,
  authEndpoint,
  onLogin,
  t,
}: TranslatedProps<AuthenticationPageProps>) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const cfg = {
        base_url,
        site_id: document.location.host.split(':')[0] === 'localhost' ? 'cms.netlify.com' : siteId,
        auth_endpoint: authEndpoint,
      };
      const auth = new NetlifyAuthenticator(cfg);

      const { auth_scope: authScope = '' } = config.backend;

      const scope = authScope || 'repo';
      auth.authenticate({ provider: 'gitea', scope }, (err, data) => {
        if (err) {
          setLoginError(err.toString());
        } else if (data) {
          onLogin(data);
        }
      });
    },
    [authEndpoint, base_url, config.backend, onLogin, siteId],
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
