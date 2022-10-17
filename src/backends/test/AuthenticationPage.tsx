import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect } from 'react';

import GoBackButton from '../../components/UI/GoBackButton';
import Icon from '../../components/UI/Icon';

import type { MouseEvent } from 'react';
import type { AuthenticationPageProps, TranslatedProps } from '../../interface';

const StyledAuthenticationPage = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const PageLogoIcon = styled(Icon)`
  color: #c4c6d2;
`;

const AuthenticationPage = ({
  inProgress = false,
  config,
  onLogin,
  t,
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

  return (
    <StyledAuthenticationPage>
      <PageLogoIcon width={300} height={150} type="static-cms" />
      <Button
        disabled={inProgress}
        onClick={handleLogin}
        variant="contained"
        sx={{ marginBottom: '32px' }}
      >
        {inProgress ? t('auth.loggingIn') : t('auth.login')}
      </Button>
      {config.site_url && <GoBackButton href={config.site_url} t={t}></GoBackButton>}
    </StyledAuthenticationPage>
  );
};

export default AuthenticationPage;
