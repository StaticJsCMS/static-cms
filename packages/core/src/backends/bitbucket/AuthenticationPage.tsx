import { Bitbucket as BitbucketIcon } from '@styled-icons/fa-brands/Bitbucket';
import React, { useCallback, useMemo, useState } from 'react';

import Login from '@staticcms/core/components/login/Login';
import { ImplicitAuthenticator, NetlifyAuthenticator } from '@staticcms/core/lib/auth';

import type { AuthenticationPageProps, TranslatedProps } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

const BitbucketAuthenticationPage = ({
  inProgress = false,
  config,
  base_url,
  siteId,
  authEndpoint,
  clearHash,
  onLogin,
  t,
}: TranslatedProps<AuthenticationPageProps>) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const [auth, authSettings] = useMemo(() => {
    const { auth_type: authType = '' } = config.backend;

    if (authType === 'implicit') {
      const {
        base_url = 'https://bitbucket.org',
        auth_endpoint = 'site/oauth2/authorize',
        app_id = '',
      } = config.backend;

      const implicityAuth = new ImplicitAuthenticator({
        base_url,
        auth_endpoint,
        app_id,
        clearHash,
      });

      // Complete implicit authentication if we were redirected back to from the provider.
      implicityAuth.completeAuth((err, data) => {
        if (err) {
          setLoginError(err.toString());
          return;
        } else if (data) {
          onLogin(data);
        }
      });

      return [implicityAuth, { scope: 'repository:write' }];
    } else {
      return [
        new NetlifyAuthenticator({
          base_url,
          site_id:
            document.location.host.split(':')[0] === 'localhost' ? 'cms.netlify.com' : siteId,
          auth_endpoint: authEndpoint,
        }),
        { provider: 'bitbucket', scope: 'repo' },
      ] as const;
    }
  }, [authEndpoint, base_url, clearHash, config.backend, onLogin, siteId]);

  const handleLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      auth.authenticate(authSettings, (err, data) => {
        if (err) {
          setLoginError(err.toString());
        } else if (data) {
          onLogin(data);
        }
      });
    },
    [auth, authSettings, onLogin],
  );

  return (
    <Login
      login={handleLogin}
      label={t('auth.loginWithBitbucket')}
      icon={BitbucketIcon}
      inProgress={inProgress}
      error={loginError}
    />
  );
};

export default BitbucketAuthenticationPage;
