import { Github as GithubIcon } from '@styled-icons/simple-icons/Github';
import React, { useCallback, useState } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import Login from '@staticcms/core/components/login/Login';
import { NetlifyAuthenticator } from '@staticcms/core/lib/auth';
import useCurrentBackend from '@staticcms/core/lib/hooks/useCurrentBackend';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { AuthenticationPageProps, User } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';
import type GitHub from './implementation';

import './AuthenticationPage.css';

const classes = generateClassNames('Github_AuthenticationPage', [
  'fork-approve-container',
  'fork-text',
  'fork-buttons',
]);

const GitHubAuthenticationPage: FC<AuthenticationPageProps> = ({
  inProgress = false,
  config,
  base_url,
  siteId,
  authEndpoint,
  onLogin,
}) => {
  const t = useTranslate();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [forkState, setForkState] = useState<{
    requestingFork?: boolean;
    findingFork?: boolean;
    approveFork?: () => void;
  }>();

  const { requestingFork = false, findingFork = false, approveFork } = forkState ?? {};

  const backend = useCurrentBackend();

  const getPermissionToFork = useCallback(() => {
    return new Promise<boolean>(resolve => {
      setForkState({
        findingFork: true,
        requestingFork: true,
        approveFork: () => {
          setForkState({
            findingFork: true,
            requestingFork: false,
          });
          resolve(true);
        },
      });
    });
  }, []);

  const loginWithOpenAuthoring = useCallback(
    (userData: User): Promise<void> => {
      if (backend?.backendName !== 'github') {
        return Promise.resolve();
      }

      const githubBackend = backend.implementation as GitHub;

      setForkState({ findingFork: true });
      return githubBackend
        .authenticateWithFork({ userData, getPermissionToFork })
        .then(() => {
          setForkState({ findingFork: false });
        })
        .catch(() => {
          setForkState({ findingFork: false });
          console.error('Cannot create fork');
        });
    },
    [backend?.backendName, backend?.implementation, getPermissionToFork],
  );

  const handleLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const cfg = {
        base_url,
        site_id: document.location.host.split(':')[0] === 'localhost' ? 'cms.netlify.com' : siteId,
        auth_endpoint: authEndpoint,
      };
      const auth = new NetlifyAuthenticator(cfg);

      const { auth_scope: authScope = '', open_authoring: openAuthoringEnabled } = config.backend;

      const scope = authScope || (openAuthoringEnabled ? 'public_repo' : 'repo');
      auth.authenticate({ provider: 'github', scope }, (err, data) => {
        if (err) {
          setLoginError(err.toString());
          return;
        }

        if (data) {
          if (openAuthoringEnabled) {
            return loginWithOpenAuthoring(data).then(() => onLogin(data));
          }

          onLogin(data);
        }
      });
    },
    [authEndpoint, base_url, config.backend, loginWithOpenAuthoring, onLogin, siteId],
  );

  return (
    <Login
      login={handleLogin}
      label={t('auth.loginWithGitHub')}
      icon={GithubIcon}
      inProgress={inProgress || findingFork || requestingFork}
      error={loginError}
      buttonContent={
        requestingFork ? (
          <div className={classes['fork-approve-container']}>
            <p className={classes['fork-text']}>{t('workflow.openAuthoring.forkRequired')}</p>
            <div className={classes['fork-buttons']}>
              <Button onClick={approveFork}>{t('workflow.openAuthoring.forkRepo')}</Button>
            </div>
          </div>
        ) : null
      }
    />
  );
};

export default GitHubAuthenticationPage;
