import { createHashHistory } from 'history';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  createDraftDuplicateFromEntry,
  createEmptyDraft,
  deleteDraftLocalBackup,
  deleteEntry,
  deleteLocalBackup,
  loadEntry,
  loadLocalBackup,
  persistEntry,
  persistLocalBackup,
  retrieveLocalBackup,
} from '@staticcms/core/actions/entries';
import { loadScroll, toggleScroll } from '@staticcms/core/actions/scroll';
import { selectFields } from '@staticcms/core/lib/util/collection.util';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectEntry } from '@staticcms/core/reducers/selectors/entries';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import confirm from '../common/confirm/Confirm';
import Loader from '../common/progress/Loader';
import MediaLibraryModal from '../media-library/MediaLibraryModal';
import EditorInterface from './EditorInterface';

import type {
  Collection,
  EditorPersistOptions,
  Entry,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { Blocker } from 'history';
import type { ComponentType, FC } from 'react';
import type { ConnectedProps } from 'react-redux';

const Editor: FC<TranslatedProps<EditorProps>> = ({
  entry,
  entryDraft,
  fields,
  collection,
  hasChanged,
  displayUrl,
  isModification,
  draftKey,
  slug,
  localBackup,
  scrollSyncActive,
  newRecord,
  t,
}) => {
  const [version, setVersion] = useState(0);

  const history = createHashHistory();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const config = useAppSelector(selectConfig);

  const createBackup = useMemo(
    () =>
      debounce(function (entry: Entry, collection: Collection) {
        if (config?.disable_local_backup) {
          return;
        }

        dispatch(persistLocalBackup(entry, collection));
      }, 2000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config],
  );

  const deleteBackup = useCallback(() => {
    if (config?.disable_local_backup) {
      return;
    }

    createBackup.cancel();
    if (slug) {
      dispatch(deleteLocalBackup(collection, slug));
    }
    dispatch(deleteDraftLocalBackup());
  }, [config?.disable_local_backup, createBackup, slug, dispatch, collection]);

  const [submitted, setSubmitted] = useState(false);
  const handlePersistEntry = useCallback(
    (opts: EditorPersistOptions = {}) => {
      const { createNew = false, duplicate = false } = opts;

      if (!entryDraft.entry) {
        return;
      }

      setSubmitted(true);

      setTimeout(async () => {
        try {
          await dispatch(persistEntry(collection, slug, navigate));
          setVersion(version + 1);

          deleteBackup();

          if (createNew) {
            if (duplicate && entryDraft.entry) {
              dispatch(createDraftDuplicateFromEntry(entryDraft.entry));
              navigate(`/collections/${collection.name}/new`, { replace: true });
            } else {
              setSubmitted(false);
              setTimeout(() => {
                dispatch(createEmptyDraft(collection, location.search));
                setVersion(version + 1);
                navigate(`/collections/${collection.name}/new`, { replace: true });
              }, 100);
            }
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }, 100);
    },
    [collection, deleteBackup, dispatch, entryDraft.entry, navigate, slug, version],
  );

  const handleDuplicateEntry = useCallback(() => {
    if (!entryDraft.entry) {
      return;
    }

    dispatch(createDraftDuplicateFromEntry(entryDraft.entry));
    navigate(`/collections/${collection.name}/new?duplicate=true`, { replace: true });
  }, [collection.name, dispatch, entryDraft.entry, navigate]);

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

    if (!slug || newRecord) {
      return navigate(`/collections/${collection.name}`);
    }

    setTimeout(async () => {
      await dispatch(deleteEntry(collection, slug));
      deleteBackup();
      return navigate(`/collections/${collection.name}`);
    }, 0);
  }, [collection, deleteBackup, dispatch, entryDraft.hasChanged, navigate, newRecord, slug]);

  const [prevLocalBackup, setPrevLocalBackup] = useState<
    | {
        entry: Entry;
      }
    | undefined
  >();

  useEffect(() => {
    if (config?.disable_local_backup) {
      return;
    }

    if (
      !prevLocalBackup &&
      localBackup &&
      (!isEqual(localBackup.entry.data, entryDraft.entry?.data) ||
        !isEqual(localBackup.entry.meta, entryDraft.entry?.meta))
    ) {
      const updateLocalBackup = async () => {
        dispatch(loadLocalBackup());
        setVersion(version + 1);
      };

      updateLocalBackup();
    }

    setPrevLocalBackup(localBackup);
  }, [
    config?.disable_local_backup,
    deleteBackup,
    dispatch,
    entryDraft.entry?.data,
    entryDraft.entry?.meta,
    localBackup,
    prevLocalBackup,
    version,
  ]);

  useEffect(() => {
    if (hasChanged && entryDraft.entry) {
      createBackup(entryDraft.entry, collection);
    }

    return () => {
      createBackup.flush();
    };
  }, [collection, createBackup, entryDraft.entry, hasChanged]);

  const [prevCollection, setPrevCollection] = useState<Collection | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | undefined | null>(null);
  useEffect(() => {
    if (newRecord && slug !== prevSlug) {
      setTimeout(() => {
        dispatch(createEmptyDraft(collection, location.search));
      });
    } else if (!newRecord && slug && (prevCollection !== collection || prevSlug !== slug)) {
      setTimeout(() => {
        if (!config?.disable_local_backup) {
          dispatch(retrieveLocalBackup(collection, slug));
        }
        dispatch(loadEntry(collection, slug));
      });
    }

    setPrevCollection(collection);
    setPrevSlug(slug);
  }, [
    collection,
    entryDraft.entry,
    prevSlug,
    prevCollection,
    slug,
    dispatch,
    newRecord,
    config?.disable_local_backup,
  ]);

  const leaveMessage = useMemo(() => t('editor.editor.onLeavePage'), [t]);

  const exitBlocker = useCallback(
    (event: BeforeUnloadEvent) => {
      if (entryDraft.hasChanged) {
        // This message is ignored in most browsers, but its presence triggers the confirmation dialog
        event.returnValue = leaveMessage;
        return leaveMessage;
      }
    },
    [entryDraft.hasChanged, leaveMessage],
  );

  useWindowEvent('beforeunload', exitBlocker);

  const navigationBlocker: Blocker = useCallback(
    ({ location, action }) => {
      /**
       * New entry being saved and redirected to it's new slug based url.
       */
      const isPersisting = entryDraft.entry?.isPersisting;
      const newRecord = entryDraft.entry?.newRecord;
      const newEntryPath = `/collections/${collection.name}/new`;
      if (
        isPersisting &&
        newRecord &&
        location.pathname.startsWith(newEntryPath) &&
        action === 'PUSH'
      ) {
        return;
      }

      if (hasChanged) {
        return leaveMessage;
      }
    },
    [
      collection.name,
      entryDraft.entry?.isPersisting,
      entryDraft.entry?.newRecord,
      hasChanged,
      leaveMessage,
    ],
  );

  useEffect(() => {
    const unblock = history.block(navigationBlocker);

    return () => {
      unblock();
    };
  }, [collection.name, history, navigationBlocker]);

  const handleToggleScroll = useCallback(async () => {
    await dispatch(toggleScroll());
  }, [dispatch]);

  const handleLoadScroll = useCallback(async () => {
    await dispatch(loadScroll());
  }, [dispatch]);

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
    <>
      <EditorInterface
        key={`editor-${version}`}
        draftKey={draftKey}
        entry={entryDraft.entry}
        collection={collection}
        fields={fields}
        fieldsErrors={entryDraft.fieldsErrors}
        onPersist={handlePersistEntry}
        onDelete={handleDeleteEntry}
        onDuplicate={handleDuplicateEntry}
        hasChanged={hasChanged}
        displayUrl={displayUrl}
        isNewEntry={newRecord}
        isModification={isModification}
        toggleScroll={handleToggleScroll}
        scrollSyncActive={scrollSyncActive}
        loadScroll={handleLoadScroll}
        submitted={submitted}
        slug={slug}
        t={t}
      />
      <MediaLibraryModal />
    </>
  );
};

interface CollectionViewOwnProps {
  name: string;
  slug?: string;
  newRecord: boolean;
}

function mapStateToProps(state: RootState, ownProps: CollectionViewOwnProps) {
  const { collections, entryDraft, config, entries, scroll } = state;
  const { name, slug } = ownProps;
  const collection = collections[name];
  const collectionName = collection.name;
  const fields = selectFields(collection, slug);
  const entry = !slug ? null : selectEntry(state, collectionName, slug);
  const hasChanged = entryDraft.hasChanged;
  const displayUrl = config.config?.display_url;
  const isModification = entryDraft.entry?.isModification ?? false;
  const collectionEntriesLoaded = Boolean(entries.pages[collectionName]);
  const localBackup = entryDraft.localBackup;
  const draftKey = entryDraft.key;
  return {
    ...ownProps,
    collection,
    collections,
    entryDraft,
    fields,
    entry,
    hasChanged,
    displayUrl,
    isModification,
    collectionEntriesLoaded,
    localBackup,
    draftKey,
    scrollSyncActive: scroll.isScrolling,
  };
}

const connector = connect(mapStateToProps);
export type EditorProps = ConnectedProps<typeof connector>;

export default connector(translate()(Editor) as ComponentType<EditorProps>);
