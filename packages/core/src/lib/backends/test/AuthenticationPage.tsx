import React, { useCallback, useEffect } from 'react';

import Login from '@staticcms/core/components/login/Login';

import type { AuthenticationPageProps, TranslatedProps } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

const AuthenticationPage = ({
  inProgress = false,
  config,
  onLogin,
}: TranslatedProps<AuthenticationPageProps>) => {
  useEffect(() => {
    /**
     * Allow login screen to be skipped for demo purposes.
     */
    const skipLogin = config.backend.login === false;
    if (skipLogin) {
      onLogin({ token: 'fake_token' });
    }
  }, [config.backend.login, onLogin]);

  const handleLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onLogin({ token: 'fake_token' });
    },
    [onLogin],
  );

  return <Login login={handleLogin} inProgress={inProgress} />;
};

export default AuthenticationPage;
