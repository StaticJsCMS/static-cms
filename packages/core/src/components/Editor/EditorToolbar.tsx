import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';

import { colors, components, zIndex } from '@staticcms/core/components/UI/styles';
import { selectAllowDeletion } from '@staticcms/core/lib/util/collection.util';
import { SettingsDropdown } from '../UI';
import NavLink from '../UI/NavLink';

import type { MouseEvent } from 'react';
import type {
  Collection,
  EditorPersistOptions,
  TranslatedProps,
  User,
} from '@staticcms/core/interface';

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

const StyledToolbarSectionMain = styled('div')`
  flex-grow: 1;
  display: flex;
  gap: 8px;
  padding: 0 16px;
  margin-left: 24px;
`;

const StyledBackCollection = styled('div')`
  color: ${colors.textLead};
  font-size: 14px;
`;

const StyledBackStatus = styled('div')`
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
  const canCreate = useMemo(
    () => ('folder' in collection && collection.create) ?? false,
    [collection],
  );
  const canDelete = useMemo(() => selectAllowDeletion(collection), [collection]);
  const isPublished = useMemo(() => !isNewEntry && !hasChanged, [hasChanged, isNewEntry]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenuOptionClick = useCallback(
    (callback: () => Promise<void> | void) => () => {
      handleClose();
      callback();
    },
    [handleClose],
  );

  const handlePersistAndNew = useMemo(
    () => handleMenuOptionClick(onPersistAndNew),
    [handleMenuOptionClick, onPersistAndNew],
  );
  const handlePersistAndDuplicate = useMemo(
    () => handleMenuOptionClick(onPersistAndDuplicate),
    [handleMenuOptionClick, onPersistAndDuplicate],
  );
  const handleDuplicate = useMemo(
    () => handleMenuOptionClick(onDuplicate),
    [handleMenuOptionClick, onDuplicate],
  );
  const handlePersist = useMemo(
    () => handleMenuOptionClick(() => onPersist()),
    [handleMenuOptionClick, onPersist],
  );
  const handleDelete = useMemo(
    () => handleMenuOptionClick(onDelete),
    [handleMenuOptionClick, onDelete],
  );

  const menuItems = useMemo(() => {
    const items: JSX.Element[] = [];

    if (!isPublished) {
      items.push(
        <MenuItem key="publishNow" onClick={handlePersist}>
          {t('editor.editorToolbar.publishNow')}
        </MenuItem>,
      );

      if (canCreate) {
        items.push(
          <MenuItem key="publishAndCreateNew" onClick={handlePersistAndNew}>
            {t('editor.editorToolbar.publishAndCreateNew')}
          </MenuItem>,
          <MenuItem key="publishAndDuplicate" onClick={handlePersistAndDuplicate}>
            {t('editor.editorToolbar.publishAndDuplicate')}
          </MenuItem>,
        );
      }
    }

    if (canCreate) {
      items.push(
        <MenuItem key="duplicate" onClick={handleDuplicate}>
          {t('editor.editorToolbar.duplicate')}
        </MenuItem>,
      );
    }

    return items;
  }, [
    canCreate,
    handleDuplicate,
    handlePersist,
    handlePersistAndDuplicate,
    handlePersistAndNew,
    isPublished,
    t,
  ]);

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
              variant="contained"
              color={isPublished ? 'success' : 'primary'}
              endIcon={<KeyboardArrowDownIcon />}
              disabled={menuItems.length === 0 || isPersisting}
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
            {menuItems}
          </Menu>
        </div>
        {showDelete && canDelete ? (
          <Button variant="outlined" color="error" key="delete-button" onClick={handleDelete}>
            {t('editor.editorToolbar.deleteEntry')}
          </Button>
        ) : null}
      </StyledToolbarSectionMain>
    ),
    [
      anchorEl,
      canDelete,
      handleClick,
      handleClose,
      handleDelete,
      isPersisting,
      isPublished,
      menuItems,
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
