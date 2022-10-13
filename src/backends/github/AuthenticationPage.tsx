import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';

import Icon from '../../components/UI/Icon';
import { NetlifyAuthenticator } from '../../lib/auth';
import { AuthenticationPage } from '../../ui';

import type { MouseEvent } from 'react';
import type { AuthenticationPageProps, TranslatedProps } from '../../interface';

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

  const renderLoginButton = useCallback(() => {
    return inProgress ? (
      t('auth.loggingIn')
    ) : (
      <React.Fragment>
        <LoginButtonIcon type="github" />
        {t('auth.loginWithGitHub')}
      </React.Fragment>
    );
  }, [inProgress, t]);

  return (
    <AuthenticationPage
      onLogin={handleLogin}
      loginDisabled={inProgress}
      loginErrorMessage={loginError}
      logoUrl={config.logo_url}
      siteUrl={config.site_url}
      renderButtonContent={renderLoginButton}
      t={t}
    />
  );
};

export default GitHubAuthenticationPage;
