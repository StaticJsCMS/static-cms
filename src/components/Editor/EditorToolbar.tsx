import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import green from '@mui/material/colors/green';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';

import { colors, components, zIndex } from '../../components/UI/styles';
import { SettingsDropdown } from '../UI';
import NavLink from '../UI/NavLink';

import type { MouseEvent } from 'react';
import type { Collection, EditorPersistOptions, TranslatedProps, User } from '../../interface';

const StyledAppBar = styled(AppBar)`
  background-color: ${colors.foreground};
  z-index: ${zIndex.zIndex100};
`;

const StyledToolbar = styled(Toolbar)`
  gap: 12px;
`;

const StyledToolbarSectionBackLink = styled('div')`
  display: flex;
  margin: -32px -24px;
  height: 64px;

  a {
    display: flex;
    height: 100%;
    padding: 16px;
    align-items: center;
  }
`;

const StyledToolbarSectionMain = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 8px;
  padding: 0 16px;
  margin-left: 24px;
`;

const StyledBackCollection = styled.div`
  color: ${colors.textLead};
  font-size: 14px;
`;

const StyledBackStatus = styled.div`
  margin-top: 6px;
`;

const StyledBackStatusUnchanged = styled(StyledBackStatus)`
  ${components.textBadgeSuccess};
`;

const StyledBackStatusChanged = styled(StyledBackStatus)`
  ${components.textBadgeDanger};
`;

const StyledButtonWrapper = styled('div')`
  position: relative;
`;

export interface EditorToolbarProps {
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
  isPersisting,
  onPersist,
  onPersistAndDuplicate,
  onPersistAndNew,
  isNewEntry,
  showDelete,
  onDelete,
  t,
  editorBackLink,
}: TranslatedProps<EditorToolbarProps>) => {
  const canCreate = useMemo(() => collection.create ?? false, [collection.create]);
  const isPublished = useMemo(() => !isNewEntry && !hasChanged, [hasChanged, isNewEntry]);

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

  const controls = useMemo(
    () => (
      <StyledToolbarSectionMain>
        <div>
          <StyledButtonWrapper>
            <Button
              id="existing-published-button"
              aria-controls={open ? 'existing-published-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              disabled={!canCreate}
              variant="contained"
              color={isPublished ? 'success' : 'primary'}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {isPublished
                ? t('editor.editorToolbar.published')
                : isPersisting
                ? t('editor.editorToolbar.publishing')
                : t('editor.editorToolbar.publish')}
            </Button>
            {isPersisting ? (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            ) : null}
          </StyledButtonWrapper>
          <Menu
            id="existing-published-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'existing-published-button',
            }}
          >
            {!isPublished ? (
              [
                <MenuItem key="publishNow" onClick={() => onPersist()}>
                  {t('editor.editorToolbar.publishNow')}
                </MenuItem>,
                ...(canCreate
                  ? [
                      <MenuItem key="publishAndCreateNew" onClick={onPersistAndNew}>
                        {t('editor.editorToolbar.publishAndCreateNew')}
                      </MenuItem>,
                      <MenuItem key="publishAndDuplicate" onClick={onPersistAndDuplicate}>
                        {t('editor.editorToolbar.publishAndDuplicate')}
                      </MenuItem>,
                    ]
                  : []),
              ]
            ) : (
              <MenuItem onClick={onDuplicate}>{t('editor.editorToolbar.duplicate')}</MenuItem>
            )}
          </Menu>
        </div>
        {showDelete ? (
          <Button variant="outlined" color="error" key="delete-button" onClick={onDelete}>
            {t('editor.editorToolbar.deleteEntry')}
          </Button>
        ) : null}
      </StyledToolbarSectionMain>
    ),
    [
      anchorEl,
      canCreate,
      handleClick,
      handleClose,
      isPersisting,
      isPublished,
      onDelete,
      onDuplicate,
      onPersist,
      onPersistAndDuplicate,
      onPersistAndNew,
      open,
      showDelete,
      t,
    ],
  );

  return (
    <StyledAppBar position="relative">
      <StyledToolbar>
        <StyledToolbarSectionBackLink>
          <Button component={NavLink} to={editorBackLink}>
            <ArrowBackIcon />
            <div>
              <StyledBackCollection>
                {t('editor.editorToolbar.backCollection', {
                  collectionLabel: collection.label,
                })}
              </StyledBackCollection>
              {hasChanged ? (
                <StyledBackStatusChanged key="back-changed">
                  {t('editor.editorToolbar.unsavedChanges')}
                </StyledBackStatusChanged>
              ) : (
                <StyledBackStatusUnchanged key="back-unchanged">
                  {t('editor.editorToolbar.changesSaved')}
                </StyledBackStatusUnchanged>
              )}
            </div>
          </Button>
        </StyledToolbarSectionBackLink>
        {controls}
        <SettingsDropdown
          displayUrl={displayUrl}
          imageUrl={user?.avatar_url}
          onLogoutClick={onLogoutClick}
        />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default translate()(EditorToolbar);
