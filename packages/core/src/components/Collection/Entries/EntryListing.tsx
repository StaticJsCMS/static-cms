import { styled } from '@mui/material/styles';
import React, { useCallback, useMemo } from 'react';
import { Waypoint } from 'react-waypoint';

import { VIEW_STYLE_LIST } from '@staticcms/core/constants/collectionViews';
import { transientOptions } from '@staticcms/core/lib';
import { selectFields, selectInferredField } from '@staticcms/core/lib/util/collection.util';
import EntryCard from './EntryCard';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Field, Collection, Collections, Entry } from '@staticcms/core/interface';
import type Cursor from '@staticcms/core/lib/util/Cursor';

interface CardsGridProps {
  $layout: CollectionViewStyle;
}

const CardsGrid = styled(
  'div',
  transientOptions,
)<CardsGridProps>(
  ({ $layout }) => `
    ${
      $layout === VIEW_STYLE_LIST
        ? `
          display: flex;
          flex-direction: column;
        `
        : `
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        `
    }
    width: 100%;
    margin-top: 16px;
    gap: 16px;
  `,
);

export interface BaseEntryListingProps {
  entries: Entry[];
  viewStyle: CollectionViewStyle;
  cursor?: Cursor;
  handleCursorActions?: (action: string) => void;
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
  const hasMore = useMemo(() => cursor?.actions?.has('append_next'), [cursor?.actions]);

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      handleCursorActions?.('append_next');
    }
  }, [handleCursorActions, hasMore]);

  const inferFields = useCallback(
    (
      collection?: Collection,
    ): {
      titleField?: string | null;
      descriptionField?: string | null;
      imageField?: string | null;
      remainingFields?: Field[];
    } => {
      if (!collection) {
        return {};
      }

      const titleField = selectInferredField(collection, 'title');
      const descriptionField = selectInferredField(collection, 'description');
      const imageField = selectInferredField(collection, 'image');
      const fields = selectFields(collection);
      const inferredFields = [titleField, descriptionField, imageField];
      const remainingFields = fields && fields.filter(f => inferredFields.indexOf(f.name) === -1);
      return { titleField, descriptionField, imageField, remainingFields };
    },
    [],
  );

  const renderedCards = useMemo(() => {
    if ('collection' in otherProps) {
      const inferredFields = inferFields(otherProps.collection);
      return entries.map((entry, idx) => (
        <EntryCard
          collection={otherProps.collection}
          inferredFields={inferredFields}
          viewStyle={viewStyle}
          entry={entry}
          key={idx}
        />
      ));
    }

    const isSingleCollectionInList = Object.keys(otherProps.collections).length === 1;
    return entries.map((entry, idx) => {
      const collectionName = entry.collection;
      const collection = Object.values(otherProps.collections).find(
        coll => coll.name === collectionName,
      );
      const collectionLabel = !isSingleCollectionInList ? collection?.label : undefined;
      const inferredFields = inferFields(collection);
      return collection ? (
        <EntryCard
          collection={collection}
          entry={entry}
          inferredFields={inferredFields}
          collectionLabel={collectionLabel}
          key={idx}
        />
      ) : null;
    });
  }, [entries, inferFields, otherProps, viewStyle]);

  return (
    <div>
      <CardsGrid $layout={viewStyle}>
        {renderedCards}
        {hasMore && handleLoadMore && <Waypoint key={page} onEnter={handleLoadMore} />}
      </CardsGrid>
    </div>
  );
};

export default EntryListing;
