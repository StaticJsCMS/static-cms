import React, { useCallback, useEffect, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  loadEntries as loadEntriesAction,
  traverseCollectionCursor as traverseCollectionCursorAction,
} from '@staticcms/core/actions/entries';
import { Cursor } from '@staticcms/core/lib/util';
import { selectCollectionEntriesCursor } from '@staticcms/core/reducers/selectors/cursors';
import {
  selectEntries,
  selectEntriesLoaded,
  selectGroups,
  selectIsFetching,
} from '@staticcms/core/reducers/selectors/entries';
import Entries from './Entries';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Collection, Entry, GroupOfEntries, TranslatedProps } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ComponentType } from 'react';
import type { t } from 'react-polyglot';
import type { ConnectedProps } from 'react-redux';

function getGroupEntries(entries: Entry[], paths: Set<string>) {
  return entries.filter(entry => paths.has(entry.path));
}

function getGroupTitle(group: GroupOfEntries, t: t) {
  const { label, value } = group;
  if (value === undefined) {
    return t('collection.groups.other');
  }
  if (typeof value === 'boolean') {
    return value ? label : t('collection.groups.negateLabel', { label });
  }
  return `${label} ${value}`.trim();
}

function withGroups(
  groups: GroupOfEntries[],
  entries: Entry[],
  EntriesToRender: ComponentType<EntriesToRenderProps>,
  t: t,
) {
  return groups.map(group => {
    const title = getGroupTitle(group, t);
    return (
      <div key={group.id} id={group.id}>
        <h2>{title}</h2>
        <EntriesToRender entries={getGroupEntries(entries, group.paths)} />
      </div>
    );
  });
}

interface EntriesToRenderProps {
  entries: Entry[];
}

const EntriesCollection = ({
  collection,
  entries,
  groups,
  isFetching,
  viewStyle,
  cursor,
  page,
  traverseCollectionCursor,
  t,
  entriesLoaded,
  readyToLoad,
  loadEntries,
}: TranslatedProps<EntriesCollectionProps>) => {
  const [prevReadyToLoad, setPrevReadyToLoad] = useState(false);
  const [prevCollection, setPrevCollection] = useState(collection);

  useEffect(() => {
    if (
      collection &&
      !entriesLoaded &&
      readyToLoad &&
      (!prevReadyToLoad || prevCollection !== collection)
    ) {
      loadEntries(collection);
    }

    setPrevReadyToLoad(readyToLoad);
    setPrevCollection(collection);
  }, [collection, entriesLoaded, loadEntries, prevCollection, prevReadyToLoad, readyToLoad]);

  const handleCursorActions = useCallback(
    (action: string) => {
      traverseCollectionCursor(collection, action);
    },
    [collection, traverseCollectionCursor],
  );

  const EntriesToRender = useCallback(
    ({ entries }: EntriesToRenderProps) => {
      return (
        <Entries
          collection={collection}
          entries={entries}
          isFetching={isFetching}
          collectionName={collection.label}
          viewStyle={viewStyle}
          cursor={cursor}
          handleCursorActions={handleCursorActions}
          page={page}
        />
      );
    },
    [collection, cursor, handleCursorActions, isFetching, page, viewStyle],
  );

  if (groups && groups.length > 0) {
    return <>{withGroups(groups, entries, EntriesToRender, t)}</>;
  }

  return <EntriesToRender entries={entries} />;
};

export function filterNestedEntries(path: string, collectionFolder: string, entries: Entry[]) {
  const filtered = entries.filter(e => {
    const entryPath = e.path.slice(collectionFolder.length + 1);
    if (!entryPath.startsWith(path)) {
      return false;
    }

    // only show immediate children
    if (path) {
      // non root path
      const trimmed = entryPath.slice(path.length + 1);
      return trimmed.split('/').length === 2;
    } else {
      // root path
      return entryPath.split('/').length <= 2;
    }
  });
  return filtered;
}

interface EntriesCollectionOwnProps {
  collection: Collection;
  viewStyle: CollectionViewStyle;
  readyToLoad: boolean;
  filterTerm: string;
}

function mapStateToProps(state: RootState, ownProps: EntriesCollectionOwnProps) {
  const { collection, viewStyle, filterTerm } = ownProps;
  const page = state.entries.pages[collection.name]?.page;

  let entries = selectEntries(state, collection);
  const groups = selectGroups(state, collection);

  if ('nested' in collection) {
    const collectionFolder = collection.folder ?? '';
    entries = filterNestedEntries(filterTerm || '', collectionFolder, entries);
  }

  const entriesLoaded = selectEntriesLoaded(state, collection.name);
  const isFetching = selectIsFetching(state, collection.name);

  const rawCursor = selectCollectionEntriesCursor(state, collection.name);
  const cursor = Cursor.create(rawCursor).clearData();

  return { ...ownProps, page, entries, groups, entriesLoaded, isFetching, viewStyle, cursor };
}

const mapDispatchToProps = {
  loadEntries: loadEntriesAction,
  traverseCollectionCursor: traverseCollectionCursorAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EntriesCollectionProps = ConnectedProps<typeof connector>;

export default connector(translate()(EntriesCollection) as ComponentType<EntriesCollectionProps>);
