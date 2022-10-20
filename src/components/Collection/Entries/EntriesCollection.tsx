import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  loadEntries as loadEntriesAction,
  traverseCollectionCursor as traverseCollectionCursorAction,
} from '../../../actions/entries';
import { colors } from '../../../components/UI/styles';
import { Cursor } from '../../../lib/util';
import { selectCollectionEntriesCursor } from '../../../reducers/cursors';
import {
  selectEntries,
  selectEntriesLoaded,
  selectGroups,
  selectIsFetching,
} from '../../../reducers/entries';
import Entries from './Entries';

import type { ComponentType } from 'react';
import type { t } from 'react-polyglot';
import type { ConnectedProps } from 'react-redux';
import type { CollectionViewStyle } from '../../../constants/collectionViews';
import type { Collection, Entry, GroupOfEntries, TranslatedProps } from '../../../interface';
import type { RootState } from '../../../store';

const GroupHeading = styled('h2')`
  font-size: 23px;
  font-weight: 600;
  color: ${colors.textLead};
`;

const GroupContainer = styled('div')``;

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
      <GroupContainer key={group.id} id={group.id}>
        <GroupHeading>{title}</GroupHeading>
        <EntriesToRender entries={getGroupEntries(entries, group.paths)} />
      </GroupContainer>
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

  let entries = selectEntries(state.entries, collection);
  const groups = selectGroups(state.entries, collection);

  if ('nested' in collection) {
    const collectionFolder = collection.folder ?? '';
    entries = filterNestedEntries(filterTerm || '', collectionFolder, entries);
  }

  const entriesLoaded = selectEntriesLoaded(state.entries, collection.name);
  const isFetching = selectIsFetching(state.entries, collection.name);

  const rawCursor = selectCollectionEntriesCursor(state.cursors, collection.name);
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
