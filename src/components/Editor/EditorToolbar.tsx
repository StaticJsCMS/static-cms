import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useEffect, useState } from 'react';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';

import { buttons, colors, colorsRaw, components, zIndex } from '../../ui';
import { SettingsDropdown } from '../UI';

import type { MouseEvent } from 'react';
import type { Collection, EditorPersistOptions, TranslatedProps, User } from '../../interface';

const styles = {
  noOverflow: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  buttonMargin: css`
    margin: 0 10px;
  `,
  toolbarSection: css`
    height: 100%;
    display: flex;
    align-items: center;
    border: 0 solid ${colors.textFieldBorder};
  `,
  publishedButton: css`
    background-color: ${colorsRaw.tealLight};
    color: ${colorsRaw.teal};
  `,
};

const ToolbarContainer = styled.div`
  box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.05), 0 1px 3px 0 rgba(68, 74, 87, 0.1),
    0 2px 54px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  z-index: ${zIndex.zIndex300};
  background-color: #fff;
  height: 66px;
  display: flex;
  justify-content: space-between;
`;

const ToolbarSectionMain = styled.div`
  ${styles.toolbarSection};
  flex: 10;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const ToolbarSubSectionFirst = styled.div`
  display: flex;
  align-items: center;
`;

const ToolbarSectionBackLink = styled(Link)`
  ${styles.toolbarSection};
  border-right-width: 1px;
  font-weight: normal;
  padding: 0 20px;

  &:hover,
  &:focus {
    background-color: #f1f2f4;
  }
`;

const ToolbarSectionMeta = styled.div`
  ${styles.toolbarSection};
  border-left-width: 1px;
  padding: 0 7px;
`;

const BackArrow = styled.div`
  color: ${colors.textLead};
  font-size: 21px;
  font-weight: 600;
  margin-right: 16px;
`;

const BackCollection = styled.div`
  color: ${colors.textLead};
  font-size: 14px;
`;

const BackStatus = styled.div`
  margin-top: 6px;
`;

const BackStatusUnchanged = styled(BackStatus)`
  ${components.textBadgeSuccess};
`;

const BackStatusChanged = styled(BackStatus)`
  ${components.textBadgeDanger};
`;

const ToolbarButton = styled.button`
  ${buttons.button};
  ${buttons.default};
  ${styles.buttonMargin};
  ${styles.noOverflow};
  display: block;

  @media (max-width: 1200px) {
    padding: 0 10px;
  }
`;

const DeleteButton = styled(ToolbarButton)`
  ${buttons.lightRed};
