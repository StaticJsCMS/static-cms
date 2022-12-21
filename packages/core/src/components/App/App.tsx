import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ScrollSync } from 'react-scroll-sync';
import TopBarProgress from 'react-topbar-progress-indicator';

import { loginUser as loginUserAction } from '@staticcms/core/actions/auth';
import { discardDraft as discardDraftAction } from '@staticcms/core/actions/entries';
import { currentBackend } from '@staticcms/core/backend';
import { colors, GlobalStyles } from '@staticcms/core/components/UI/styles';
import { history } from '@staticcms/core/routing/history';
import CollectionRoute from '../Collection/CollectionRoute';
import EditorRoute from '../Editor/EditorRoute';
import MediaLibrary from '../MediaLibrary/MediaLibrary';
import Page from '../page/Page';
import Snackbars from '../snackbar/Snackbars';
import { Alert } from '../UI/Alert';
import { Confirm } from '../UI/Confirm';
import Loader from '../UI/Loader';
import ScrollTop from '../UI/ScrollTop';
import NotFoundPage from './NotFoundPage';

import type { Collections, Credentials, TranslatedProps } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';

TopBarProgress.config({
  barColors: {
    0: colors.active,
    '1.0': colors.active,
  },
  shadowBlur: 0,
  barThickness: 2,
});

const AppRoot = styled('div')`
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  position: relative;
`;

const AppWrapper = styled('div')`
  width: 100%;
  min-width: 1200px;
  min-height: 100vh;
`;

const ErrorContainer = styled('div')`
  margin: 20px;
`;

const ErrorCodeBlock = styled('pre')`
  margin-left: 20px;
  font-size: 15px;
  line-height: 1.5;
`;

function getDefaultPath(collections: Collections) {
  const options = Object.values(collections).filter(
    collection =>
      collection.hide !== true && (!('files' in collection) || (collection.files?.length ?? 0) > 1),
  );

  if (options.length > 0) {
    return `/collections/${options[0].name}`;
  } else {
    throw new Error('Could not find a non hidden collection');
  }
}

function CollectionSearchRedirect() {
  const { name } = useParams();
  return <Navigate to={`/collections/${name}`} />;
}

function EditEntityRedirect() {
  const { name, entryName } = useParams();
  return <Navigate to={`/collections/${name}/entries/${entryName}`} />;
}

const App = ({
  auth,
  user,
  config,
  collections,
  loginUser,
  isFetching,
  useMediaLibrary,
  t,
  scrollSyncEnabled,
  discardDraft,
}: TranslatedProps<AppProps>) => {
  const configError = useCallback(
    (error?: string) => {
      return (
        <ErrorContainer>
          <h1>{t('app.app.errorHeader')}</h1>
          <div>
            <strong>{t('app.app.configErrors')}:</strong>
            <ErrorCodeBlock>{error ?? config.error}</ErrorCodeBlock>
            <span>{t('app.app.checkConfigYml')}</span>
          </div>
        </ErrorContainer>
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
      <div key="auth-page-wrapper">
        <AuthComponent
          key="auth-page"
          onLogin={handleLogin}
          error={auth.error}
          inProgress={auth.isFetching}
          siteId={config.config.backend.site_domain}
          base_url={config.config.backend.base_url}
          authEndpoint={config.config.backend.auth_endpoint}
          config={config.config}
          clearHash={() => history.replace('/')}
          t={t}
        />
      </div>
    );
  }, [AuthComponent, auth.error, auth.isFetching, config.config, handleLogin, t]);

  const defaultPath = useMemo(() => getDefaultPath(collections), [collections]);

  const { pathname } = useLocation();
  useEffect(() => {
    if (!/\/collections\/[a-zA-Z0-9_-]+\/entries\/[a-zA-Z0-9_-]+/g.test(pathname)) {
      discardDraft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const content = useMemo(() => {
    if (!user) {
      return authenticationPage;
    }

    return (
      <>
        {isFetching && <TopBarProgress />}
        <Routes>
          <Route path="/" element={<Navigate to={defaultPath} />} />
          <Route path="/search" element={<Navigate to={defaultPath} />} />
          <Route path="/collections/:name/search/" element={<CollectionSearchRedirect />} />
          <Route
            path="/error=access_denied&error_description=Signups+not+allowed+for+this+instance"
            element={<Navigate to={defaultPath} />}
          />
          <Route path="/collections" element={<CollectionRoute collections={collections} />} />
          <Route
            path="/collections/:name"
            element={<CollectionRoute collections={collections} />}
          />
          <Route
            path="/collections/:name/new"
            element={<EditorRoute collections={collections} newRecord />}
          />
          <Route
            path="/collections/:name/entries/:slug"
            element={<EditorRoute collections={collections} />}
          />
          <Route
            path="/collections/:name/search/:searchTerm"
            element={
              <CollectionRoute collections={collections} isSearchResults isSingleSearchResult />
            }
          />
          <Route
            path="/collections/:name/filter/:filterTerm"
            element={<CollectionRoute collections={collections} />}
          />
          <Route
            path="/search/:searchTerm"
            element={<CollectionRoute collections={collections} isSearchResults />}
          />
          <Route path="/edit/:name/:entryName" element={<EditEntityRedirect />} />
          <Route path="/page/:id" element={<Page />} />
          <Route element={<NotFoundPage />} />
        </Routes>
        {useMediaLibrary ? <MediaLibrary /> : null}
      </>
    );
  }, [authenticationPage, collections, defaultPath, isFetching, useMediaLibrary, user]);

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
    <>
      <GlobalStyles key="global-styles" />
      <ScrollSync key="scroll-sync" enabled={scrollSyncEnabled}>
        <>
          <div key="back-to-top-anchor" id="back-to-top-anchor" />
          <AppRoot key="cms-root" id="cms-root">
            <AppWrapper key="cms-wrapper" className="cms-wrapper">
              <Snackbars key="snackbars" />
              {content}
              <Alert key="alert" />
              <Confirm key="confirm" />
            </AppWrapper>
          </AppRoot>
          <ScrollTop key="scroll-to-top">
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </>
      </ScrollSync>
    </>
  );
};

function mapStateToProps(state: RootState) {
  const { auth, config, collections, globalUI, mediaLibrary, scroll } = state;
  const user = auth.user;
  const isFetching = globalUI.isFetching;
  const useMediaLibrary = !mediaLibrary.externalLibrary;
  const scrollSyncEnabled = scroll.isScrolling;
  return {
    auth,
    config,
    collections,
    user,
    isFetching,
    useMediaLibrary,
    scrollSyncEnabled,
  };
}

const mapDispatchToProps = {
  loginUser: loginUserAction,
  discardDraft: discardDraftAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type AppProps = ConnectedProps<typeof connector>;

export default connector(translate()(App) as ComponentType<AppProps>);
