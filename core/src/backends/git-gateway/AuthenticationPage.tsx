import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect, useState } from 'react';

import AuthenticationPage from '../../components/UI/AuthenticationPage';
import { colors } from '../../components/UI/styles';

import type { ChangeEvent, FormEvent } from 'react';
import type { AuthenticationPageProps, TranslatedProps, User } from '../../interface';

const StyledAuthForm = styled('form')`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ErrorMessage = styled('div')`
  color: ${colors.errorText};
`;

function useNetlifyIdentifyEvent(eventName: 'login', callback: (login: User) => void): void;
function useNetlifyIdentifyEvent(eventName: 'logout', callback: () => void): void;
function useNetlifyIdentifyEvent(eventName: 'error', callback: (err: Error) => void): void;
function useNetlifyIdentifyEvent(
  eventName: 'login' | 'logout' | 'error',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (input?: any) => void,
): void {
  useEffect(() => {
    window.netlifyIdentity?.on(eventName, callback);
  }, [callback, eventName]);
}

export interface GitGatewayAuthenticationPageProps
  extends TranslatedProps<AuthenticationPageProps> {
  handleAuth: (email: string, password: string) => Promise<User | string>;
}

const GitGatewayAuthenticationPage = ({
  inProgress = false,
  config,
  onLogin,
  handleAuth,
  t,
}: GitGatewayAuthenticationPageProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    identity?: string;
    server?: string;
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    if (!loggedIn && window.netlifyIdentity && window.netlifyIdentity.currentUser()) {
      onLogin(window.netlifyIdentity.currentUser());
      window.netlifyIdentity.close();
    }
  }, [loggedIn, onLogin]);

  const handleIdentityLogin = useCallback(
    (user: User) => {
      onLogin(user);
      window.netlifyIdentity?.close();
    },
    [onLogin],
  );

  useNetlifyIdentifyEvent('login', handleIdentityLogin);

  const handleIdentityLogout = useCallback(() => {
    window.netlifyIdentity?.open();
  }, []);

  useNetlifyIdentifyEvent('logout', handleIdentityLogout);

  const handleIdentityError = useCallback(
    (err: Error) => {
      if (err?.message?.match(/^Failed to load settings from.+\.netlify\/identity$/)) {
        window.netlifyIdentity?.close();
        setErrors({ identity: t('auth.errors.identitySettings') });
      }
    },
    [t],
  );

  useNetlifyIdentifyEvent('error', handleIdentityError);

  const handleIdentity = useCallback(() => {
    const user = window.netlifyIdentity?.currentUser();
    if (user) {
      onLogin(user);
    } else {
      window.netlifyIdentity?.open();
    }
  }, [onLogin]);

  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors: typeof errors = {};
      if (!email) {
        validationErrors.email = t('auth.errors.email');
      }
      if (!password) {
        validationErrors.password = t('auth.errors.password');
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      let response: User | string;
      try {
        response = await handleAuth(email, password);
      } catch (e: unknown) {
        if (e instanceof Error) {
          response = e.message;
        } else {
          response = 'Unknown authentication error';
        }
      }

      if (typeof response === 'string') {
        setErrors({ server: response });
        setLoggedIn(false);
        return;
      }

      onLogin(response);
    },
    [email, handleAuth, onLogin, password, t],
  );

  if (window.netlifyIdentity) {
    if (errors.identity) {
      return (
        <AuthenticationPage
          logoUrl={config.logo_url}
          siteUrl={config.site_url}
          onLogin={handleIdentity}
          pageContent={
            <a
              href="https://docs.netlify.com/visitor-access/git-gateway/#setup-and-settings"
              target="_blank"
              rel="noopener noreferrer"
            >
              {errors.identity}
            </a>
          }
          t={t}
        />
      );
    } else {
      return (
        <AuthenticationPage
          logoUrl={config.logo_url}
          siteUrl={config.site_url}
          onLogin={handleIdentity}
          buttonContent={t('auth.loginWithNetlifyIdentity')}
          t={t}
        />
      );
    }
  }

  return (
    <AuthenticationPage
      logoUrl={config.logo_url}
      siteUrl={config.site_url}
      pageContent={
        <StyledAuthForm onSubmit={handleLogin}>
          {!errors.server ? null : <ErrorMessage>{String(errors.server)}</ErrorMessage>}
          <TextField
            type="text"
            name="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email ?? undefined}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            error={Boolean(errors.password)}
            helperText={errors.password ?? undefined}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={inProgress}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            {inProgress ? t('auth.loggingIn') : t('auth.login')}
          </Button>
        </StyledAuthForm>
      }
      t={t}
    />
  );
};

export default GitGatewayAuthenticationPage;
