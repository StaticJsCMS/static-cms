import React from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { StaticCmsLogo } from '../images/_index';
import GoBackButton from './GoBackButton';

import type { FC, MouseEventHandler, ReactNode } from 'react';

import './Login.css';

export const classes = generateClassNames('Login', [
  'root',
  'custom-logo',
  'static-cms-logo',
  'error',
  'error-icon',
  'error-sr-label',
  'button',
]);

export interface LoginProps {
  inProgress?: boolean;
  login: MouseEventHandler;
  icon?: FC<{ className?: string | undefined }>;
  label?: string;
  error?: ReactNode;
  disabled?: boolean;
}

const Login: FC<LoginProps> = ({
  inProgress = false,
  login,
  icon,
  label,
  error,
  disabled = false,
}) => {
  const t = useTranslate();

  const config = useAppSelector(selectConfig);

  return (
    <div className={classes.root}>
      {config?.logo_url ? (
        <div
          className={classes['custom-logo']}
          style={{ backgroundImage: `url('${config.logo_url}')` }}
        />
      ) : (
        <StaticCmsLogo className={classes['static-cms-logo']} />
      )}
      {error ? (
        <div className={classes.error} data-testid="login-error" role="alert">
          <svg
            aria-hidden="true"
            className={classes['error-icon']}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className={classes['error-sr-label']}>Info</span>
          <div>{error}</div>
        </div>
      ) : null}
      <Button
        disabled={inProgress || disabled}
        onClick={login}
        className={classes.button}
        startIcon={icon}
        data-testid="login-button"
      >
        {inProgress ? t('auth.loggingIn') : label ?? t('auth.login')}
      </Button>
      {config?.site_url && <GoBackButton href={config.site_url} />}
    </div>
  );
};

export default Login;
