import React, { useCallback, useEffect, useMemo, useState } from 'react';

import AuthenticationPage from '../../components/UI/AuthenticationPage';

import type { AuthenticationPageProps, TranslatedProps, User } from '../../interface';

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
  config,
  onLogin,
  t,
}: GitGatewayAuthenticationPageProps) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState<{
    identity?: string;
    server?: string;
    email?: string;
    password?: string;
  }>({});

  // useEffect(() => {
  //   if (!loggedIn && window.netlifyIdentity && window.netlifyIdentity.currentUser()) {
  //     console.log('current user', window.netlifyIdentity.currentUser());
  //     onLogin(window.netlifyIdentity.currentUser());
  //     window.netlifyIdentity.close();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleIdentityLogin = useCallback(
    (user: User) => {
      console.log('handleIdentityLogin', user);
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
    console.log('handleIdentity', user);
    if (user) {
      onLogin(user);
    } else {
      window.netlifyIdentity?.open();
    }
  }, [onLogin]);

  const pageContent = useMemo(() => {
    if (!window.netlifyIdentity) {
      return t('auth.errors.netlifyIdentityNotFound');
    }

    if (errors.identity) {
      return (
        <a
          href="https://docs.netlify.com/visitor-access/git-gateway/#setup-and-settings"
          target="_blank"
          rel="noopener noreferrer"
        >
          {errors.identity}
        </a>
      );
    }

    return null;
  }, [errors.identity, t]);

  return (
    <AuthenticationPage
      key="git-gateway-auth"
      logoUrl={config.logo_url}
      siteUrl={config.site_url}
      onLogin={handleIdentity}
      buttonContent={t('auth.loginWithNetlifyIdentity')}
      pageContent={pageContent}
      t={t}
    />
  );
};

export default GitGatewayAuthenticationPage;
