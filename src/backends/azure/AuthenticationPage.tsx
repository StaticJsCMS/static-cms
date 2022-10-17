import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import alert from '../../components/UI/Alert';
import AuthenticationPage from '../../components/UI/AuthenticationPage';
import Icon from '../../components/UI/Icon';
import { ImplicitAuthenticator } from '../../lib/auth';

import type { MouseEvent } from 'react';
import type { AuthenticationPageProps, TranslatedProps } from '../../interface';

const LoginButtonIcon = styled(Icon)`
  margin-right: 18px;
`;

const AzureAuthenticationPage = ({
  inProgress = false,
  config,
  clearHash,
  onLogin,
  t,
}: TranslatedProps<AuthenticationPageProps>) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const auth = useMemo(
    () =>
      new ImplicitAuthenticator({
        base_url: `https://login.microsoftonline.com/${config.backend.tenant_id}`,
        auth_endpoint: 'oauth2/authorize',
        app_id: config.backend.app_id,
        clearHash,
      }),
    [clearHash, config.backend.app_id, config.backend.tenant_id],
  );

  useEffect(() => {
    // Complete implicit authentication if we were redirected back to from the provider.
    auth.completeAuth((err, data) => {
      if (err) {
        alert({
          title: 'auth.errors.authTitle',
          body: { key: 'auth.errors.authBody', options: { details: err } },
        });
        return;
      } else if (data) {
        onLogin(data);
      }
    });
  }, [auth, onLogin]);

  const handleLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      auth.authenticate(
        {
          scope: 'vso.code_full,user.read',
          resource: '499b84ac-1321-427f-aa17-267ca6975798',
          prompt: 'select_account',
        },
        (err, data) => {
          if (err) {
            setLoginError(err.toString());
          } else if (data) {
            onLogin(data);
          }
        },
      );
    },
    [auth, onLogin],
  );

  return (
    <AuthenticationPage
      onLogin={handleLogin}
      loginDisabled={inProgress}
      loginErrorMessage={loginError}
      logoUrl={config.logo_url}
      renderButtonContent={() => (
        <React.Fragment>
          <LoginButtonIcon type="azure" />
          {inProgress ? t('auth.loggingIn') : t('auth.loginWithAzure')}
        </React.Fragment>
      )}
      t={t}
    />
  );
};

export default AzureAuthenticationPage;
