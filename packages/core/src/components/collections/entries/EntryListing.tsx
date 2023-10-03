import React, { useCallback, useMemo } from 'react';

import { VIEW_STYLE_TABLE } from '@staticcms/core/constants/views';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { selectFields, selectInferredField } from '@staticcms/core/lib/util/collection.util';
import { isNullish } from '@staticcms/core/lib/util/null.util';
import { toTitleCaseFromKey } from '@staticcms/core/lib/util/string.util';
import entriesClasses from './Entries.classes';
import EntryListingGrid from './EntryListingGrid';
import EntryListingTable from './EntryListingTable';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type {
  Collection,
  CollectionEntryData,
  Collections,
  Entry,
  Field,
} from '@staticcms/core/interface';
import type Cursor from '@staticcms/core/lib/util/Cursor';
import type { FC } from 'react';

export interface BaseEntryListingProps {
  entries: Entry[];
  viewStyle: ViewStyle;
  cursor?: Cursor;
  isLoadingEntries: boolean;
  filterTerm: string;
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

const EntryListing: FC<EntryListingProps> = ({
  entries,
  cursor,
  viewStyle,
  isLoadingEntries,
  filterTerm,
  handleCursorActions,
  ...otherProps
}) => {
  const t = useTranslate();

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

  const isSingleCollectionInList = useMemo(
    () => !('collections' in otherProps) || Object.keys(otherProps.collections).length === 1,
    [otherProps],
  );

  const summaryFields: {
    name: string;
    label: string;
  }[] = useMemo(() => {
    const summaryField = [
      {
        name: 'summary',
        label: t('collection.table.summary'),
      },
    ];

    if (!isSingleCollectionInList) {
      return summaryField;
    }

    if (!('collection' in otherProps) || isNullish(otherProps.collection.summary_fields)) {
      return summaryField;
    }

    const fieldNames = otherProps.collection.summary_fields;
    const collectionFields = selectFields(otherProps.collection).reduce((acc, f) => {
      acc[f.name] = f;
      return acc;
    }, {} as Record<string, Field>);

    return fieldNames.map(summaryField => {
      const field = collectionFields[summaryField];
      return {
        name: summaryField,
        label: !field
          ? toTitleCaseFromKey(summaryField)
          : field.label ?? toTitleCaseFromKey(field.name),
      };
    });
  }, [isSingleCollectionInList, otherProps, t]);

  const entryData: CollectionEntryData[] = useMemo(() => {
    if ('collection' in otherProps) {
      const inferredFields = inferFields(otherProps.collection);

      return entries.map(entry => ({
        collection: otherProps.collection,
        imageFieldName: inferredFields.imageField,
        viewStyle,
        entry,
        key: entry.slug,
      }));
    }

    return entries
      .map(entry => {
        const collectionName = entry.collection;
        const collection = Object.values(otherProps.collections).find(
          coll => coll.name === collectionName,
        );

        const collectionLabel = !isSingleCollectionInList ? collection?.label : undefined;
        const inferredFields = inferFields(collection);
        return collection
          ? {
              collection,
              entry,
              imageFieldName: inferredFields.imageField,
              viewStyle,
              collectionLabel,
              key: entry.slug,
            }
          : null;
      })
      .filter(e => e) as CollectionEntryData[];
  }, [entries, inferFields, isSingleCollectionInList, otherProps, viewStyle]);

  if (viewStyle === VIEW_STYLE_TABLE) {
    return (
      <div className={entriesClasses['entry-listing']}>
        <EntryListingTable
          key="table"
          entryData={entryData}
          isSingleCollectionInList={isSingleCollectionInList}
          summaryFields={summaryFields}
          loadNext={handleLoadMore}
          canLoadMore={Boolean(hasMore && handleLoadMore)}
          isLoadingEntries={isLoadingEntries}
          t={t}
        />
      </div>
    );
  }

  return (
    <EntryListingGrid
      key={'collection' in otherProps ? otherProps.collection.name : `search-grid-${filterTerm}`}
      entryData={entryData}
      onLoadMore={handleLoadMore}
      canLoadMore={Boolean(hasMore && handleLoadMore)}
      isLoadingEntries={isLoadingEntries}
      t={t}
    />
  );
};

export default EntryListing;
