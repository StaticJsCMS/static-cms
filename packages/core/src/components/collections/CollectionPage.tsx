import React from 'react';
import { useParams } from 'react-router-dom';

import useBreadcrumbs from '@staticcms/core/lib/hooks/useBreadcrumbs';
import MainView from '../MainView';
import CollectionView from './CollectionView';

import type { Collection } from '@staticcms/core/interface';
import type { FC } from 'react';

interface CollectionViewProps {
  collection: Collection;
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
}

const CollectionPage: FC<CollectionViewProps> = ({
  collection,
  isSearchResults,
  isSingleSearchResult,
}) => {
  const { name, searchTerm, ...params } = useParams();
  const filterTerm = params['*'];

  const breadcrumbs = useBreadcrumbs(collection, filterTerm);

  return (
    <MainView breadcrumbs={breadcrumbs} showQuickCreate showLeftNav>
      <CollectionView
        name={name}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
        isSearchResults={isSearchResults}
        isSingleSearchResult={isSingleSearchResult}
      />
    </MainView>
  );
};

export default CollectionPage;
