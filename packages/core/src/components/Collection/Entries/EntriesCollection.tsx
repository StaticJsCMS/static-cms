import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import { loadEntries, traverseCollectionCursor } from '@staticcms/core/actions/entries';
import { colors } from '@staticcms/core/components/UI/styles';
import useEntries from '@staticcms/core/lib/hooks/useEntries';
import useGroups from '@staticcms/core/lib/hooks/useGroups';
import { Cursor } from '@staticcms/core/lib/util';
import { selectCollectionEntriesCursor } from '@staticcms/core/reducers/selectors/cursors';
import { selectEntriesLoaded, selectIsFetching } from '@staticcms/core/reducers/selectors/entries';
import Entries from './Entries';
import { useAppDispatch } from '@staticcms/core/store/hooks';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Collection, Entry, GroupOfEntries, TranslatedProps } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ComponentType } from 'react';
import type { t } from 'react-polyglot';
import type { ConnectedProps } from 'react-redux';

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
        <EntriesToRender key="entries-with-group" entries={getGroupEntries(entries, group.paths)} />
      </GroupContainer>
    );
  });
}

interface EntriesToRenderProps {
  entries: Entry[];
}

const EntriesCollection = ({
  collection,
  filterTerm,
  isFetching,
  viewStyle,
  cursor,
  page,
  t,
  entriesLoaded,
  readyToLoad,
}: TranslatedProps<EntriesCollectionProps>) => {
  const dispatch = useAppDispatch();

  const [prevReadyToLoad, setPrevReadyToLoad] = useState(false);
  const [prevCollection, setPrevCollection] = useState(collection);

  const groups = useGroups(collection.name);

  const entries = useEntries(collection);

  const filteredEntries = useMemo(() => {
    if ('nested' in collection) {
      const collectionFolder = collection.folder ?? '';
      return filterNestedEntries(filterTerm || '', collectionFolder, entries);
    }

    return entries;
  }, [collection, entries, filterTerm]);

  useEffect(() => {
    console.log('[EntriesCollection] filteredEntries changed!', filteredEntries);
  }, [filteredEntries]);

  useEffect(() => {
    console.log('[EntriesCollection] entries changed!', entries);
  }, [entries]);

  useEffect(() => {
    console.log('[EntriesCollection] groups changed!', groups);
  }, [groups]);

  useEffect(() => {
    console.log('[EntriesCollection] isFetching changed!', isFetching);
  }, [isFetching]);

  useEffect(() => {
    console.log('[EntriesCollection] viewStyle changed!', viewStyle);
  }, [viewStyle]);

  useEffect(() => {
    if (
      collection &&
      !entriesLoaded &&
      readyToLoad &&
      (!prevReadyToLoad || prevCollection !== collection)
    ) {
      dispatch(loadEntries(collection));
    }

    setPrevReadyToLoad(readyToLoad);
    setPrevCollection(collection);
  }, [collection, dispatch, entriesLoaded, prevCollection, prevReadyToLoad, readyToLoad]);

  const handleCursorActions = useCallback(
    (action: string) => {
      dispatch(traverseCollectionCursor(collection, action));
    },
    [collection, dispatch],
  );

  if (groups && groups.length > 0) {
    <>
      {groups.map(group => {
        const title = getGroupTitle(group, t);
        return (
          <GroupContainer key={group.id} id={group.id}>
            <GroupHeading>{title}</GroupHeading>
            <Entries
              collection={collection}
              entries={getGroupEntries(entries, group.paths)}
              isFetching={isFetching}
              collectionName={collection.label}
              viewStyle={viewStyle}
              cursor={cursor}
              handleCursorActions={handleCursorActions}
              page={page}
            />
          </GroupContainer>
        );
      })}
    </>;
  }

  return (
    <Entries
      key="entries-without-group"
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

  const entriesLoaded = selectEntriesLoaded(state, collection.name);
  const isFetching = selectIsFetching(state, collection.name);

  const rawCursor = selectCollectionEntriesCursor(state, collection.name);
  const cursor = Cursor.create(rawCursor).clearData();

  return { ...ownProps, page, filterTerm, entriesLoaded, isFetching, viewStyle, cursor };
}

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EntriesCollectionProps = ConnectedProps<typeof connector>;

export default connector(translate()(EntriesCollection) as ComponentType<EntriesCollectionProps>);
