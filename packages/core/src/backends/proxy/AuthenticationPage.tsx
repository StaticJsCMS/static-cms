import React, { useCallback } from 'react';

import Login from '@staticcms/core/components/login/Login';

import type { AuthenticationPageProps } from '@staticcms/core';
import type { FC, MouseEvent } from 'react';

const AuthenticationPage: FC<AuthenticationPageProps> = ({ inProgress = false, onLogin }) => {
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
