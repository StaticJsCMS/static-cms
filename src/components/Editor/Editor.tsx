import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/auth';
import {
  changeDraftField,
  changeDraftFieldValidation,
  createDraftDuplicateFromEntry,
  createEmptyDraft,
  deleteEntry,
  deleteLocalBackup,
  discardDraft,
  loadEntries,
  loadEntry,
  loadLocalBackup,
  persistEntry,
  persistLocalBackup,
  retrieveLocalBackup,
} from '../../actions/entries';
import { loadScroll, toggleScroll } from '../../actions/scroll';
import { selectEntry } from '../../reducers';
import { selectFields } from '../../reducers/collections';
import { history, navigateToCollection, navigateToNewEntry } from '../../routing/history';
import { Loader } from '../../ui';
import confirm from '../UI/Confirm';
import EditorInterface from './EditorInterface';

import type { ConnectedProps } from 'react-redux';
import type { ComponentType } from 'react';
import type { State, TranslatedProps } from '../../interface';

interface EditorPersistOptions {
  createNew?: boolean;
  duplicate?: boolean;
}

const Editor = ({
  entry,
  entryDraft,
  fields,
  collection,
  changeDraftFieldValidation,
  user,
  hasChanged,
  displayUrl,
  newEntry,
  isModification,
  logoutUser,
  draftKey,
  t,
  editorBackLink,
  toggleScroll,
  scrollSyncEnabled,
  loadScroll,
  showDelete,
  slug,
  publishedEntry,
}: TranslatedProps<EditorProps>) => {
  const createBackup = useMemo(
    () =>
      debounce(function (entry, collection) {
        persistLocalBackup(entry, collection);
      }, 2000),
    [],
  );

  const handleChangeDraftField = useCallback((field, value, metadata, i18n) => {
    const entries = [publishedEntry].filter(Boolean);
    changeDraftField({ field, value, metadata, entries, i18n });
  }, []);

  const deleteBackup = useCallback(() => {
    createBackup.cancel();
    if (!newEntry) {
      deleteLocalBackup(collection, slug);
    }
  }, [collection, createBackup, newEntry, slug]);

  const handlePersistEntry = useCallback(
    async (opts: EditorPersistOptions = {}) => {
      const { createNew = false, duplicate = false } = opts;

      await persistEntry(collection);

      deleteBackup();

      if (createNew) {
        navigateToNewEntry(collection.name);
        if (duplicate && entryDraft.entry) {
          createDraftDuplicateFromEntry(entryDraft.entry);
        }
      }
    },
    [collection, deleteBackup, entryDraft.entry],
  );

  const handleDuplicateEntry = useCallback(() => {
    if (!entryDraft.entry) {
      return;
    }

    navigateToNewEntry(collection.name);
    createDraftDuplicateFromEntry(entryDraft.entry);
  }, [collection.name, entryDraft.entry]);

  const handleDeleteEntry = useCallback(async () => {
    if (entryDraft.hasChanged) {
      if (
        !(await confirm({
          title: 'editor.editor.onDeleteWithUnsavedChangesTitle',
          body: 'editor.editor.onDeleteWithUnsavedChangesBody',
          color: 'error',
        }))
      ) {
        return;
      }
    } else if (
      !(await confirm({
        title: 'editor.editor.onDeletePublishedEntryTitle',
        body: 'editor.editor.onDeletePublishedEntryBody',
        color: 'error',
      }))
    ) {
      return;
    }

    if (newEntry) {
      return navigateToCollection(collection.name);
    }

    setTimeout(async () => {
      await deleteEntry(collection, slug);
      deleteBackup();
      return navigateToCollection(collection.name);
    }, 0);
  }, [collection, deleteBackup, entryDraft.hasChanged, newEntry, slug]);

  if (entry && entry.error) {
    return (
      <div>
        <h3>{entry.error}</h3>
      </div>
    );
  } else if (entryDraft == null || entryDraft.entry === undefined || (entry && entry.isFetching)) {
    return <Loader $active>{t('editor.editor.loadingEntry')}</Loader>;
  }

  return (
    <EditorInterface
      draftKey={draftKey}
      entry={entryDraft.entry}
      collection={collection}
      fields={fields}
      fieldsMetaData={entryDraft.fieldsMetaData}
      fieldsErrors={entryDraft.fieldsErrors}
      onChange={handleChangeDraftField}
      onValidate={changeDraftFieldValidation}
      onPersist={handlePersistEntry}
      onDelete={handleDeleteEntry}
      onPublish={handlePublishEntry}
      onDuplicate={handleDuplicateEntry}
      showDelete={showDelete}
      user={user}
      hasChanged={hasChanged}
      displayUrl={displayUrl}
      isNewEntry={newEntry}
      isModification={isModification}
      onLogoutClick={logoutUser}
      editorBackLink={editorBackLink}
      toggleScroll={toggleScroll}
      scrollSyncEnabled={scrollSyncEnabled}
      loadScroll={loadScroll}
      t={t}
    />
  );
};

