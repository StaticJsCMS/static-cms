import 'symbol-observable';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18n } from 'react-polyglot';
import { connect, Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { authenticateUser } from './actions/auth';
import { loadConfig } from './actions/config';
import App from './components/App';
import './components/entry-editor/widgets';
import ErrorBoundary from './components/ErrorBoundary';
import addExtensions from './extensions';
import useMeta from './lib/hooks/useMeta';
import useTranslate from './lib/hooks/useTranslate';
import { getPhrases } from './lib/phrases';
import { selectLocale } from './reducers/selectors/config';
import { store } from './store';

import type { AnyAction } from '@reduxjs/toolkit';
import type { FC } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { BaseField, Config, UnknownField } from './interface';
import type { RootState } from './store';

import './styles/main.css';

const ROOT_ID = 'nc-root';

/**
 * Very hacky. This suppresses the "You are importing createRoot from "react-dom" which
 * is not supported. You should instead import it from "react-dom/client"." warning.
 *
 * Not sure why this is necessary as we import from "react-dom/client" as we should.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/order
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = true;

const TranslatedApp: FC<AppRootProps> = ({ locale, config }) => {
  const t = useTranslate();

  useMeta({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' });

  if (!config) {
    return null;
  }

  return (
    <I18n locale={locale} messages={getPhrases(locale)}>
      <ErrorBoundary showBackup config={config} t={t}>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </I18n>
  );
};

function mapDispatchToProps(state: RootState) {
  return { locale: selectLocale(state.config.config), config: state.config.config };
}

const connector = connect(mapDispatchToProps);
export type AppRootProps = ConnectedProps<typeof connector>;

const ConnectedTranslatedApp = connector(TranslatedApp);

function bootstrap<F extends BaseField = UnknownField>(opts?: {
  config?: Config<F>;
  autoInitialize?: boolean;
}) {
  const { config, autoInitialize = true } = opts ?? {};

  /**
   * Log the version number.
   */
  if (typeof STATIC_CMS_CORE_VERSION === 'string') {
    console.info(`[StaticCMS] Using @staticcms/core ${STATIC_CMS_CORE_VERSION}`);
  }

  /**
   * Get DOM element where app will mount.
   */
  function getRoot() {
    /**
     * Return existing root if found.
     */
    const existingRoot = document.getElementById(ROOT_ID);
    if (existingRoot) {
      return existingRoot;
    }

    /**
     * If no existing root, create and return a new root.
     */
    const newRoot = document.createElement('div');
    newRoot.id = ROOT_ID;
    document.body.appendChild(newRoot);
    return newRoot;
  }

  if (autoInitialize) {
    addExtensions();
  }

  store.dispatch(
    loadConfig(config as Config | undefined, function onLoad(config) {
      if (config.backend.name !== 'git-gateway') {
        store.dispatch(authenticateUser() as unknown as AnyAction);
      }
    }) as unknown as AnyAction,
  );

  /**
   * Create connected root component.
   */
  function Root() {
    return (
      <>
        <Provider store={store}>
          <ConnectedTranslatedApp />
        </Provider>
      </>
    );
  }

  /**
   * Render application root.
   */
  const root = createRoot(getRoot());
  root.render(<Root />);
}

export default bootstrap;
