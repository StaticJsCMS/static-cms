import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { AuthenticationPage, buttons, shadows, colors, colorsRaw, lengths, zIndex } from '../../ui';

import type { FormEvent,ChangeEvent } from 'react';
import type { User, AuthenticationPageProps, TranslatedProps } from '../../interface';

const LoginButton = styled.button`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};

  padding: 0 30px;
  display: block;
  margin-top: 20px;
  margin-left: auto;
`;

const AuthForm = styled.form`
  width: 350px;
  margin-top: -80px;
`;

const AuthInput = styled.input`
  background-color: ${colorsRaw.white};
  border-radius: ${lengths.borderRadius};

  font-size: 14px;
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 6px;
  width: 100%;
  position: relative;
  z-index: ${zIndex.zIndex1};
  border: 1px solid ${colorsRaw.gray};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${colors.active};
    border: 1px solid transparent;
  }
`;

const ErrorMessage = styled.p`
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

interface GitGatewayAuthenticationPageProps extends TranslatedProps<AuthenticationPageProps> {
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

      const response = await handleAuth(email, password);
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
          renderPageContent={() => (
            <a
              href="https://docs.netlify.com/visitor-access/git-gateway/#setup-and-settings"
              target="_blank"
              rel="noopener noreferrer"
            >
              {errors.identity}
            </a>
          )}
          t={t}
        />
      );
    } else {
      return (
        <AuthenticationPage
          logoUrl={config.logo_url}
          siteUrl={config.site_url}
          onLogin={handleIdentity}
          renderButtonContent={() => t('auth.loginWithNetlifyIdentity')}
          t={t}
        />
      );
    }
  }

  return (
    <AuthenticationPage
      logoUrl={config.logo_url}
      siteUrl={config.site_url}
      renderPageContent={() => (
        <AuthForm onSubmit={handleLogin}>
          {/* {!error ? null : <ErrorMessage>{error}</ErrorMessage>} */}
          {!errors.server ? null : <ErrorMessage>{String(errors.server)}</ErrorMessage>}
          <ErrorMessage>{errors.email || null}</ErrorMessage>
          <AuthInput
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <ErrorMessage>{errors.password || null}</ErrorMessage>
          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <LoginButton disabled={inProgress}>
            {inProgress ? t('auth.loggingIn') : t('auth.login')}
          </LoginButton>
        </AuthForm>
      )}
      t={t}
    />
  );
};

export default GitGatewayAuthenticationPage;
