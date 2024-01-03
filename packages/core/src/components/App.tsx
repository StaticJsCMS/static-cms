import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { ScrollSync } from 'react-scroll-sync';
import TopBarProgress from 'react-topbar-progress-indicator';

import { loginUser as loginUserAction } from '@staticcms/core/actions/auth';
import { discardDraft } from '@staticcms/core/actions/entries';
import { currentBackend } from '@staticcms/core/backend';
import { loadUnpublishedEntries } from '../actions/editorialWorkflow';
import { changeTheme } from '../actions/globalUI';
import useDefaultPath from '../lib/hooks/useDefaultPath';
import useTranslate from '../lib/hooks/useTranslate';
import { invokeEvent } from '../lib/registry';
import { isNotNullish } from '../lib/util/null.util';
import { isEmpty } from '../lib/util/string.util';
import { generateClassNames } from '../lib/util/theming.util';
import { selectUseWorkflow } from '../reducers/selectors/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import NotFoundPage from './NotFoundPage';
import CollectionRoute from './collections/CollectionRoute';
import { Alert } from './common/alert/Alert';
import { Confirm } from './common/confirm/Confirm';
import Loader from './common/progress/Loader';
import EditorRoute from './entry-editor/EditorRoute';
import MediaPage from './media-library/MediaPage';
import Page from './page/Page';
import Snackbars from './snackbar/Snackbars';
import ThemeManager from './theme/ThemeManager';
import useTheme from './theme/hooks/useTheme';
import Dashboard from './workflow/Dashboard';

import type { Credentials } from '@staticcms/core';
import type { RootState } from '@staticcms/core/store';
import type { FC } from 'react';
import type { ConnectedProps } from 'react-redux';

import './App.css';

export const classes = generateClassNames('App', ['root', 'content']);

TopBarProgress.config({
  barColors: {
    0: '#000',
    '1.0': '#000',
  },
  shadowBlur: 0,
  barThickness: 2,
});

window.addEventListener('beforeunload', function (event) {
  event.stopImmediatePropagation();
});

function CollectionSearchRedirect() {
  const { name } = useParams();
  return <Navigate to={`/collections/${name}`} />;
}

function EditEntityRedirect() {
  const { name, ...params } = useParams();
  return <Navigate to={`/collections/${name}/entries/${params['*']}`} />;
}

