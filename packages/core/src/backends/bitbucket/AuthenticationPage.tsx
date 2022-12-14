import { styled } from '@mui/material/styles';
import React, { useCallback, useMemo, useState } from 'react';

import AuthenticationPage from '@staticcms/core/components/UI/AuthenticationPage';
import Icon from '@staticcms/core/components/UI/Icon';
import { ImplicitAuthenticator, NetlifyAuthenticator } from '@staticcms/core/lib/auth';

import type { MouseEvent } from 'react';
import type { AuthenticationPageProps, TranslatedProps } from '@staticcms/core/interface';

const LoginButtonIcon = styled(Icon)`
  margin-right: 18px;
`;

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
    <AuthenticationPage
      onLogin={handleLogin}
      loginDisabled={inProgress}
      loginErrorMessage={loginError}
      logoUrl={config.logo_url}
      siteUrl={config.site_url}
      icon={<LoginButtonIcon type="bitbucket" />}
      buttonContent={inProgress ? t('auth.loggingIn') : t('auth.loginWithBitbucket')}
      t={t}
    />
  );
};

export default BitbucketAuthenticationPage;
