import { styled } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';

import AuthenticationPage from '@staticcms/core/components/UI/AuthenticationPage';
import Icon from '@staticcms/core/components/UI/Icon';
import { NetlifyAuthenticator } from '@staticcms/core/lib/auth';

import type { MouseEvent } from 'react';
import type { AuthenticationPageProps, TranslatedProps } from '@staticcms/core/interface';

const LoginButtonIcon = styled(Icon)`
  margin-right: 18px;
`;

const GitHubAuthenticationPage = ({
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
      auth.authenticate({ provider: 'github', scope }, (err, data) => {
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
    <AuthenticationPage
      onLogin={handleLogin}
      loginDisabled={inProgress}
      loginErrorMessage={loginError}
      logoUrl={config.logo_url}
      siteUrl={config.site_url}
      icon={<LoginButtonIcon type="github" />}
      buttonContent={t('auth.loginWithGitHub')}
      t={t}
    />
  );
};

export default GitHubAuthenticationPage;
