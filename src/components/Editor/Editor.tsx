import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import { logoutUser as logoutUserAction } from '../../actions/auth';
import {
  changeDraftField as changeDraftFieldAction,
  changeDraftFieldValidation as changeDraftFieldValidationAction,
  createDraftDuplicateFromEntry as createDraftDuplicateFromEntryAction,
  createEmptyDraft as createEmptyDraftAction,
  deleteEntry as deleteEntryAction,
  deleteLocalBackup as deleteLocalBackupAction,
  discardDraft as discardDraftAction,
  loadEntries as loadEntriesAction,
  loadEntry as loadEntryAction,
  loadLocalBackup as loadLocalBackupAction,
  persistEntry as persistEntryAction,
  persistLocalBackup as persistLocalBackupAction,
  retrieveLocalBackup as retrieveLocalBackupAction,
} from '../../actions/entries';
import {
  loadScroll as loadScrollAction,
  toggleScroll as toggleScrollAction,
} from '../../actions/scroll';
import { selectFields } from '../../lib/util/collection.util';
import { selectEntry } from '../../reducers';
import { history, navigateToCollection, navigateToNewEntry } from '../../routing/history';
import { Loader } from '../../ui';
import confirm from '../UI/Confirm';
import EditorInterface from './EditorInterface';

