import { DocumentAdd as DocumentAddIcon } from '@styled-icons/fluentui-system-regular/DocumentAdd';
import { DocumentDuplicate as DocumentDuplicateIcon } from '@styled-icons/heroicons-outline/DocumentDuplicate';
import { Eye as EyeIcon } from '@styled-icons/heroicons-outline/Eye';
import { GlobeAlt as GlobeAltIcon } from '@styled-icons/heroicons-outline/GlobeAlt';
import { Trash as TrashIcon } from '@styled-icons/heroicons-outline/Trash';
import { Height as HeightIcon } from '@styled-icons/material-rounded/Height';
import { Check as CheckIcon } from '@styled-icons/material/Check';
import { MoreVert as MoreVertIcon } from '@styled-icons/material/MoreVert';
import { Publish as PublishIcon } from '@styled-icons/material/Publish';
import { Unpublished as UnpublishedIcon } from '@styled-icons/material/Unpublished';
import React, { useCallback, useMemo } from 'react';

import { loadUnpublishedEntry } from '@staticcms/core/actions/editorialWorkflow';
import { deleteLocalBackup, loadEntry } from '@staticcms/core/actions/entries';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectAllowDeletion, selectAllowPublish } from '@staticcms/core/lib/util/collection.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectUseWorkflow } from '@staticcms/core/reducers/selectors/config';
import {
  selectIsFetching,
  selectUseOpenAuthoring,
} from '@staticcms/core/reducers/selectors/globalUI';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import IconButton from '../common/button/IconButton';
import confirm from '../common/confirm/Confirm';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';
import EditorWorkflowToolbarButtons from './EditorWorkflowToolbarButtons';

