import { createHashHistory } from 'history';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createDraftDuplicateFromEntry,
  createEmptyDraft,
  deleteDraftLocalBackup,
  deleteEntry,
  deleteLocalBackup,
  loadBackup,
  loadEntry,
  persistEntry,
  persistLocalBackup,
  retrieveLocalBackup,
} from '@staticcms/core/actions/entries';
import { loadMedia } from '@staticcms/core/actions/mediaLibrary';
import { loadScroll, toggleScroll } from '@staticcms/core/actions/scroll';
import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import useDebouncedCallback from '@staticcms/core/lib/hooks/useDebouncedCallback';
import useEntryCallback from '@staticcms/core/lib/hooks/useEntryCallback';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { getFields, getFileFromSlug } from '@staticcms/core/lib/util/collection.util';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { selectConfig, selectUseWorkflow } from '@staticcms/core/reducers/selectors/config';
import { selectUnpublishedEntry } from '@staticcms/core/reducers/selectors/editorialWorkflow';
import { selectEntry } from '@staticcms/core/reducers/selectors/entries';
import { selectEntryDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { selectIsScrolling } from '@staticcms/core/reducers/selectors/scroll';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import { addSnackbar } from '@staticcms/core/store/slices/snackbars';
import {
  deleteUnpublishedEntry,
  loadUnpublishedEntry,
  persistUnpublishedEntry,
  publishUnpublishedEntry,
  unpublishPublishedEntry,
  updateUnpublishedEntryStatus,
} from '../../actions/editorialWorkflow';
import alert from '../common/alert/Alert';
import confirm from '../common/confirm/Confirm';
import Loader from '../common/progress/Loader';
import MediaLibraryModal from '../media-library/MediaLibraryModal';
import EditorInterface from './EditorInterface';

import type {
  CollectionWithDefaults,
  EditorPersistOptions,
  Entry,
} from '@staticcms/core/interface';
import type { Blocker } from 'history';
import type { FC } from 'react';

export interface EditorProps {
  name: string;
  slug?: string;
  newRecord: boolean;
}

const Editor: FC<EditorProps> = ({ name: collectionName, slug, newRecord }) => {
  const t = useTranslate();

  const [version, setVersion] = useState(0);

  const history = createHashHistory();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const config = useAppSelector(selectConfig);
  const entryDraft = useAppSelector(selectEntryDraft);

  const collection = useAppSelector(state => selectCollection(state, collectionName));

  const useWorkflow = useAppSelector(selectUseWorkflow);

  const unPublishedEntry = useAppSelector(state =>
    selectUnpublishedEntry(state, collectionName, slug),
  );
  const hasUnpublishedEntry = useMemo(
    () => Boolean(useWorkflow && unPublishedEntry),
    [unPublishedEntry, useWorkflow],
  );
  const currentStatus = useMemo(
    () => unPublishedEntry && unPublishedEntry.status,
    [unPublishedEntry],
  );
  const isModification = useMemo(
    () => entryDraft.entry?.isModification ?? false,
    [entryDraft.entry?.isModification],
  );
  const hasChanged = useMemo(() => entryDraft.hasChanged, [entryDraft.hasChanged]);
  const isUpdatingStatus = useMemo(
    () => Boolean(entryDraft.entry?.isUpdatingStatus),
    [entryDraft.entry?.isUpdatingStatus],
  );
  const isPublishing = useMemo(
    () => Boolean(entryDraft.entry?.isPublishing),
    [entryDraft.entry?.isPublishing],
  );

  const entry = useAppSelector(state => selectEntry(state, collectionName, slug));
  const fields = useMemo(() => getFields(collection, slug), [collection, slug]);

  const scrollSyncActive = useAppSelector(selectIsScrolling);

  const createBackup = useMemo(
    () =>
      debounce(function (entry: Entry, collection: CollectionWithDefaults) {
        if (config?.disable_local_backup || !slug) {
          return;
        }

        dispatch(persistLocalBackup(entry, collection));
      }, 2000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config],
  );

  const deleteBackup = useCallback(() => {
    if (!collection || config?.disable_local_backup) {
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

      if (!collection || !entryDraft.entry) {
        return;
      }

      setSubmitted(true);

      setTimeout(async () => {
        try {
          deleteBackup();

          if (useWorkflow) {
            await dispatch(
              persistUnpublishedEntry(collection, slug, hasUnpublishedEntry, navigate),
            );
          } else {
            await dispatch(persistEntry(collection, slug, navigate));
          }
          setVersion(version + 1);

          if (createNew) {
            if (duplicate && entryDraft.entry) {
              dispatch(createDraftDuplicateFromEntry(entryDraft.entry));
              navigate(`/collections/${collection.name}/new`, { replace: true });
            } else {
              setSubmitted(false);
              setTimeout(async () => {
                await dispatch(loadMedia());
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
    [
      collection,
      deleteBackup,
      dispatch,
      entryDraft.entry,
      hasUnpublishedEntry,
      navigate,
      slug,
      useWorkflow,
      version,
    ],
  );

  const debouncedHandlePersistEntry = useDebouncedCallback(handlePersistEntry, 250);

  const handleChangeStatus = useCallback(
    (newStatus: WorkflowStatus) => {
      if (!collection || !slug || !currentStatus) {
        return;
      }

      if (entryDraft.hasChanged) {
        alert({
          title: 'editor.editor.onUpdatingWithUnsavedChangesTitle',
          body: {
            key: 'editor.editor.onUpdatingWithUnsavedChangesBody',
          },
        });
        return;
      }
      dispatch(updateUnpublishedEntryStatus(collection.name, slug, currentStatus, newStatus));
    },
    [collection, currentStatus, dispatch, entryDraft.hasChanged, slug],
  );

  const handlePublishEntry = useCallback(
    async (opts: { createNew?: boolean; duplicate?: boolean } = {}) => {
      if (!collection || !slug || !entryDraft.entry) {
        return;
      }

      const { createNew = false, duplicate = false } = opts;

      if (currentStatus !== WorkflowStatus.PENDING_PUBLISH) {
        alert({
          title: 'editor.editor.onPublishingNotReadyTitle',
          body: {
            key: 'editor.editor.onPublishingNotReadyBody',
          },
        });
        return;
      }

      if (entryDraft.hasChanged) {
        alert({
          title: 'editor.editor.onPublishingWithUnsavedChangesTitle',
          body: {
            key: 'editor.editor.onPublishingWithUnsavedChangesBody',
          },
        });
        return;
      }

      if (
        !(await confirm({
          title: 'editor.editor.onPublishingTitle',
          body: 'editor.editor.onPublishingBody',
        }))
      ) {
        return;
      }

      await dispatch(publishUnpublishedEntry(collection.name, slug, navigate));

      deleteBackup();

      if (createNew) {
        navigate(`/collections/${collection.name}/new?duplicate=true`, { replace: true });
        return;
      }

      if (duplicate) {
        dispatch(createDraftDuplicateFromEntry(entryDraft.entry));
        navigate(`/collections/${collection.name}/new?duplicate=true`, { replace: true });
        return;
      }
    },
    [
      collection,
      currentStatus,
      deleteBackup,
      dispatch,
      entryDraft.entry,
      entryDraft.hasChanged,
      navigate,
      slug,
    ],
  );

  const handleUnpublishEntry = useCallback(async () => {
    if (!collection || !slug) {
      return;
    }

    if (
      !(await confirm({
        title: 'editor.editor.onUnpublishingTitle',
        body: 'editor.editor.onUnpublishingBody',
        color: 'error',
      }))
    ) {
      return;
    }

    await dispatch(unpublishPublishedEntry(collection, slug));

    return navigate(`/collections/${collection.name}?noredirect`);
  }, [collection, dispatch, navigate, slug]);

  const handleDuplicateEntry = useCallback(() => {
    if (!collection || !entryDraft.entry) {
      return;
    }

    dispatch(createDraftDuplicateFromEntry(entryDraft.entry));
    navigate(`/collections/${collection.name}/new?duplicate=true`, { replace: true });
  }, [collection, dispatch, entryDraft.entry, navigate]);

  const handleDeleteEntry = useCallback(async () => {
    if (!collection) {
      return;
    }

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
      return navigate(`/collections/${collection.name}?noredirect`);
    }

    setTimeout(async () => {
      await dispatch(deleteEntry(collection, slug));
      deleteBackup();
      dispatch(
        addSnackbar({
          type: 'success',
          message: {
            key: `ui.toast.${useWorkflow ? 'onDeletePublishedEntry' : 'entryDeleted'}`,
          },
        }),
      );
      return navigate(`/collections/${collection.name}?noredirect`);
    }, 0);
  }, [
    collection,
    deleteBackup,
    dispatch,
    entryDraft.hasChanged,
    navigate,
    newRecord,
    slug,
    useWorkflow,
  ]);

  const handleDeleteUnpublishedChanges = useCallback(async () => {
    if (!collection) {
      return;
    }

    if (entryDraft.hasChanged) {
      if (
        entryDraft.hasChanged &&
        !(await confirm({
          title: 'editor.editor.onDeleteUnpublishedChangesWithUnsavedChangesTitle',
          body: 'editor.editor.onDeleteUnpublishedChangesWithUnsavedChangesBody',
          color: 'error',
        }))
      ) {
        return;
      }
    } else if (
      !(await confirm({
        title: 'editor.editor.onDeleteUnpublishedChangesTitle',
        body: 'editor.editor.onDeleteUnpublishedChangesBody',
        color: 'error',
      }))
    ) {
      return;
    }

    if (!slug || newRecord) {
      return navigate(`/collections/${collection.name}?noredirect`);
    }

    setTimeout(async () => {
      await dispatch(deleteUnpublishedEntry(collection.name, slug));
      deleteBackup();
      dispatch(
        addSnackbar({
          type: 'success',
          message: {
            key: 'ui.toast.onDeleteUnpublishedChanges',
          },
        }),
      );
      if (isModification) {
        dispatch(loadEntry(collection, slug));
      } else {
        return navigate(`/collections/${collection.name}?noredirect`);
      }
    }, 0);
  }, [
    collection,
    deleteBackup,
    dispatch,
    entryDraft.hasChanged,
    isModification,
    navigate,
    newRecord,
    slug,
  ]);

  useEffect(() => {
    if (!collection || submitted) {
      return;
    }

    if (hasChanged && entryDraft.entry) {
      createBackup(entryDraft.entry, collection);
    }

    return () => {
      createBackup.flush();
    };
  }, [collection, createBackup, entryDraft.entry, hasChanged, submitted]);

  const hasLivePreview = useMemo(() => {
    if (!collection) {
      return false;
    }

    let livePreview = typeof collection.editor?.live_preview === 'string';

    if ('files' in collection) {
      if (entryDraft.entry) {
        const file = getFileFromSlug(collection, entryDraft.entry.slug);

        if (file?.editor) {
          livePreview = livePreview || typeof file.editor.live_preview === 'string';
        }
      }
    }

    return livePreview;
  }, [collection, entryDraft.entry]);

  useEntryCallback({
    hasLivePreview,
    collection,
    slug,
    callback: () => {
      setVersion(version => version + 1);
    },
  });

  const [prevCollection, setPrevCollection] = useState<CollectionWithDefaults | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | undefined | null>(null);
  useEffect(() => {
    if (!collection) {
      return;
    }

    if (newRecord && slug !== prevSlug) {
      setTimeout(async () => {
        await dispatch(loadMedia());
        await dispatch(createEmptyDraft(collection, location.search));
      });
    } else if (!newRecord && slug && (prevCollection !== collection || prevSlug !== slug)) {
      setTimeout(async () => {
        if (useWorkflow) {
          await dispatch(loadUnpublishedEntry(collection, slug));
        } else {
          await dispatch(loadEntry(collection, slug));
        }

        if (!config?.disable_local_backup) {
          await dispatch(retrieveLocalBackup(collection, slug));
        }
        if (submitted && config?.disable_local_backup) {
          return;
        }

        dispatch(loadBackup());
        setVersion(version + 1);
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
    useWorkflow,
    submitted,
    version,
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
      if (!collection) {
        return;
      }

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
      collection,
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
  }, [collection?.name, history, navigationBlocker]);

  const handleToggleScroll = useCallback(async () => {
    await dispatch(toggleScroll());
  }, [dispatch]);

  const handleLoadScroll = useCallback(async () => {
    await dispatch(loadScroll());
  }, [dispatch]);

  const handleDiscardDraft = useCallback(() => {
    setVersion(version => version + 1);
  }, []);

  if (entry && entry.error) {
    return (
      <div>
        <h3>{entry.error}</h3>
      </div>
    );
  } else if (
    !collection ||
    entryDraft == null ||
    entryDraft.entry === undefined ||
    (entry && entry.isFetching)
  ) {
    return <Loader>{t('editor.editor.loadingEntry')}</Loader>;
  }

  return (
    <>
      <EditorInterface
        key={`editor-${version}`}
        draftKey={entryDraft.key}
        entry={entryDraft.entry}
        collection={collection}
        fields={fields}
        fieldsErrors={entryDraft.fieldsErrors}
        onPersist={debouncedHandlePersistEntry}
        onDelete={handleDeleteEntry}
        onDuplicate={handleDuplicateEntry}
        hasChanged={hasChanged}
        isNewEntry={newRecord}
        isModification={isModification}
        toggleScroll={handleToggleScroll}
        scrollSyncActive={scrollSyncActive}
        loadScroll={handleLoadScroll}
        onDiscardDraft={handleDiscardDraft}
        submitted={submitted}
        slug={slug}
        currentStatus={currentStatus}
        isUpdatingStatus={isUpdatingStatus}
        onChangeStatus={handleChangeStatus}
        onPublish={handlePublishEntry}
        onUnPublish={handleUnpublishEntry}
        onDeleteUnpublishedChanges={handleDeleteUnpublishedChanges}
        hasUnpublishedChanges={hasUnpublishedEntry}
        isPublishing={isPublishing}
      />
      <MediaLibraryModal />
    </>
  );
};

export default Editor;
