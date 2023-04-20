import React from 'react';
import { translate } from 'react-polyglot';

import Button from '@staticcms/core/components/common/button/Button';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { StaticCmsLogo } from '../images/_index';
import GoBackButton from './GoBackButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC, MouseEventHandler, ReactNode } from 'react';

export interface LoginProps {
  inProgress?: boolean;
  login: MouseEventHandler;
  icon?: FC<{ className?: string | undefined }>;
  label?: string;
  error?: ReactNode;
  disabled?: boolean;
}

const Login = ({
  inProgress = false,
  login,
  icon,
  label,
  error,
  disabled = false,
  t,
}: TranslatedProps<LoginProps>) => {
  const config = useAppSelector(selectConfig);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
      {config?.logo_url ? <img src={config.logo_url} /> : <StaticCmsLogo className="h-40 w-80" />}
      {error ? (
        <div
          className="flex px-4 py-3 mb-6 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
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
          <span className="sr-only">Info</span>
          <div>{error}</div>
        </div>
      ) : null}
      <Button disabled={inProgress || disabled} onClick={login} className="mb-6" startIcon={icon}>
        {inProgress ? t('auth.loggingIn') : label ?? t('auth.login')}
      </Button>
      {config?.site_url && <GoBackButton href={config.site_url} t={t}></GoBackButton>}
    </div>
  );
};

export default translate()(Login) as FC<LoginProps>;
