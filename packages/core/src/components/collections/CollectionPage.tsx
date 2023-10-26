import React from 'react';
import { useParams } from 'react-router-dom';

import useBreadcrumbs from '@staticcms/core/lib/hooks/useBreadcrumbs';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import MainView from '../MainView';
import CollectionView from './CollectionView';

import type { CollectionWithDefaults } from '@staticcms/core/interface';
import type { FC } from 'react';

const MultiSearchCollectionPage: FC = () => {
  const t = useTranslate();

  const { name, searchTerm, ...params } = useParams();
  const filterTerm = params['*'];

  return (
    <MainView breadcrumbs={[{ name: 'Search' }]} showQuickCreate showLeftNav noScroll noMargin>
      <CollectionView
        name={name}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
        isSearchResults
        isSingleSearchResult={false}
        t={t}
      />
    </MainView>
  );
};

interface SingleCollectionPageProps {
  collection: CollectionWithDefaults;
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
}

const SingleCollectionPage: FC<SingleCollectionPageProps> = ({
  collection,
  isSearchResults,
  isSingleSearchResult,
}) => {
  const t = useTranslate();

  const { name, searchTerm, ...params } = useParams();
  const filterTerm = params['*'];

  const breadcrumbs = useBreadcrumbs(collection, filterTerm);

  return (
    <MainView
      breadcrumbs={breadcrumbs}
      collection={collection}
      showQuickCreate
      showLeftNav
      noScroll
      noMargin
    >
      <CollectionView
        name={name}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
        isSearchResults={isSearchResults}
        isSingleSearchResult={isSingleSearchResult}
        t={t}
      />
    </MainView>
  );
};

interface CollectionPageProps {
  collection?: CollectionWithDefaults;
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
