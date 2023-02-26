import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { getDefaultPath } from '../../lib/util/collection.util';
import MainView from '../App/MainView';
import Collection from './Collection';

import type { Collections } from '@staticcms/core/interface';

interface CollectionRouteProps {
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
  collections: Collections;
}

const CollectionRoute = ({
  isSearchResults,
  isSingleSearchResult,
  collections,
}: CollectionRouteProps) => {
  const { name, searchTerm, filterTerm } = useParams();
  const collection = useMemo(() => {
    if (!name) {
      return false;
    }
    return collections[name];
  }, [collections, name]);

  const defaultPath = useMemo(() => getDefaultPath(collections), [collections]);

  if (!searchTerm && (!name || !collection)) {
    return <Navigate to={defaultPath} />;
  }

  if (collection && 'files' in collection && collection.files?.length === 1) {
    return <Navigate to={`/collections/${collection.name}/entries/${collection.files[0].name}`} />;
  }

  return (
    <MainView>
      <Collection
        name={name}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
        isSearchResults={isSearchResults}
        isSingleSearchResult={isSingleSearchResult}
      />
    </MainView>
  );
};

export default CollectionRoute;
