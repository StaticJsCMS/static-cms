import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useIsMediaAsset from '@staticcms/core/lib/hooks/useIsMediaAsset';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';

import type { Collection, Entry, FileOrImageField, MarkdownField } from '@staticcms/core/interface';
import type { ChangeEvent, KeyboardEvent } from 'react';

const StyledPopperContent = styled('div')`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
  padding: 6px;
  border-radius: 4px;
  align-items: center;
  position: relative;
`;

const StyledPopoverContent = styled(StyledPopperContent)`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 2px;
`;

const StyledPopoverEditingContent = styled(StyledPopperContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 300px;
`;

const StyledFloatingVerticalDivider = styled('div')`
  width: 1px;
  height: 20px;
  background-color: rgba(229, 231, 235, 1);
  margin: 0 4px;
`;

export interface MediaPopoverProps<T extends FileOrImageField | MarkdownField> {
  containerRef: HTMLElement | null;
  anchorEl: HTMLElement | null;
  url: string;
  text?: string;
  textLabel?: string;
  inserting?: boolean;
  forImage?: boolean;
  collection: Collection<T>;
  field: T;
  entry: Entry;
  onUrlChange: (newValue: string) => void;
  onTextChange?: (newValue: string) => void;
  onClose: (shouldFocus: boolean) => void;
  onMediaToggle?: (open: boolean) => void;
  onMediaChange: (newValue: string) => void;
  onRemove?: () => void;
}

const MediaPopover = <T extends FileOrImageField | MarkdownField>({
  containerRef,
  anchorEl,
  url,
  text,
  textLabel = 'Text',
  inserting = false,
  forImage = false,
  collection,
  field,
  entry,
  onUrlChange,
  onTextChange,
  onClose,
  onMediaToggle,
  onMediaChange,
  onRemove,
}: MediaPopoverProps<T>) => {
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);

  const [editing, setEditing] = useState(inserting);

  const handleClose = useCallback(
    (shouldFocus: boolean) => {
      onClose(shouldFocus);
      if (!inserting) {
        setEditing(false);
      }
    },
    [inserting, onClose],
  );

  const isMediaAsset = useIsMediaAsset(url, collection, field, entry);

  const mediaLibraryFieldOptions = useMemo(() => {
    return field.media_library ?? {};
  }, [field.media_library]);

  const chooseUrl = useMemo(
    () => 'choose_url' in mediaLibraryFieldOptions && (mediaLibraryFieldOptions.choose_url ?? true),
    [mediaLibraryFieldOptions],
  );

  const urlDisabled = useMemo(
    () => !chooseUrl && isMediaAsset && forImage,
    [chooseUrl, forImage, isMediaAsset],
  );

  useEffect(() => {
    if (anchorEl) {
      if (!editing) {
        return;
      }

      if (urlDisabled) {
        setTimeout(() => {
          textRef.current?.focus();
        });
        return;
      }

      setTimeout(() => {
        urlRef.current?.focus();
      });
      return;
    }

    if (!inserting) {
      setEditing(false);
    }
  }, [anchorEl, editing, inserting, urlDisabled]);

  const handleMediaChange = useCallback(
    (newValue: string) => {
      onMediaChange(newValue);
      onMediaToggle?.(false);
    },
    [onMediaChange, onMediaToggle],
  );

  const handleOpenMediaLibrary = useMediaInsert(url, { field, forImage }, handleMediaChange);

  const handleMediaOpen = useCallback(() => {
    onMediaToggle?.(true);
    handleOpenMediaLibrary();
  }, [handleOpenMediaLibrary, onMediaToggle]);

  const handleUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onUrlChange(event.target.value);
    },
    [onUrlChange],
  );

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onTextChange?.(event.target.value);
    },
    [onTextChange],
  );

  const handleEditStart = useCallback(() => {
    setEditing(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.stopPropagation();
        event.preventDefault();
        handleClose(true);
        if (!inserting) {
          setTimeout(() => {
            setEditing(false);
          });
        }
      }
    },
    [inserting, handleClose],
  );

  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handleClose}
      container={containerRef}
      disablePortal
    >
      {!editing ? (
        <StyledPopoverEditingContent>
          <Button
            ref={buttonRef}
            size="small"
            color="inherit"
            sx={{
              padding: '4px 8px',
              textTransform: 'none',
              color: theme.palette.text.secondary,
            }}
            onClick={handleEditStart}
          >
            {forImage ? 'Edit Image' : 'Edit Link'}
          </Button>
          <StyledFloatingVerticalDivider />
          {!forImage ? (
            <Button
              size="small"
              color="inherit"
              sx={{ padding: '4px', minWidth: 'unset', color: theme.palette.text.secondary }}
              href={url}
              target="_blank"
            >
              <OpenInNewIcon />
            </Button>
          ) : null}
          <Button
            size="small"
            color="inherit"
            sx={{ padding: '4px', minWidth: 'unset', color: theme.palette.text.secondary }}
            onClick={onRemove}
          >
            <DeleteForeverIcon />
          </Button>
        </StyledPopoverEditingContent>
      ) : (
        <StyledPopoverContent>
          <TextField
            key="url-input"
            inputRef={urlRef}
            id="url"
            label="Source"
            variant="outlined"
            value={url}
            onKeyDown={handleKeyDown}
            onChange={handleUrlChange}
            fullWidth
            size="small"
            disabled={urlDisabled}
          />
          {!inserting || !forImage ? (
            <TextField
              key="text-input"
              inputRef={textRef}
              id="text"
              label={textLabel}
              variant="outlined"
              value={text}
              onKeyDown={handleKeyDown}
              onChange={handleTextChange}
              fullWidth
              size="small"
            />
          ) : null}
          <Button fullWidth onClick={handleMediaOpen}>
            Open Media Library
          </Button>
        </StyledPopoverContent>
      )}
    </Popover>
  );
};

export default MediaPopover;
