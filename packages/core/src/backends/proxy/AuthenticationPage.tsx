import React, { useCallback } from 'react';

import Login from '@staticcms/core/components/login/Login';

import type { AuthenticationPageProps, TranslatedProps } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

const AuthenticationPage = ({
  inProgress = false,
  onLogin,
}: TranslatedProps<AuthenticationPageProps>) => {
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