// class Editor extends React.Component {
//   static propTypes = {
//     changeDraftField: PropTypes.func.isRequired,
//     changeDraftFieldValidation: PropTypes.func.isRequired,
//     collection: ImmutablePropTypes.map.isRequired,
//     createDraftDuplicateFromEntry: PropTypes.func.isRequired,
//     createEmptyDraft: PropTypes.func.isRequired,
//     discardDraft: PropTypes.func.isRequired,
//     entry: ImmutablePropTypes.map,
//     entryDraft: ImmutablePropTypes.map.isRequired,
//     loadEntry: PropTypes.func.isRequired,
//     persistEntry: PropTypes.func.isRequired,
//     deleteEntry: PropTypes.func.isRequired,
//     showDelete: PropTypes.bool.isRequired,
//     fields: ImmutablePropTypes.list.isRequired,
//     slug: PropTypes.string,
//     newEntry: PropTypes.bool.isRequired,
//     displayUrl: PropTypes.string,
//     isModification: PropTypes.bool,
//     collectionEntriesLoaded: PropTypes.bool,
//     logoutUser: PropTypes.func.isRequired,
//     loadEntries: PropTypes.func.isRequired,
//     currentStatus: PropTypes.string,
//     user: PropTypes.object,
//     location: PropTypes.shape({
//       pathname: PropTypes.string,
//       search: PropTypes.string,
//     }),
//     hasChanged: PropTypes.bool,
//     t: PropTypes.func.isRequired,
//     retrieveLocalBackup: PropTypes.func.isRequired,
//     localBackup: ImmutablePropTypes.map,
//     loadLocalBackup: PropTypes.func,
//     persistLocalBackup: PropTypes.func.isRequired,
//     deleteLocalBackup: PropTypes.func,
//     toggleScroll: PropTypes.func.isRequired,
//     scrollSyncEnabled: PropTypes.bool.isRequired,
//     loadScroll: PropTypes.func.isRequired,
//   };

//   componentDidMount() {
//     const {
//       newEntry,
//       collection,
//       slug,
//       loadEntry,
//       createEmptyDraft,
//       loadEntries,
//       retrieveLocalBackup,
//       collectionEntriesLoaded,
//       t,
//     } = this.props;

//     retrieveLocalBackup(collection, slug);

//     if (newEntry) {
//       createEmptyDraft(collection, this.props.location.search);
//     } else {
//       loadEntry(collection, slug);
//     }

//     const leaveMessage = t('editor.editor.onLeavePage');

//     this.exitBlocker = event => {
//       if (this.props.entryDraft.hasChanged) {
//         // This message is ignored in most browsers, but its presence
//         // triggers the confirmation dialog
//         event.returnValue = leaveMessage;
//         return leaveMessage;
//       }
//     };
//     window.addEventListener('beforeunload', this.exitBlocker);

//     const navigationBlocker = (location, action) => {
//       /**
//        * New entry being saved and redirected to it's new slug based url.
//        */
//       const isPersisting = this.props.entryDraft.getIn(['entry', 'isPersisting']);
//       const newRecord = this.props.entryDraft.getIn(['entry', 'newRecord']);
//       const newEntryPath = `/collections/${collection.name}/new`;
//       if (
//         isPersisting &&
//         newRecord &&
//         this.props.location.pathname === newEntryPath &&
//         action === 'PUSH'
//       ) {
//         return;
//       }

//       if (this.props.hasChanged) {
//         return leaveMessage;
//       }
//     };

