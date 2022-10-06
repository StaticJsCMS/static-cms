import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import partial from 'lodash/partial';

import { colors } from '../../../ui';
import { Cursor } from '../../../lib/util';
import {
  loadEntries as actionLoadEntries,
  traverseCollectionCursor as actionTraverseCollectionCursor,
} from '../../../actions/entries';
import {
  selectEntries,
  selectEntriesLoaded,
  selectIsFetching,
  selectGroups,
} from '../../../reducers/entries';
import { selectCollectionEntriesCursor } from '../../../reducers/cursors';
import Entries from './Entries';

import type { t } from 'react-polyglot';
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Collection, Entry, GroupOfEntries, State, TranslatedProps, ViewGroup } from '../../../interface';
import type { CollectionViewStyle } from '../../../constants/collectionViews';

const GroupHeading = styled.h2`
  font-size: 23px;
  font-weight: 600;
  color: ${colors.textLead};
`;

const GroupContainer = styled.div``;

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

function withGroups(groups: GroupOfEntries[], entries: Entry[], EntriesToRender: ComponentType<EntriesToRenderProps>, t: t) {
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

interface EntriesToRenderProps { entries: Entry[] }

const EntriesCollection = ({
  collection,
  entries,
  groups,
  isFetching,
  viewStyle,
  cursor,
  page,
  t,
}: TranslatedProps<EntriesCollectionProps>) => {
  // componentDidMount() {
  //   const { collection, entriesLoaded, loadEntries, readyToLoad } = this.props;
  //   if (collection && !entriesLoaded && readyToLoad) {
  //     loadEntries(collection);
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   const { collection, entriesLoaded, loadEntries, readyToLoad } = this.props;
  //   if (
  //     !entriesLoaded &&
  //     readyToLoad &&
  //     (!prevProps.readyToLoad || prevProps.collection !== collection)
  //   ) {
  //     loadEntries(collection);
  //   }
  // }

  handleCursorActions = (cursor, action) => {
    const { collection, traverseCollectionCursor } = this.props;
    traverseCollectionCursor(collection, action);
  };

  const EntriesToRender = useCallback(({ entries }: EntriesToRenderProps) => {
    return (
      <Entries
        collections={collection}
        entries={entries}
        isFetching={isFetching}
        collectionName={collection.label}
        viewStyle={viewStyle}
        cursor={cursor}
        handleCursorActions={partial(this.handleCursorActions, cursor)}
        page={page}
      />
    );
  }, [collection, cursor, isFetching, page, viewStyle]);

  if (groups && groups.length > 0) {
    return withGroups(groups, entries, EntriesToRender, t);
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

function mapStateToProps(state: State, ownProps: EntriesCollectionOwnProps) {
  const { collection, viewStyle, filterTerm } = ownProps;
  const page = state.entries.pages[collection.name]?.page;

  let entries = selectEntries(state.entries, collection);
  const groups = selectGroups(state.entries, collection);

  if ('nested' in collection) {
    const collectionFolder = collection.folder;
    entries = filterNestedEntries(filterTerm || '', collectionFolder, entries);
  }

  const entriesLoaded = selectEntriesLoaded(state.entries, collection.name);
  const isFetching = selectIsFetching(state.entries, collection.name);

  const rawCursor = selectCollectionEntriesCursor(state.cursors, collection.name);
  const cursor = Cursor.create(rawCursor).clearData();

  return { ...ownProps, page, entries, groups, entriesLoaded, isFetching, viewStyle, cursor };
}

const mapDispatchToProps = {
  loadEntries: actionLoadEntries,
  traverseCollectionCursor: actionTraverseCollectionCursor,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EntriesCollectionProps = ConnectedProps<typeof connector>;

export default connector(translate()(EntriesCollection) as ComponentType<EntriesCollectionProps>);