import type { TransitionPromptHook } from 'history';
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type {
  CmsField,
  EditorPersistOptions,
  Entry,
  EntryMeta,
  I18nSettings,
  TranslatedProps,
  ValueOrNestedValue,
} from '../../interface';
import type { RootState } from '../../store';

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
  localBackup,
  collectionEntriesLoaded,
  persistLocalBackup,
  changeDraftField,
  loadEntries,
  loadEntry,
  persistEntry,
  deleteEntry,
  loadLocalBackup,
  retrieveLocalBackup,
  deleteLocalBackup,
  createDraftDuplicateFromEntry,
  createEmptyDraft,
  discardDraft,
}: TranslatedProps<EditorProps>) => {
  const createBackup = useMemo(
    () =>
      debounce(function (entry, collection) {
        persistLocalBackup(entry, collection);
      }, 2000),
    [persistLocalBackup],
  );

  const handleChangeDraftField = useCallback(
    (
      field: CmsField,
      value: ValueOrNestedValue,
      metadata: EntryMeta = {},
      i18n: I18nSettings | undefined,
    ) => {
      const entries = [publishedEntry].filter(Boolean);
      changeDraftField({ field, value, metadata, entries, i18n });
    },
    [changeDraftField, publishedEntry],
  );

  const deleteBackup = useCallback(() => {
    createBackup.cancel();
    if (!newEntry) {
      deleteLocalBackup(collection, slug);
    }
  }, [collection, createBackup, deleteLocalBackup, newEntry, slug]);

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
    [collection, createDraftDuplicateFromEntry, deleteBackup, entryDraft.entry, persistEntry],
  );

  const handleDuplicateEntry = useCallback(() => {
    if (!entryDraft.entry) {
      return;
    }

    navigateToNewEntry(collection.name);
    createDraftDuplicateFromEntry(entryDraft.entry);
  }, [collection.name, createDraftDuplicateFromEntry, entryDraft.entry]);

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
  }, [collection, deleteBackup, deleteEntry, entryDraft.hasChanged, newEntry, slug]);

  const [prevLocalBackup, setPrevLocalBackup] = useState<
    | {
        entry: Entry;
      }
    | undefined
  >();

  useEffect(() => {
    let alive = true;

    if (!prevLocalBackup && localBackup) {
      const updateLocalBackup = async () => {
        const confirmLoadBackup = await confirm({
          title: 'editor.editor.confirmLoadBackupTitle',
          body: 'editor.editor.confirmLoadBackupBody',
        });

        if (alive) {
          if (confirmLoadBackup) {
            loadLocalBackup();
          } else {
            deleteBackup();
          }
        }
      };

      updateLocalBackup();
    }

    setPrevLocalBackup(localBackup);
    return () => {
      alive = false;
    };
  }, [deleteBackup, loadLocalBackup, localBackup, prevLocalBackup]);

  useEffect(() => {
    if (hasChanged) {
      createBackup(entryDraft.entry, collection);
    }
  }, [collection, createBackup, entryDraft.entry, hasChanged]);

  useEffect(() => {
    if (newEntry) {
      createEmptyDraft(collection, location.search);
    }
  }, [collection, createEmptyDraft, newEntry]);

  const [prevCollection, setPrevCollection] = useState(collection);
  const [preSlug, setPrevSlug] = useState(slug);
  useEffect(() => {
    if (!entryDraft.entry && newEntry) {
      createEmptyDraft(collection, location.search);
    } else if (!entryDraft.entry || prevCollection !== collection || preSlug !== slug) {
      console.log('loading!', collection, slug);
      loadEntry(collection, slug);
    }

    setPrevCollection(collection);
    setPrevSlug(slug);
  }, [
    collection,
    createEmptyDraft,
    entryDraft.entry,
    loadEntry,
    newEntry,
    preSlug,
    prevCollection,
    slug,
  ]);

  // useEffect(() => {
  //   retrieveLocalBackup(collection, slug);

  //   console.log('new entry?', newEntry);
  //   if (newEntry) {
  //     createEmptyDraft(collection, location.search);
  //   } else {
  //     console.log('loading!', collection, slug);
  //     loadEntry(collection, slug);
  //   }

  //   const leaveMessage = t('editor.editor.onLeavePage');

  //   const exitBlocker = (event: BeforeUnloadEvent) => {
  //     if (entryDraft.hasChanged) {
  //       // This message is ignored in most browsers, but its presence
  //       // triggers the confirmation dialog
  //       event.returnValue = leaveMessage;
  //       return leaveMessage;
  //     }
  //   };
  //   window.addEventListener('beforeunload', exitBlocker);

  //   const navigationBlocker: TransitionPromptHook = (location, action) => {
  //     /**
  //      * New entry being saved and redirected to it's new slug based url.
  //      */
  //     const isPersisting = entryDraft.entry?.isPersisting;
  //     const newRecord = entryDraft.entry?.newRecord;
  //     const newEntryPath = `/collections/${collection.name}/new`;
  //     if (isPersisting && newRecord && location.pathname === newEntryPath && action === 'PUSH') {
  //       return;
  //     }

  //     if (hasChanged) {
  //       return leaveMessage;
  //     }
  //   };

  //   const unblock = history.block(navigationBlocker);

  //   /**
  //    * This will run as soon as the location actually changes, unless creating
  //    * a new post. The confirmation above will run first.
  //    */
  //   const unlisten = history.listen((location, action) => {
  //     const newEntryPath = `/collections/${collection.name}/new`;
  //     const entriesPath = `/collections/${collection.name}/entries/`;
  //     const { pathname } = location;
  //     if (
  //       pathname.startsWith(newEntryPath) ||
  //       (pathname.startsWith(entriesPath) && action === 'PUSH')
  //     ) {
  //       return;
  //     }

  //     deleteBackup();

  //     unblock();
  //     unlisten();
  //   });

  //   if (!collectionEntriesLoaded) {
  //     loadEntries(collection);
  //   }

  //   return () => {
  //     createBackup.flush();
  //     discardDraft();
  //     window.removeEventListener('beforeunload', exitBlocker);
  //   };
  // }, [
  //   collection,
  //   collectionEntriesLoaded,
  //   createBackup,
  //   createEmptyDraft,
  //   deleteBackup,
  //   discardDraft,
  //   entryDraft.entry?.isPersisting,
  //   entryDraft.entry?.newRecord,
  //   entryDraft.hasChanged,
  //   hasChanged,
  //   loadEntries,
  //   loadEntry,
  //   newEntry,
  //   retrieveLocalBackup,
  //   slug,
  //   t,
  // ]);

  if (entry && entry.error) {
    return (
      <div>
        <h3>{entry.error}</h3>
      </div>
    );
  } else if (entryDraft == null || entryDraft.entry === undefined || (entry && entry.isFetching)) {
    return <Loader>{t('editor.editor.loadingEntry')}</Loader>;
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
      onDuplicate={handleDuplicateEntry}
      showDelete={showDelete ?? true}
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

interface CollectionViewOwnProps {
  name: string;
  slug: string;
  newRecord: boolean;
  showDelete?: boolean;
}

function mapStateToProps(state: RootState, ownProps: CollectionViewOwnProps) {
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
    ...ownProps,
    collection,
    collections,
    newEntry,
    entryDraft,
    fields,
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
  changeDraftField: changeDraftFieldAction,
  changeDraftFieldValidation: changeDraftFieldValidationAction,
  loadEntry: loadEntryAction,
  loadEntries: loadEntriesAction,
  loadLocalBackup: loadLocalBackupAction,
  retrieveLocalBackup: retrieveLocalBackupAction,
  persistLocalBackup: persistLocalBackupAction,
  deleteLocalBackup: deleteLocalBackupAction,
  createDraftDuplicateFromEntry: createDraftDuplicateFromEntryAction,
  createEmptyDraft: createEmptyDraftAction,
  discardDraft: discardDraftAction,
  persistEntry: persistEntryAction,
  deleteEntry: deleteEntryAction,
  logoutUser: logoutUserAction,
  toggleScroll: toggleScrollAction,
  loadScroll: loadScrollAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorProps = ConnectedProps<typeof connector>;

export default connector(translate()(Editor) as ComponentType<EditorProps>);
