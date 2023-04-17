import React, { useMemo } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';

import {
  selectCollection,
  selectCollections,
} from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { getDefaultPath } from '../../lib/util/collection.util';
import CollectionPage from './CollectionPage';

interface CollectionRouteProps {
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
}

const CollectionRoute = ({ isSearchResults, isSingleSearchResult }: CollectionRouteProps) => {
  const { name, searchTerm } = useParams();
  const [searchParams] = useSearchParams();
  const noRedirect = searchParams.has('noredirect');

  const collectionSelector = useMemo(() => selectCollection(name), [name]);
  const collection = useAppSelector(collectionSelector);
  const collections = useAppSelector(selectCollections);

  const defaultPath = useMemo(() => getDefaultPath(collections), [collections]);

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
