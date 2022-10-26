import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ScrollSync } from 'react-scroll-sync';
import TopBarProgress from 'react-topbar-progress-indicator';

import { loginUser as loginUserAction } from '../../actions/auth';
import { currentBackend } from '../../backend';
import { colors, GlobalStyles } from '../../components/UI/styles';
import { history } from '../../routing/history';
import CollectionRoute from '../Collection/CollectionRoute';
import EditorRoute from '../Editor/EditorRoute';
import MediaLibrary from '../MediaLibrary/MediaLibrary';
import Snackbars from '../snackbar/Snackbars';
import { Alert } from '../UI/Alert';
import { Confirm } from '../UI/Confirm';
import Loader from '../UI/Loader';
import ScrollTop from '../UI/ScrollTop';
import NotFoundPage from './NotFoundPage';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Collections, Credentials, TranslatedProps } from '../../interface';
import type { RootState } from '../../store';
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
}: TranslatedProps<AppProps>) => {
  const configError = useCallback(() => {
    return (
      <ErrorContainer>
        <h1>{t('app.app.errorHeader')}</h1>
        <div>
          <strong>{t('app.app.configErrors')}:</strong>
          <ErrorCodeBlock>{config.error}</ErrorCodeBlock>
          <span>{t('app.app.checkConfigYml')}</span>
        </div>
      </ErrorContainer>
    );
  }, [config.error, t]);

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

  if (!config.config) {
    return null;
  }

  if (config.error) {
    return configError();
  }

  if (config.isFetching) {
    return <Loader>{t('app.app.loadingConfig')}</Loader>;
  }

  if (!user) {
    return authenticationPage;
  }

  return (
    <>
      <GlobalStyles />
      <ScrollSync enabled={scrollSyncEnabled}>
        <>
          <div id="back-to-top-anchor" />
          <AppRoot id="cms-root">
            <AppWrapper className="cms-wrapper">
              <Snackbars />
              {isFetching && <TopBarProgress />}
              <Routes>
                <Route path="/" element={<Navigate to={defaultPath} />} />
                <Route path="/search" element={<Navigate to={defaultPath} />} />
                <Route path="/collections/:name/search/" element={<CollectionSearchRedirect />} />
                <Route
                  path="/error=access_denied&error_description=Signups+not+allowed+for+this+instance"
                  element={<Navigate to={defaultPath} />}
                />
                <Route
                  path="/collections"
                  element={<CollectionRoute collections={collections} />}
                />
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
                    <CollectionRoute
                      collections={collections}
                      isSearchResults
                      isSingleSearchResult
                    />
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
                <Route element={<NotFoundPage />} />
              </Routes>
              {useMediaLibrary ? <MediaLibrary /> : null}
              <Alert />
              <Confirm />
            </AppWrapper>
          </AppRoot>
          <ScrollTop>
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
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type AppProps = ConnectedProps<typeof connector>;

export default connector(translate()(App) as ComponentType<AppProps>);