`;

interface ExistingEntrySimplePublishControlsProps {
  canCreate: boolean;
  onDuplicate: () => void;
}

const ExistingEntrySimplePublishControls = ({
  canCreate,
  onDuplicate,
  t,
}: TranslatedProps<ExistingEntrySimplePublishControlsProps>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (canCreate) {
        setAnchorEl(event.currentTarget);
      }
    },
    [canCreate],
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    if (!canCreate) {
      setAnchorEl(null);
    }
  }, [canCreate]);

  return (
    <div>
      <Button
        id="existing-published-button"
        aria-controls={open ? 'existing-published-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={!canCreate}
      >
        {t('editor.editorToolbar.published')}
      </Button>
      <Menu
        id="existing-published-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'existing-published-button',
        }}
      >
        <MenuItem onClick={onDuplicate}>{t('editor.editorToolbar.duplicate')}</MenuItem>
      </Menu>
    </div>
  );
};

export interface NewEntrySimplePublishControlsProps {
  canCreate: boolean;
  isPersisting?: boolean;
  onPersist: (opts?: EditorPersistOptions) => Promise<void>;
  onPersistAndNew: () => Promise<void>;
  onPersistAndDuplicate: () => Promise<void>;
}

const NewEntrySimplePublishControls = ({
  canCreate,
  onPersist,
  onPersistAndNew,
  onPersistAndDuplicate,
  isPersisting,
  t,
}: TranslatedProps<NewEntrySimplePublishControlsProps>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Button
        id="new-published-button"
        aria-controls={open ? 'new-published-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {isPersisting ? t('editor.editorToolbar.publishing') : t('editor.editorToolbar.publish')}
      </Button>
      <Menu
        id="new-published-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'new-published-button',
        }}
      >
        <MenuItem onClick={() => onPersist()}>{t('editor.editorToolbar.publishNow')}</MenuItem>
        {canCreate ? (
          <>
            <MenuItem onClick={onPersistAndNew}>
              {t('editor.editorToolbar.publishAndCreateNew')}
            </MenuItem>
            <MenuItem onClick={onPersistAndDuplicate}>
              {t('editor.editorToolbar.publishAndDuplicate')}
            </MenuItem>
          </>
        ) : null}
      </Menu>
    </div>
  );
};

export interface EditorToolbar {
  isPersisting?: boolean;
  isDeleting?: boolean;
  onPersist: (opts?: EditorPersistOptions) => Promise<void>;
  onPersistAndNew: () => Promise<void>;
  onPersistAndDuplicate: () => Promise<void>;
  onDelete: () => Promise<void>;
  showDelete: boolean;
  onDuplicate: () => void;
  user: User;
  hasChanged: boolean;
  displayUrl: string | undefined;
  collection: Collection;
  isNewEntry: boolean;
  isModification?: boolean;
  onLogoutClick: () => void;
  editorBackLink: string;
}

const EditorToolbar = ({
  user,
  hasChanged,
  displayUrl,
  collection,
  onLogoutClick,
  onDuplicate,
  onPersist,
  onPersistAndDuplicate,
  onPersistAndNew,
  isNewEntry,
  showDelete,
  onDelete,
  t,
  editorBackLink,
}: TranslatedProps<EditorToolbar>) => {
  const renderSimpleControls = useCallback(() => {
    const canCreate = collection.create ?? false;

    return (
      <>
        {!isNewEntry && !hasChanged ? (
          <ExistingEntrySimplePublishControls
            canCreate={canCreate}
            onDuplicate={onDuplicate}
            t={t}
          />
        ) : (
          <NewEntrySimplePublishControls
            canCreate={canCreate}
            onPersist={onPersist}
            onPersistAndDuplicate={onPersistAndDuplicate}
            onPersistAndNew={onPersistAndNew}
            t={t}
          />
        )}
        <div>
          {showDelete ? (
            <DeleteButton key="delete-button" onClick={onDelete}>
              {t('editor.editorToolbar.deleteEntry')}
            </DeleteButton>
          ) : null}
        </div>
      </>
    );
  }, [
    collection.create,
    hasChanged,
    isNewEntry,
    onDelete,
    onDuplicate,
    onPersist,
    onPersistAndDuplicate,
    onPersistAndNew,
    showDelete,
    t,
  ]);

  return (
    <ToolbarContainer>
      <ToolbarSectionBackLink to={editorBackLink}>
        <BackArrow>←</BackArrow>
        <div>
          <BackCollection>
            {t('editor.editorToolbar.backCollection', {
              collectionLabel: collection.label,
            })}
          </BackCollection>
          {hasChanged ? (
            <BackStatusChanged key="back-changed">
              {t('editor.editorToolbar.unsavedChanges')}
            </BackStatusChanged>
          ) : (
            <BackStatusUnchanged key="back-unchanged">
              {t('editor.editorToolbar.changesSaved')}
            </BackStatusUnchanged>
          )}
        </div>
      </ToolbarSectionBackLink>
      <ToolbarSectionMain>
        <ToolbarSubSectionFirst>{renderSimpleControls()}</ToolbarSubSectionFirst>
      </ToolbarSectionMain>
      <ToolbarSectionMeta>
        <SettingsDropdown
          displayUrl={displayUrl}
          imageUrl={user?.avatar_url}
          onLogoutClick={onLogoutClick}
        />
      </ToolbarSectionMeta>
    </ToolbarContainer>
  );
};

export default translate()(EditorToolbar);
