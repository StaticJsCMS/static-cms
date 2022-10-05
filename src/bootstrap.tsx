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
import { getPhrases } from './lib/phrases';
import './mediaLibrary';
import { selectLocale } from './reducers/config';
import { store } from './store';

import type { AnyAction } from '@reduxjs/toolkit';
import type { ConnectedProps } from 'react-redux';
import type { CmsConfig, State } from './interface';

const ROOT_ID = 'nc-root';

function TranslatedApp({ locale, config }: AppRootProps) {
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
}

function mapDispatchToProps(state: State) {
  return { locale: selectLocale(state.config.config), config: state.config.config };
}

const connector = connect(mapDispatchToProps);
export type AppRootProps = ConnectedProps<typeof connector>;

const ConnectedTranslatedApp = connect(mapDispatchToProps)(TranslatedApp);

function bootstrap(opts: { config: CmsConfig }) {
  const { config } = opts;

  /**
   * Log the version number.
   */
  if (typeof STATIC_CMS_CORE_VERSION === 'string') {
    console.log(`static-cms-core ${STATIC_CMS_CORE_VERSION}`);
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

  store.dispatch(
    loadConfig(config, function onLoad() {
      store.dispatch(authenticateUser() as unknown as AnyAction);
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
