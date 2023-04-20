import { DocumentAdd as DocumentAddIcon } from '@styled-icons/fluentui-system-regular/DocumentAdd';
import { DocumentDuplicate as DocumentDuplicateIcon } from '@styled-icons/heroicons-outline/DocumentDuplicate';
import { Eye as EyeIcon } from '@styled-icons/heroicons-outline/Eye';
import { GlobeAlt as GlobeAltIcon } from '@styled-icons/heroicons-outline/GlobeAlt';
import { Trash as TrashIcon } from '@styled-icons/heroicons-outline/Trash';
import { Height as HeightIcon } from '@styled-icons/material-rounded/Height';
import { Check as CheckIcon } from '@styled-icons/material/Check';
import { MoreVert as MoreVertIcon } from '@styled-icons/material/MoreVert';
import { Publish as PublishIcon } from '@styled-icons/material/Publish';
import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';

import { selectAllowDeletion } from '@staticcms/core/lib/util/collection.util';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';
import confirm from '../common/confirm/Confirm';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { deleteLocalBackup, loadEntry } from '@staticcms/core/actions/entries';

import type { Collection, EditorPersistOptions, TranslatedProps } from '@staticcms/core/interface';
import type { FC, MouseEventHandler } from 'react';

export interface EditorToolbarProps {
  isPersisting?: boolean;
  isDeleting?: boolean;
  onPersist: (opts?: EditorPersistOptions) => Promise<void>;
  onPersistAndNew: () => Promise<void>;
  onPersistAndDuplicate: () => Promise<void>;
  onDelete: () => Promise<void>;
  onDuplicate: () => void;
  hasChanged: boolean;
  displayUrl: string | undefined;
  collection: Collection;
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
}

const EditorToolbar = ({
  hasChanged,
  // TODO displayUrl,
  collection,
  onDuplicate,
  // TODO isPersisting,
  onPersist,
  onPersistAndDuplicate,
  onPersistAndNew,
  isNewEntry,
  onDelete,
  t,
  showPreviewToggle,
  previewActive,
  scrollSyncActive,
  showI18nToggle,
  i18nActive,
  togglePreview,
  toggleScrollSync,
  toggleI18n,
  slug,
}: TranslatedProps<EditorToolbarProps>) => {
  const canCreate = useMemo(
    () => ('folder' in collection && collection.create) ?? false,
    [collection],
  );
  const canDelete = useMemo(() => selectAllowDeletion(collection), [collection]);
  const isPublished = useMemo(() => !isNewEntry && !hasChanged, [hasChanged, isNewEntry]);

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
      dispatch(deleteLocalBackup(collection, slug));
      dispatch(loadEntry(collection, slug));
    }
  }, [collection, dispatch, slug]);

  const menuItems: JSX.Element[][] = useMemo(() => {
    const items: JSX.Element[] = [];

    if (!isPublished) {
      items.push(
        <MenuItemButton key="publishNow" onClick={() => onPersist()} startIcon={PublishIcon}>
          {t('editor.editorToolbar.publishNow')}
        </MenuItemButton>,
      );

      if (canCreate) {
        items.push(
          <MenuItemButton
            key="publishAndCreateNew"
            onClick={onPersistAndNew}
            startIcon={DocumentAddIcon}
          >
            {t('editor.editorToolbar.publishAndCreateNew')}
          </MenuItemButton>,
          <MenuItemButton
            key="publishAndDuplicate"
            onClick={onPersistAndDuplicate}
            startIcon={DocumentDuplicateIcon}
          >
            {t('editor.editorToolbar.publishAndDuplicate')}
          </MenuItemButton>,
        );
      }
    } else if (canCreate) {
      items.push(
        <MenuItemButton key="duplicate" onClick={onDuplicate} startIcon={DocumentDuplicateIcon}>
          {t('editor.editorToolbar.duplicate')}
        </MenuItemButton>,
      );
    }

    if (hasChanged) {
      return [
        items,
        [
          <MenuItemButton
            key="discardChanges"
            onClick={handleDiscardDraft}
            startIcon={TrashIcon}
            color="warning"
          >
            {t('editor.editorToolbar.discardChanges')}
          </MenuItemButton>,
        ],
      ];
    }

    return [items];
  }, [
    canCreate,
    handleDiscardDraft,
    hasChanged,
    isPublished,
    onDuplicate,
    onPersist,
    onPersistAndDuplicate,
    onPersistAndNew,
    t,
  ]);

  return useMemo(
    () => (
      <div className="flex gap-2">
        {showI18nToggle || showPreviewToggle || canDelete ? (
          <Menu
            key="extra-menu"
            label={<MoreVertIcon className="w-5 h-5" />}
            variant="text"
            className="px-1.5"
            hideDropdownIcon
          >
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
                    disabled={i18nActive}
                    startIcon={EyeIcon}
                    endIcon={previewActive && !i18nActive ? CheckIcon : undefined}
                  >
                    {t('editor.editorInterface.preview')}
                  </MenuItemButton>
                  <MenuItemButton
                    onClick={toggleScrollSync}
                    disabled={i18nActive || !previewActive}
                    startIcon={HeightIcon}
                    endIcon={
                      scrollSyncActive && !(i18nActive || !previewActive) ? CheckIcon : undefined
                    }
                  >
                    {t('editor.editorInterface.toggleScrollSync')}
                  </MenuItemButton>
                </>
              )}
            </MenuGroup>
            {canDelete ? (
              <MenuGroup key="delete-button">
                <MenuItemButton onClick={onDelete} startIcon={TrashIcon} color="error">
                  {t('editor.editorToolbar.deleteEntry')}
                </MenuItemButton>
              </MenuGroup>
            ) : null}
          </Menu>
        ) : null}
        <Menu
          label={
            isPublished ? t('editor.editorToolbar.published') : t('editor.editorToolbar.publish')
          }
          color={isPublished ? 'success' : 'primary'}
          disabled={menuItems.length == 1 && menuItems[0].length === 0}
        >
          {menuItems.map((group, index) => (
            <MenuGroup key={`menu-group-${index}`}>{group}</MenuGroup>
          ))}
        </Menu>
      </div>
    ),
    [
      showI18nToggle,
      showPreviewToggle,
      toggleI18n,
      i18nActive,
      t,
      togglePreview,
      previewActive,
      toggleScrollSync,
      scrollSyncActive,
      canDelete,
      onDelete,
      isPublished,
      menuItems,
    ],
  );
};

export default translate()(EditorToolbar) as FC<EditorToolbarProps>;
