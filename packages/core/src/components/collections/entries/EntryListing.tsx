import React, { useCallback, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { Waypoint } from 'react-waypoint';

import { selectFields, selectInferredField } from '@staticcms/core/lib/util/collection.util';
import { toTitleCaseFromKey } from '@staticcms/core/lib/util/string.util';
import Table from '../../common/table/Table';
import EntryCard from './EntryCard';
import EntryRow from './EntryRow';
import EntriesPagination from './EntriesPagination';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type {
  Collection,
  Collections,
  Entry,
  Field,
  TranslatedProps,
} from '@staticcms/core/interface';
import type Cursor from '@staticcms/core/lib/util/Cursor';
import type { FC } from 'react';

const DEFAULT_PAGE_SIZE = 20;

export interface BaseEntryListingProps {
  entries: Entry[];
  viewStyle: ViewStyle;
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

const EntryListing: FC<TranslatedProps<EntryListingProps>> = ({
  entries,
  cursor,
  viewStyle,
  handleCursorActions,
  t,
  ...otherProps
}) => {
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

  const summaryFields = useMemo(() => {
    let fields: string[] | undefined;
    if ('collection' in otherProps) {
      fields = otherProps.collection.summary_fields;
    }

    return fields ?? ['summary'];
  }, [otherProps]);

  const isSingleCollectionInList = useMemo(
    () => !('collections' in otherProps) || Object.keys(otherProps.collections).length === 1,
    [otherProps],
  );

  const entryData: ({
    collection: Collection;
    imageFieldName: string | null | undefined;
    viewStyle: ViewStyle;
    entry: Entry;
    key: string;
    summaryFields: string[];
    collectionLabel?: string;
  } | null)[] = useMemo(() => {
    if ('collection' in otherProps) {
      const inferredFields = inferFields(otherProps.collection);

      return entries.map(entry => ({
        collection: otherProps.collection,
        imageFieldName: inferredFields.imageField,
        viewStyle,
        entry,
        key: entry.slug,
        summaryFields,
      }));
    }

    return entries.map(entry => {
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
            summaryFields,
          }
        : null;
    });
  }, [entries, inferFields, isSingleCollectionInList, otherProps, summaryFields, viewStyle]);

  const summaryFieldHeaders = useMemo(() => {
    if ('collection' in otherProps) {
      const collectionFields = selectFields(otherProps.collection).reduce((acc, f) => {
        acc[f.name] = f;
        return acc;
      }, {} as Record<string, Field>);
      return summaryFields.map(summaryField => {
        const field = collectionFields[summaryField];
        return !field
          ? toTitleCaseFromKey(summaryField)
          : field.label ?? toTitleCaseFromKey(field.name);
      });
    }

    return [];
  }, [otherProps, summaryFields]);

  const [page, setPage] = useState(1);
  const totalPages = useMemo(() => Math.ceil(entries.length / DEFAULT_PAGE_SIZE), [entries.length]);

  const handleUpdatePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  if (viewStyle === 'VIEW_STYLE_LIST') {
    return (
      <>
        <Table
          columns={
            !isSingleCollectionInList
              ? ['Collection', ...summaryFieldHeaders, '']
              : [...summaryFieldHeaders, '']
          }
        >
          {entryData.map(data =>
            data ? (
              <EntryRow
                key={data.key}
                collection={data.collection}
                entry={data.entry}
                summaryFields={data.summaryFields}
                t={t}
              />
            ) : null,
          )}
        </Table>
        <EntriesPagination page={page} total={totalPages} onChange={handleUpdatePage} />
      </>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className="
        grid
        gap-4
        sm:grid-cols-1
        md:grid-cols-1
        lg:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
      >
        {entryData.map(data =>
          data ? (
            <EntryCard
              key={data.key}
              collection={data.collection}
              entry={data.entry}
              imageFieldName={data.imageFieldName}
              t={t}
            />
          ) : null,
        )}
      </div>
      <EntriesPagination page={page} total={totalPages} onChange={handleUpdatePage} />
    </div>
  );
};

export default translate()(EntryListing) as FC<EntryListingProps>;
