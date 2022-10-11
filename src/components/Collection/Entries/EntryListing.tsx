import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { Waypoint } from 'react-waypoint';

import { selectFields, selectInferedField } from '../../../lib/util/collection.util';
import EntryCard from './EntryCard';

import type { CollectionViewStyle } from '../../../constants/collectionViews';
import type { CmsField, Collection, Collections, Entry } from '../../../interface';
import type Cursor from '../../../lib/util/Cursor';

const CardsGrid = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  margin-left: -12px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 0;
`;

export interface BaseEntryListingProps {
  entries: Entry[];
  viewStyle: CollectionViewStyle;
  cursor?: Cursor;
  handleCursorActions: (action: string) => void;
  page?: number;
}

export interface SingleCollectionEntryListingProps extends BaseEntryListingProps {
  collection: Collection;
}

export interface MultipleCollectionEntryListingProps extends BaseEntryListingProps {
  collections: Collections;
}

export type EntryListingProps =
  | SingleCollectionEntryListingProps
  | MultipleCollectionEntryListingProps;

const EntryListing = ({
  entries,
  page,
  cursor,
  viewStyle,
  handleCursorActions,
  ...otherProps
}: EntryListingProps) => {
  const hasMore = useCallback(() => {
    const hasMore = cursor?.actions?.has('append_next');
    return hasMore;
  }, [cursor?.actions]);

  const handleLoadMore = useCallback(() => {
    if (hasMore()) {
      handleCursorActions('append_next');
    }
  }, [handleCursorActions, hasMore]);

  const inferFields = useCallback(
    (
      collection?: Collection,
    ): {
      titleField?: string | null;
      descriptionField?: string | null;
      imageField?: string | null;
      remainingFields?: CmsField[];
    } => {
      if (!collection) {
        return {};
      }

      const titleField = selectInferedField(collection, 'title');
      const descriptionField = selectInferedField(collection, 'description');
      const imageField = selectInferedField(collection, 'image');
      const fields = selectFields(collection);
      const inferedFields = [titleField, descriptionField, imageField];
      const remainingFields = fields && fields.filter(f => inferedFields.indexOf(f.name) === -1);
      return { titleField, descriptionField, imageField, remainingFields };
    },
    [],
  );

  const renderCardsForSingleCollection = useCallback(
    (collection: Collection) => {
      const inferedFields = inferFields(collection);
      return entries.map((entry, idx) => (
        <EntryCard
          collection={collection}
          inferedFields={inferedFields}
          viewStyle={viewStyle}
          entry={entry}
          key={idx}
        />
      ));
    },
    [entries, inferFields, viewStyle],
  );

  const renderCardsForMultipleCollections = useCallback(
    (collections: Collections) => {
      const isSingleCollectionInList = Object.keys(collections).length === 1;
      return entries.map((entry, idx) => {
        const collectionName = entry.collection;
        const collection = Object.values(collections).find(coll => coll.name === collectionName);
        const collectionLabel = !isSingleCollectionInList ? collection?.label : undefined;
        const inferedFields = inferFields(collection);
        return collection ? (
          <EntryCard
            collection={collection}
            entry={entry}
            inferedFields={inferedFields}
            collectionLabel={collectionLabel}
            key={idx}
          />
        ) : null;
      });
    },
    [entries, inferFields],
  );

  return (
    <div>
      <CardsGrid>
        {'collection' in otherProps
          ? renderCardsForSingleCollection(otherProps.collection)
          : renderCardsForMultipleCollections(otherProps.collections)}
        {hasMore() && <Waypoint key={page} onEnter={handleLoadMore} />}
      </CardsGrid>
    </div>
  );
};

export default EntryListing;
