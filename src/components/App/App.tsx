import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { hot } from 'react-hot-loader';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ScrollSync } from 'react-scroll-sync';
import TopBarProgress from 'react-topbar-progress-indicator';

import { loginUser, logoutUser } from '../../actions/auth';
import { createNewEntry } from '../../actions/collections';
import { openMediaLibrary } from '../../actions/mediaLibrary';
import { currentBackend } from '../../backend';
import { history } from '../../routing/history';
import { colors, Loader } from '../../ui';
import CollectionRoute from '../Collection/CollectionRoute';
import EditorRoute from '../Editor/EditorRoute';
import MediaLibrary from '../MediaLibrary/MediaLibrary';
import Snackbars from '../snackbar/Snackbars';
import { Alert } from '../UI/Alert';
import { Confirm } from '../UI/Confirm';
import Header from './Header';
import NotFoundPage from './NotFoundPage';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Collections, Credentials, State, TranslatedProps } from '../../interface';

TopBarProgress.config({
  barColors: {
    0: colors.active,
    '1.0': colors.active,
  },
  shadowBlur: 0,
  barThickness: 2,
});

const AppRoot = styled.div`
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  position: relative;
  overflow-y: auto;
`;

const AppWrapper = styled.div`
  width: 100%;
  min-width: 1200px;
  min-height: 100vh;
`;

const AppMainContainer = styled.div`
  min-width: 1200px;
  max-width: 1440px;
  margin: 0 auto;
`;

const ErrorContainer = styled.div`
  margin: 20px;
`;

const ErrorCodeBlock = styled.pre`
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

/**
 * Returns default collection name if only one collection
 */
// function getDefaultCollectionPath(collection: Collection) {
//   if ('files' in collection && collection.files?.length === 1) {
//     return `/collections/${collection.name}/entries/${collection.files[0].name}`;
//   }

//   return null;
// }

// interface RouteInCollection {
//   collections: Record<string, Collection>;
//   render: (props: RouteProps) => JSX.Element;
// }

// function RouteInCollectionDefault({ collections, render, ...props }) {
//   const defaultPath = getDefaultPath(collections);
//   return (
//     <Route
//       {...props}
//       render={routeProps => {
//         const collectionExists = collections.get(routeProps.match.params.name);
//         if (!collectionExists) {
//           return <Redirect to={defaultPath} />;
//         }

//         const defaultCollectionPath = getDefaultCollectionPath(collectionExists);
//         if (defaultCollectionPath !== null) {
//           return <Redirect to={defaultCollectionPath} />;
//         }

//         return render(routeProps);
//       }}
//     />
//   );
// }

// interface RouteInCollection extends RouteProps {
//   collections: Record<string, Collection>;
//   render: (props: RouteProps) => JSX.Element;
// }

// function RouteInCollection({ collections, render, ...props }: RouteInCollection) {
//   const defaultPath = getDefaultPath(collections);
//   return (
//     <Route
//       {...props}
//       render={routeProps => {
//         const collectionExists = Boolean(
//           routeProps.match.params.name && collections[routeProps.match.params.name],
//         );
//         return collectionExists ? render(routeProps) : <Redirect to={defaultPath} />;
//       }}
//     />
//   );
// }

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
  logoutUser,
  loginUser,
  isFetching,
  useMediaLibrary,
  openMediaLibrary,
  t,
  showMediaButton,
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

  const authenticating = useCallback(() => {
    if (!config.config) {
      return null;
    }

    const backend = currentBackend(config.config);

    if (backend == null) {
      return (
        <div>
          <h1>{t('app.app.waitingBackend')}</h1>
        </div>
      );
    }

    return (
      <div>
        {React.createElement(backend.authComponent(), {
          onLogin: handleLogin,
          error: auth.error,
          inProgress: auth.isFetching,
          siteId: config.config.backend.site_domain,
          base_url: config.config.backend.base_url,
          authEndpoint: config.config.backend.auth_endpoint,
          config: config.config,
          clearHash: () => history.replace('/'),
          t,
        })}
      </div>
    );
  }, [auth.error, auth.isFetching, config.config, handleLogin, t]);

  if (!config.config) {
    return null;
  }

  if (config.error) {
    return configError();
  }

  if (config.isFetching) {
    return <Loader $active>{t('app.app.loadingConfig')}</Loader>;
  }

  if (!user) {
    return authenticating();
  }

  const defaultPath = getDefaultPath(collections);

  return (
    <ScrollSync enabled={scrollSyncEnabled}>
      <AppRoot id="cms-root">
        <AppWrapper className="cms-wrapper">
          <Snackbars />
          <Header
            user={user}
            collections={collections}
            onCreateEntryClick={createNewEntry}
            onLogoutClick={logoutUser}
            openMediaLibrary={openMediaLibrary}
            displayUrl={config.config.display_url}
            isTestRepo={config.config.backend.name === 'test-repo'}
            showMediaButton={showMediaButton}
          />
          <AppMainContainer>
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
              <Route element={<NotFoundPage />} />
            </Routes>
            {useMediaLibrary ? <MediaLibrary /> : null}
            <Alert />
            <Confirm />
          </AppMainContainer>
        </AppWrapper>
      </AppRoot>
    </ScrollSync>
  );
};

function mapStateToProps(state: State) {
  const { auth, config, collections, globalUI, mediaLibrary, scroll } = state;
  const user = auth.user;
  const isFetching = globalUI.isFetching;
  const useMediaLibrary = !mediaLibrary.externalLibrary;
  const showMediaButton = mediaLibrary.showMediaButton;
  const scrollSyncEnabled = scroll.isScrolling;
  return {
    auth,
    config,
    collections,
    user,
    isFetching,
    showMediaButton,
    useMediaLibrary,
    scrollSyncEnabled,
  };
}

const mapDispatchToProps = {
  openMediaLibrary,
  loginUser,
  logoutUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type AppProps = ConnectedProps<typeof connector>;

export default hot(module)(connector(translate()(App) as ComponentType<AppProps>));