const App: FC<AppProps> = ({
  auth,
  user,
  config,
  collections,
  loginUser,
  isFetching,
  scrollSyncEnabled,
}) => {
  const t = useTranslate();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const configError = useCallback(
    (error?: string) => {
      return (
        <div>
          <h1>{t('app.app.errorHeader')}</h1>
          <div>
            <strong>{t('app.app.configErrors')}:</strong>
            <div>{error ?? config.error}</div>
            <span>{t('app.app.checkConfigYml')}</span>
          </div>
        </div>
      );
    },
    [config.error, t],
  );

  const handleLogin = useCallback(
    (credentials: Credentials) => {
      loginUser(credentials);
    },
    [loginUser],
  );

  const AuthComponent = useMemo(() => {
    if (!config.config) {
      return null;
    }

    const backend = currentBackend(config.config);
    return backend?.authComponent();
  }, [config.config]);

  const authenticationPage = useMemo(() => {
    if (!config.config) {
      return null;
    }

    if (AuthComponent == null) {
      return (
        <div>
          <h1>{t('app.app.waitingBackend')}</h1>
        </div>
      );
    }

    return (
      <AuthComponent
        key="auth-page"
        onLogin={handleLogin}
        error={auth.error}
        inProgress={auth.isFetching}
        siteId={config.config.backend.site_domain}
        base_url={config.config.backend.base_url}
        authEndpoint={config.config.backend.auth_endpoint}
        config={config.config}
        clearHash={() => navigate('/', { replace: true })}
      />
    );
  }, [AuthComponent, auth.error, auth.isFetching, config.config, handleLogin, navigate, t]);

  const useWorkflow = useAppSelector(selectUseWorkflow);
  const defaultPath = useDefaultPath(collections);

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (
      /\/collections\/[a-zA-Z0-9_-]+\/entries\/[a-zA-Z0-9_-]+/g.test(pathname) ||
      (/\/collections\/[a-zA-Z0-9_-]+\/new/g.test(pathname) &&
        searchParams.get('duplicate') === 'true')
    ) {
      return;
    }

    dispatch(discardDraft());
  }, [dispatch, pathname, searchParams]);

  useEffect(() => {
    if (!user || !useWorkflow) {
      return;
    }

    dispatch(loadUnpublishedEntries(collections));
  }, [collections, dispatch, useWorkflow, user]);

  const [prevUser, setPrevUser] = useState(user);
  useEffect(() => {
    if (!prevUser && user) {
      invokeEvent({
        name: 'login',
        data: {
          login: user.login,
          name: user.name ?? '',
        },
      });
    }
    setPrevUser(user);
  }, [prevUser, user]);

  const content = useMemo(() => {
    if (!user) {
      return authenticationPage;
    }

    return (
      <>
        {isFetching && <TopBarProgress />}
        <Routes>
          <Route path="/" element={<Navigate to={defaultPath} />} />
          <Route
            path="/dashboard"
            element={useWorkflow ? <Dashboard /> : <Navigate to={defaultPath} />}
          />
          <Route path="/search" element={<Navigate to={defaultPath} />} />
          <Route path="/collections/:name/search/" element={<CollectionSearchRedirect />} />
          <Route
            path="/error=access_denied&error_description=Signups+not+allowed+for+this+instance"
            element={<Navigate to={defaultPath} />}
          />
          <Route path="/collections" element={<CollectionRoute />} />
          <Route path="/collections/:name" element={<CollectionRoute />} />
          <Route
            path="/collections/:name/new"
            element={<EditorRoute collections={collections} newRecord />}
          />
          <Route
            path="/collections/:name/new/*"
            element={<EditorRoute collections={collections} newRecord />}
          />
          <Route
            path="/collections/:name/entries/*"
            element={<EditorRoute collections={collections} />}
          />
          <Route
            path="/collections/:name/search/:searchTerm"
            element={<CollectionRoute isSearchResults isSingleSearchResult />}
          />
          <Route path="/collections/:name/filter/*" element={<CollectionRoute />} />
          <Route path="/search/:searchTerm" element={<CollectionRoute isSearchResults />} />
          <Route path="/edit/:name/*" element={<EditEntityRedirect />} />
          <Route path="/page/:id" element={<Page />} />
          <Route path="/media" element={<MediaPage />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }, [authenticationPage, collections, defaultPath, isFetching, useWorkflow, user]);

  useEffect(() => {
    setTimeout(() => {
      invokeEvent({ name: 'mounted' });
    });
  }, []);

  useEffect(() => {
    const defaultTheme = config.config?.theme?.default_theme;
    if (isEmpty(defaultTheme)) {
      return;
    }

    const themeName = localStorage.getItem('color-theme');
    if (isNotNullish(themeName)) {
      return;
    }

    dispatch(changeTheme(defaultTheme));
  }, [config.config?.theme?.default_theme, dispatch]);

  if (!config.config) {
    return configError(t('app.app.configNotFound'));
  }

  if (config.error) {
    return configError();
  }

  if (config.isFetching) {
    return <Loader>{t('app.app.loadingConfig')}</Loader>;
  }

  return (
    <ThemeManager theme={theme} element={document.documentElement}>
      <ScrollSync key="scroll-sync" enabled={scrollSyncEnabled}>
        <>
          <div key="back-to-top-anchor" id="back-to-top-anchor" />
          <div key="cms-root" id="cms-root" className={classes.root}>
            <div key="cms-wrapper" className={classes.content}>
              <Snackbars key="snackbars" />
              {content}
              <Alert key="alert" />
              <Confirm key="confirm" />
            </div>
          </div>
        </>
      </ScrollSync>
    </ThemeManager>
  );
};

function mapStateToProps(state: RootState) {
  const { auth, config, collections, globalUI, scroll } = state;
  const user = auth.user;
  const isFetching = globalUI.isFetching;
  const scrollSyncEnabled = scroll.isScrolling;
  return {
    auth,
    config,
    collections,
    user,
    isFetching,
    scrollSyncEnabled,
  };
}

const mapDispatchToProps = {
  loginUser: loginUserAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
