import { Publish as PublishIcon } from '@styled-icons/material/Publish';
import { DocumentAdd as DocumentAddIcon } from '@styled-icons/fluentui-system-regular/DocumentAdd';
import { CheckIcon } from '@heroicons/react/20/solid';
import {
  EllipsisVerticalIcon,
  EyeIcon,
  GlobeAltIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { Height as HeightIcon } from '@styled-icons/material-rounded/Height';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';

import { selectAllowDeletion } from '@staticcms/core/lib/util/collection.util';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type { Collection, EditorPersistOptions, TranslatedProps } from '@staticcms/core/interface';
import type { FC, MouseEventHandler } from 'react';

export interface EditorToolbarProps {
  isPersisting?: boolean;
  isDeleting?: boolean;
  onPersist: (opts?: EditorPersistOptions) => Promise<void>;
  onPersistAndNew: () => Promise<void>;
  onPersistAndDuplicate: () => Promise<void>;
  onDelete: () => Promise<void>;
  showDelete: boolean;
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
  showDelete,
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
}: TranslatedProps<EditorToolbarProps>) => {
  const canCreate = useMemo(
    () => ('folder' in collection && collection.create) ?? false,
    [collection],
  );
  const canDelete = useMemo(() => selectAllowDeletion(collection), [collection]);
  const isPublished = useMemo(() => !isNewEntry && !hasChanged, [hasChanged, isNewEntry]);

  const menuItems = useMemo(() => {
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

    return items;
  }, [canCreate, isPublished, onDuplicate, onPersist, onPersistAndDuplicate, onPersistAndNew, t]);

  return useMemo(
    () => (
      <div className="flex gap-2">
        {showI18nToggle || showPreviewToggle || showDelete ? (
          <Menu
            key="extra-menu"
            label={<EllipsisVerticalIcon className="w-5 h-5" />}
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
              {showDelete && canDelete ? (
                <MenuItemButton key="delete-button" onClick={onDelete} startIcon={TrashIcon}>
                  {t('editor.editorToolbar.deleteEntry')}
                </MenuItemButton>
              ) : null}
            </MenuGroup>
          </Menu>
        ) : null}
        <Menu label="Published">
          <MenuGroup>{menuItems}</MenuGroup>
        </Menu>
      </div>
    ),
    [
      showI18nToggle,
      showPreviewToggle,
      showDelete,
      toggleI18n,
      t,
      i18nActive,
      togglePreview,
      previewActive,
      toggleScrollSync,
      scrollSyncActive,
      canDelete,
      onDelete,
      menuItems,
    ],
  );
};

export default translate()(EditorToolbar) as FC<EditorToolbarProps>;
