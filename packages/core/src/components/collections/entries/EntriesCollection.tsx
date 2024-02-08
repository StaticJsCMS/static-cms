import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { loadEntries, traverseCollectionCursor } from '@staticcms/core/actions/entries';
import useEntries from '@staticcms/core/lib/hooks/useEntries';
import useGroups from '@staticcms/core/lib/hooks/useGroups';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { Cursor } from '@staticcms/core/lib/util';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectUseWorkflow } from '@staticcms/core/reducers/selectors/config';
import { selectCollectionEntriesCursor } from '@staticcms/core/reducers/selectors/cursors';
import { selectEntriesLoaded, selectIsFetching } from '@staticcms/core/reducers/selectors/entries';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../../common/button/Button';
import Entries from './Entries';
import entriesClasses from './Entries.classes';

import type { CollectionWithDefaults, Entry, GroupOfEntries } from '@staticcms/core';
import type { ViewStyle } from '@staticcms/core/constants/views';
import type { RootState } from '@staticcms/core/store';
import type { FC } from 'react';
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

const EntriesCollection: FC<EntriesCollectionProps> = ({
  collection,
  filterTerm,
  isFetching,
  viewStyle,
  cursor,
  page,
  entriesLoaded,
}) => {
  const t = useTranslate();

  const dispatch = useAppDispatch();

  const [prevCollection, setPrevCollection] = useState(collection);

  const groups = useGroups(collection.name);

  const entries = useEntries(collection);
  const useWorkflow = useAppSelector(selectUseWorkflow);

  const filteredEntries = useMemo(() => {
    if ('nested' in collection) {
      const collectionFolder = collection.folder ?? '';
      return filterNestedEntries(filterTerm || '', collectionFolder, entries);
    }

    return entries;
  }, [collection, entries, filterTerm]);

  useEffect(() => {
    if (collection && !entriesLoaded && prevCollection !== collection) {
      dispatch(loadEntries(collection));
    }

    setPrevCollection(collection);
  }, [collection, dispatch, entriesLoaded, prevCollection, useWorkflow]);

  const handleCursorActions = useCallback(
    (action: string) => {
      dispatch(traverseCollectionCursor(collection, action));
    },
    [collection, dispatch],
  );

  const [selectedGroup, setSelectedGroup] = useState(0);
  const handleGroupClick = useCallback(
    (index: number) => () => {
      setSelectedGroup(index);
    },
    [],
  );

  if (groups && groups.length > 0) {
    return (
      <>
        <div className={entriesClasses.group}>
          <div className={entriesClasses['group-content-wrapper']}>
            <div className={classNames(entriesClasses['group-content'], 'CMS_Scrollbar_hide')}>
              {groups.map((group, index) => {
                const title = getGroupTitle(group, t);
                return (
                  <Button
                    key={index}
                    variant={index === selectedGroup ? 'contained' : 'text'}
                    onClick={handleGroupClick(index)}
                    className={entriesClasses['group-button']}
                    aria-label={`group by ${title}`}
                    data-testid={`group-by-${title}`}
                  >
                    {title}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        <Entries
          key={`entries-with-group-${groups[selectedGroup].id}`}
          collection={collection}
          entries={getGroupEntries(filteredEntries, groups[selectedGroup].paths)}
          isFetching={isFetching}
          viewStyle={viewStyle}
          cursor={cursor}
          handleCursorActions={handleCursorActions}
          page={page}
          filterTerm={filterTerm}
        />
      </>
    );
  }

  return (
    <Entries
      key="entries-without-group"
      collection={collection}
      entries={filteredEntries}
      isFetching={isFetching}
      viewStyle={viewStyle}
      cursor={cursor}
      handleCursorActions={handleCursorActions}
      page={page}
      filterTerm={filterTerm}
    />
  );
};

interface EntriesCollectionOwnProps {
  collection: CollectionWithDefaults;
  viewStyle: ViewStyle;
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

export default connector(EntriesCollection);