import type { CollectionWithDefaults, EditorPersistOptions } from '@staticcms/core';
import type { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import type { FC, MouseEventHandler } from 'react';

import './EditorToolbar.css';

export const classes = generateClassNames('EditorToolbar', [
  'root',
  'more-menu',
  'more-menu-button',
  'more-menu-label-icon',
  'preview-toggle',
  'discard-button',
  'delete-button',
  'publish-button',
  'publish-button-icon',
  'publish-button-label',
  'workflow-controls',
]);

export interface EditorToolbarProps {
  isPersisting?: boolean;
  onPersist: (opts?: EditorPersistOptions) => Promise<void>;
  onPersistAndNew: () => Promise<void>;
  onPersistAndDuplicate: () => Promise<void>;
  onDelete: () => Promise<void>;
  onDuplicate: () => void;
  hasChanged: boolean;
  hasUnpublishedChanges: boolean;
  collection: CollectionWithDefaults;
  isNewEntry: boolean;
  isModification?: boolean;
  showPreviewToggle: boolean;
  previewActive: boolean;
  scrollSyncActive: boolean;
  showI18nToggle: boolean;
  i18nActive: boolean;
  togglePreview: MouseEventHandler;
  toggleScrollSync: MouseEventHandler;
  toggleI18n: MouseEventHandler;
  slug?: string | undefined;
  className?: string;
  showMobilePreview: boolean;
  onMobilePreviewToggle: () => void;
  onDiscardDraft: () => void;
  currentStatus: WorkflowStatus | undefined;
  isUpdatingStatus: boolean;
  onChangeStatus: (status: WorkflowStatus) => void;
  isPublishing: boolean;
  onPublish: (opts?: EditorPersistOptions) => Promise<void>;
  onUnPublish: () => Promise<void>;
  onDeleteUnpublishedChanges: () => Promise<void>;
  onPublishAndNew: () => Promise<void>;
  onPublishAndDuplicate: () => Promise<void>;
  disabled: boolean;
}

const EditorToolbar: FC<EditorToolbarProps> = ({
  hasChanged,
  collection,
  onDuplicate,
  isPersisting = false,
  onPersist,
  onPersistAndDuplicate,
  onPersistAndNew,
  isNewEntry,
  isModification,
  onDelete,
  showPreviewToggle,
  previewActive,
  scrollSyncActive,
  showI18nToggle,
  i18nActive,
  togglePreview,
  toggleScrollSync,
  toggleI18n,
  slug,
  className,
  showMobilePreview,
  onMobilePreviewToggle,
  onDiscardDraft,
  currentStatus,
  isUpdatingStatus,
  onChangeStatus,
  hasUnpublishedChanges,
  isPublishing,
  onPublish,
  onUnPublish,
  onDeleteUnpublishedChanges,
  onPublishAndNew,
  onPublishAndDuplicate,
  disabled,
}) => {
  const t = useTranslate();

  const useOpenAuthoring = useAppSelector(selectUseOpenAuthoring);

  const canCreate = useMemo(
    () => ('folder' in collection && collection.create) ?? false,
    [collection],
  );
  const canDelete = useMemo(() => selectAllowDeletion(collection), [collection]);
  const canPublish = useMemo(
    () => selectAllowPublish(collection, slug) && !useOpenAuthoring,
    [collection, slug, useOpenAuthoring],
  );
  const isPublished = useMemo(() => !isNewEntry && !hasChanged, [hasChanged, isNewEntry]);
  const isLoading = useAppSelector(selectIsFetching);

  const useWorkflow = useAppSelector(selectUseWorkflow);

  const dispatch = useAppDispatch();

  const handleDiscardDraft = useCallback(async () => {
    if (!slug) {
      return;
    }

    if (
      await confirm({
        title: 'editor.editorToolbar.discardChangesTitle',
        body: {
          key: 'editor.editorToolbar.discardChangesBody',
        },
        color: 'warning',
      })
    ) {
      await dispatch(deleteLocalBackup(collection, slug));
      if (useWorkflow) {
        await dispatch(loadUnpublishedEntry(collection, slug));
      } else {
        await dispatch(loadEntry(collection, slug));
      }
      onDiscardDraft();
    }
  }, [collection, dispatch, onDiscardDraft, slug, useWorkflow]);

  const handlePublishClick = useCallback(() => {
    if (useWorkflow) {
      onPublish();
      return;
    }

    onPersist();
  }, [onPersist, onPublish, useWorkflow]);

  const handlePublishAndNew = useCallback(() => {
    if (useWorkflow) {
      onPublishAndNew();
      return;
    }

    onPersistAndNew();
  }, [onPersistAndNew, onPublishAndNew, useWorkflow]);

  const handlePublishAndDuplicate = useCallback(() => {
    if (useWorkflow) {
      onPublishAndDuplicate();
      return;
    }

    onPersistAndDuplicate();
  }, [onPersistAndDuplicate, onPublishAndDuplicate, useWorkflow]);

  const menuItems: JSX.Element[][] = useMemo(() => {
    const items: JSX.Element[] = [];

    if ((!useWorkflow && !isPublished) || (useWorkflow && hasUnpublishedChanges)) {
      items.push(
        <MenuItemButton
          key="publishNow"
          onClick={handlePublishClick}
          startIcon={PublishIcon}
          data-testid="publish-now-button"
        >
          {t('editor.editorToolbar.publishNow')}
        </MenuItemButton>,
      );

      if (canCreate) {
        items.push(
          <MenuItemButton
            key="publishAndCreateNew"
            onClick={handlePublishAndNew}
            startIcon={DocumentAddIcon}
            data-testid="publish-and-create-new-button"
          >
            {t('editor.editorToolbar.publishAndCreateNew')}
          </MenuItemButton>,
          <MenuItemButton
            key="publishAndDuplicate"
            onClick={handlePublishAndDuplicate}
            startIcon={DocumentDuplicateIcon}
            data-testid="publish-and-duplicate-button"
          >
            {t('editor.editorToolbar.publishAndDuplicate')}
          </MenuItemButton>,
        );
      }
    } else if (canCreate) {
      items.push(
        <MenuItemButton
          key="duplicate"
          onClick={onDuplicate}
          startIcon={DocumentDuplicateIcon}
          data-testid="duplicate-button"
        >
          {t('editor.editorToolbar.duplicate')}
        </MenuItemButton>,
      );
    }

    const groups = [items];

    if (useWorkflow && canCreate && canPublish && canDelete) {
      groups.push([
        <MenuItemButton
          key="unpublish"
          onClick={onUnPublish}
          startIcon={UnpublishedIcon}
          color="warning"
          data-testid="unpublish-button"
        >
          {t('editor.editorToolbar.unpublish')}
        </MenuItemButton>,
      ]);
    }

    return groups;
  }, [
    canCreate,
    canDelete,
    canPublish,
    handlePublishAndDuplicate,
    handlePublishAndNew,
    handlePublishClick,
    hasUnpublishedChanges,
    isPublished,
    onDuplicate,
    onUnPublish,
    t,
    useWorkflow,
  ]);

  const workflowDeleteLabel = useMemo(() => {
    if (hasUnpublishedChanges) {
      if (isModification) {
        return 'editor.editorToolbar.deleteUnpublishedChanges';
      }

      if (isNewEntry || !isModification) {
        return 'editor.editorToolbar.deleteUnpublishedEntry';
      }

      return;
    }

    if (isNewEntry) {
      return;
    }

    if (!isModification) {
      return 'editor.editorToolbar.deletePublishedEntry';
    }
  }, [hasUnpublishedChanges, isModification, isNewEntry]);

  const publishLabel = useMemo(() => {
    if (useWorkflow) {
      if (isPublishing) {
        return 'editor.editorToolbar.publishing';
      }

      if (hasUnpublishedChanges) {
        return 'editor.editorToolbar.publish';
      }

      if (!isNewEntry) {
        return 'editor.editorToolbar.published';
      }

      return;
    }

    if (isPersisting) {
      return 'editor.editorToolbar.publishing';
    }

    if (isPublished) {
      return 'editor.editorToolbar.published';
    }

    return 'editor.editorToolbar.publish';
  }, [hasUnpublishedChanges, isNewEntry, isPersisting, isPublished, isPublishing, useWorkflow]);

  return (
    <div className={classNames(classes.root, className)}>
      {showI18nToggle || showPreviewToggle || canDelete || hasChanged ? (
        <Menu
          key="extra-menu"
          label={<MoreVertIcon className={classes['more-menu-label-icon']} />}
          color="secondary"
          variant="text"
          rootClassName={classes['more-menu']}
          buttonClassName={classes['more-menu-button']}
          hideDropdownIcon
          aria-label="more options dropdown"
          disabled={disabled}
          data-testid="editor-extra-menu"
        >
          {showI18nToggle || showPreviewToggle ? (
            <MenuGroup>
              {showI18nToggle && (
                <MenuItemButton
                  onClick={toggleI18n}
                  startIcon={GlobeAltIcon}
                  endIcon={i18nActive ? CheckIcon : undefined}
                >
                  {t('editor.editorInterface.sideBySideI18n')}
                </MenuItemButton>
              )}
              {showPreviewToggle && (
                <>
                  <MenuItemButton
                    onClick={togglePreview}
                    disabled={isLoading}
                    startIcon={EyeIcon}
                    endIcon={previewActive && !i18nActive ? CheckIcon : undefined}
                  >
                    {t('editor.editorInterface.preview')}
                  </MenuItemButton>
                  <MenuItemButton
                    onClick={toggleScrollSync}
                    disabled={isLoading || (!i18nActive && !previewActive)}
                    startIcon={HeightIcon}
                    endIcon={
                      scrollSyncActive && (i18nActive || previewActive) ? CheckIcon : undefined
                    }
                  >
                    {t('editor.editorInterface.toggleScrollSync')}
                  </MenuItemButton>
                </>
              )}
            </MenuGroup>
          ) : null}
          {hasChanged ? (
            <MenuGroup key="discard-button">
              <MenuItemButton
                key="discardChanges"
                onClick={handleDiscardDraft}
                startIcon={TrashIcon}
                color="warning"
                data-testid="discard-button"
              >
                {t('editor.editorToolbar.discardChanges')}
              </MenuItemButton>
            </MenuGroup>
          ) : null}
          {canDelete &&
          (!useOpenAuthoring || hasUnpublishedChanges) &&
          (!useWorkflow || workflowDeleteLabel) ? (
            <MenuGroup key="delete-button">
              <MenuItemButton
                onClick={
                  useWorkflow &&
                  workflowDeleteLabel &&
                  workflowDeleteLabel !== 'editor.editorToolbar.deletePublishedEntry'
                    ? onDeleteUnpublishedChanges
                    : onDelete
                }
                startIcon={TrashIcon}
                color="error"
                data-testid="delete-button"
              >
                {useWorkflow ? t(workflowDeleteLabel!) : t('editor.editorToolbar.deleteEntry')}
              </MenuItemButton>
            </MenuGroup>
          ) : null}
        </Menu>
      ) : null}
      {showPreviewToggle ? (
        <IconButton
          icon={EyeIcon}
          key="show-preview-button"
          title={t('editor.editorInterface.preview')}
          variant={showMobilePreview ? 'contained' : 'text'}
          onClick={onMobilePreviewToggle}
          rootClassName={classes['preview-toggle']}
          aria-label="toggle preview"
          disabled={disabled}
        />
      ) : null}
      {hasChanged ? (
        <IconButton
          icon={TrashIcon}
          key="discard-button"
          title={t('editor.editorToolbar.discardChanges')}
          color="warning"
          variant="text"
          onClick={handleDiscardDraft}
          rootClassName={classes['discard-button']}
          aria-label="discard chnages"
          disabled={disabled}
        />
      ) : canDelete &&
        (!useOpenAuthoring || hasUnpublishedChanges) &&
        (!useWorkflow || workflowDeleteLabel) ? (
        <IconButton
          icon={TrashIcon}
          key="delete-button"
          title={useWorkflow ? t(workflowDeleteLabel!) : t('editor.editorToolbar.deleteEntry')}
          color="error"
          variant="text"
          onClick={
            useWorkflow &&
            workflowDeleteLabel &&
            workflowDeleteLabel !== 'editor.editorToolbar.deletePublishedEntry'
              ? onDeleteUnpublishedChanges
              : onDelete
          }
          rootClassName={classes['delete-button']}
          aria-label="delete"
          disabled={disabled}
        />
      ) : null}
      {useWorkflow ? (
        <div className={classes['workflow-controls']}>
          <EditorWorkflowToolbarButtons
            hasChanged={hasChanged}
            isPersisting={isPersisting}
            onPersist={onPersist}
            currentStatus={currentStatus}
            isUpdatingStatus={isUpdatingStatus}
            disabled={disabled}
            onChangeStatus={onChangeStatus}
            isLoading={isLoading}
            useOpenAuthoring={useOpenAuthoring}
          />
        </div>
      ) : null}
      {!useOpenAuthoring && publishLabel ? (
        <Menu
          label={t(publishLabel)}
          color={publishLabel === 'editor.editorToolbar.published' ? 'success' : 'primary'}
          disabled={disabled || (menuItems.length == 1 && menuItems[0].length === 0)}
          startIcon={PublishIcon}
          rootClassName={classes['publish-button']}
          iconClassName={classes['publish-button-icon']}
          labelClassName={classes['publish-button-label']}
          hideDropdownIconOnMobile
          aria-label="publish options dropdown"
          data-testid="publish-dropdown"
        >
          {menuItems.map((group, index) => (
            <MenuGroup key={`menu-group-${index}`}>{group}</MenuGroup>
          ))}
        </Menu>
      ) : null}
    </div>
  );
};

export default EditorToolbar;
