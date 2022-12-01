import 'symbol-observable';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18n } from 'react-polyglot';
import { connect, Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import 'what-input';
import { authenticateUser } from './actions/auth';
import { loadConfig } from './actions/config';
import App from './components/App/App';
import './components/EditorWidgets';
import { ErrorBoundary } from './components/UI';
import addExtensions from './extensions';
import { getPhrases } from './lib/phrases';
import './mediaLibrary';
import { selectLocale } from './reducers/config';
import { store } from './store';

import type { AnyAction } from '@reduxjs/toolkit';
import type { ConnectedProps } from 'react-redux';
import type { BaseField, Config, UnknownField } from './interface';
import type { RootState } from './store';

const ROOT_ID = 'nc-root';

const TranslatedApp = ({ locale, config }: AppRootProps) => {
  if (!config) {
    return null;
  }

  return (
    <I18n locale={locale} messages={getPhrases(locale)}>
      <ErrorBoundary showBackup config={config}>
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
    console.info(`static-cms-core ${STATIC_CMS_CORE_VERSION}`);
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
    }) as AnyAction,
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