//     const unblock = history.block(navigationBlocker);

//     /**
//      * This will run as soon as the location actually changes, unless creating
//      * a new post. The confirmation above will run first.
//      */
//     this.unlisten = history.listen((location, action) => {
//       const newEntryPath = `/collections/${collection.name}/new`;
//       const entriesPath = `/collections/${collection.name}/entries/`;
//       const { pathname } = location;
//       if (
//         pathname.startsWith(newEntryPath) ||
//         (pathname.startsWith(entriesPath) && action === 'PUSH')
//       ) {
//         return;
//       }

//       this.deleteBackup();

//       unblock();
//       this.unlisten();
//     });

//     if (!collectionEntriesLoaded) {
//       loadEntries(collection);
//     }
//   }

//   async checkLocalBackup(prevProps) {
//     const { hasChanged, localBackup, loadLocalBackup, entryDraft, collection } = this.props;

//     if (!prevProps.localBackup && localBackup) {
//       const confirmLoadBackup = await confirm({
//         title: 'editor.editor.confirmLoadBackupTitle',
//         body: 'editor.editor.confirmLoadBackupBody',
//       });
//       if (confirmLoadBackup) {
//         loadLocalBackup();
//       } else {
//         this.deleteBackup();
//       }
//     }

//     if (hasChanged) {
//       this.createBackup(entryDraft.entry, collection);
//     }
//   }

//   componentDidUpdate(prevProps) {
//     this.checkLocalBackup(prevProps);

//     if (prevProps.entry === this.props.entry) {
//       return;
//     }

//     const { newEntry, collection } = this.props;

//     if (newEntry) {
//       prevProps.createEmptyDraft(collection, this.props.location.search);
//     }
//   }

//   componentWillUnmount() {
//     this.createBackup.flush();
//     this.props.discardDraft();
//     window.removeEventListener('beforeunload', this.exitBlocker);
//   }
// }

interface CollectionViewOwnProps {
  name: string;
  slug: string;
  newRecord: boolean;
}

function mapStateToProps(state: State, ownProps: CollectionViewOwnProps) {
  const { collections, entryDraft, auth, config, entries, scroll } = state;
  const { name, slug, newRecord } = ownProps;
  const collection = collections[name];
  const collectionName = collection.name;
  const newEntry = newRecord === true;
  const fields = selectFields(collection, slug);
  const entry = newEntry ? null : selectEntry(state, collectionName, slug);
  const user = auth.user;
  const hasChanged = entryDraft.hasChanged;
  const displayUrl = config.config?.display_url;
  const isModification = entryDraft.entry?.isModification ?? false;
  const collectionEntriesLoaded = Boolean(entries.pages[collectionName]);
  const publishedEntry = selectEntry(state, collectionName, slug);
  const localBackup = entryDraft.localBackup;
  const draftKey = entryDraft.key;
  let editorBackLink = `/collections/${collectionName}`;
  if ('files' in collection && collection.files?.length === 1) {
    editorBackLink = '/';
  }

  if ('nested' in collection && collection.nested && slug) {
    const pathParts = slug.split('/');
    if (pathParts.length > 2) {
      editorBackLink = `${editorBackLink}/filter/${pathParts.slice(0, -2).join('/')}`;
    }
  }

  const scrollSyncEnabled = scroll.isScrolling;

  return {
    collection,
    collections,
    newEntry,
    entryDraft,
    fields,
    slug,
    entry,
    user,
    hasChanged,
    displayUrl,
    isModification,
    collectionEntriesLoaded,
    localBackup,
    draftKey,
    publishedEntry,
    editorBackLink,
    scrollSyncEnabled,
  };
}

const mapDispatchToProps = {
  changeDraftField,
  changeDraftFieldValidation,
  loadEntry,
  loadEntries,
  loadLocalBackup,
  retrieveLocalBackup,
  persistLocalBackup,
  deleteLocalBackup,
  createDraftDuplicateFromEntry,
  createEmptyDraft,
  discardDraft,
  persistEntry,
  deleteEntry,
  logoutUser,
  toggleScroll,
  loadScroll,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorProps = ConnectedProps<typeof connector>;

export default connector(translate()(Editor) as ComponentType<EditorProps>);
