import React from 'react';
import { useParams } from 'react-router-dom';

import useBreadcrumbs from '@staticcms/core/lib/hooks/useBreadcrumbs';
import MainView from '../MainView';
import CollectionView from './CollectionView';

import type { Collection } from '@staticcms/core/interface';
import type { FC } from 'react';

const MultiSearchCollectionPage: FC = () => {
  const { name, searchTerm, ...params } = useParams();
  const filterTerm = params['*'];

  return (
    <MainView breadcrumbs={[{ name: 'Search' }]} showQuickCreate showLeftNav>
      <CollectionView
        name={name}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
        isSearchResults
        isSingleSearchResult={false}
      />
    </MainView>
  );
};

interface SingleCollectionPageProps {
  collection: Collection;
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
}

const SingleCollectionPage: FC<SingleCollectionPageProps> = ({
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

interface CollectionPageProps {
  collection?: Collection;
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
}

const CollectionPage: FC<CollectionPageProps> = ({
  collection,
  isSearchResults,
  isSingleSearchResult,
}) => {
  if (!collection) {
    return <MultiSearchCollectionPage />;
  }

  return (
    <SingleCollectionPage
      collection={collection}
      isSearchResults={isSearchResults}
      isSingleSearchResult={isSingleSearchResult}
    />
  );
};

export default CollectionPage;
