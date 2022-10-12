import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Collection from './Collection';

import type { Collections } from '../../interface';

function getDefaultPath(collections: Collections) {
  const first = Object.values(collections).filter(collection => collection.hide !== true)[0];
  if (first) {
    return `/collections/${first.name}`;
  } else {
    throw new Error('Could not find a non hidden collection');
  }
}

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

  if (!name || !collection) {
    return <Navigate to={defaultPath} />;
  }

  if ('files' in collection && collection.files?.length === 1) {
    return <Navigate to={`/collections/${collection.name}/entries/${collection.files[0].name}`} />;
  }

  return (
    <Collection
      name={name}
      searchTerm={searchTerm}
      filterTerm={filterTerm}
      isSearchResults={isSearchResults}
      isSingleSearchResult={isSingleSearchResult}
    />
  );
};

export default CollectionRoute;
