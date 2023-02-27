import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import {
  selectCollection,
  selectCollections,
} from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { getDefaultPath } from '../../lib/util/collection.util';
import MainView from '../MainView';
import Collection from './Collection';

interface CollectionRouteProps {
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
}

const CollectionRoute = ({ isSearchResults, isSingleSearchResult }: CollectionRouteProps) => {
  const { name, searchTerm, filterTerm } = useParams();

  const collectionSelector = useMemo(() => selectCollection(name), [name]);
  const collection = useAppSelector(collectionSelector);
  const collections = useAppSelector(selectCollections);

  const defaultPath = useMemo(() => getDefaultPath(collections), [collections]);

  if (!searchTerm && (!name || !collection)) {
    return <Navigate to={defaultPath} />;
  }

  if (collection && 'files' in collection && collection.files?.length === 1) {
    return <Navigate to={`/collections/${collection.name}/entries/${collection.files[0].name}`} />;
  }

  return (
    <MainView breadcrumbs={[{ name: collection.label }]} showQuickCreate showLeftNav>
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
