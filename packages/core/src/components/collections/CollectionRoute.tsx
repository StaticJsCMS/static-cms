import React from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';

import useDefaultPath from '@staticcms/core/lib/hooks/useDefaultPath';
import {
  selectCollection,
  selectCollections,
} from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import CollectionPage from './CollectionPage';

import type { FC } from 'react';

interface CollectionRouteProps {
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
}

const CollectionRoute: FC<CollectionRouteProps> = ({ isSearchResults, isSingleSearchResult }) => {
  const { name, searchTerm } = useParams();
  const [searchParams] = useSearchParams();
  const noRedirect = searchParams.has('noredirect');

  const collection = useAppSelector(state => selectCollection(state, name));
  const collections = useAppSelector(selectCollections);

  const defaultPath = useDefaultPath(collections);

  if (!searchTerm && (!name || !collection)) {
    return <Navigate to={defaultPath} />;
  }

  if (collection && 'files' in collection && collection.files?.length === 1 && !noRedirect) {
    const href = window.location.href;
    if (!href.includes('noredirect')) {
      window.history.replaceState(null, document.title, `${href}?noredirect`);
    }
    return <Navigate to={`/collections/${collection.name}/entries/${collection.files[0].name}`} />;
  }

  return (
    <CollectionPage
      collection={collection}
      isSearchResults={isSearchResults}
      isSingleSearchResult={isSingleSearchResult}
    />
  );
};

export default CollectionRoute;
