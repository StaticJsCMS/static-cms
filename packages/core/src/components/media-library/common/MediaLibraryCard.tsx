import { Delete as DeleteIcon } from '@styled-icons/material/Delete';
import { Download as DownloadIcon } from '@styled-icons/material/Download';
import { FolderOpen as FolderOpenIcon } from '@styled-icons/material/FolderOpen';
import React, { useCallback, useEffect, useMemo } from 'react';

import { MAX_LINK_DISPLAY_LENGTH } from '@staticcms/core/constants/mediaLibrary';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../../common/button/Button';
import Checkbox from '../../common/checkbox/Checkbox';
import Image from '../../common/image/Image';
import Pill from '../../common/pill/Pill';
import CopyToClipBoardButton from './CopyToClipBoardButton';

import type { Collection, MediaField, MediaLibraryDisplayURL } from '@staticcms/core/interface';
import type { ChangeEvent, FC, KeyboardEvent } from 'react';

import './MediaLibraryCard.css';

export const classes = generateClassNames('MediaLibraryCard', [
  'root',
  'action',
  'handle',
  'outline',
  'text',
  'controls-overlay',
  'controls',
  'control-icon',
  'download-button',
  'delete-button',
  'details',
  'selection-overlay',
  'draft-pill',
  'image',
  'folder',
  'folder-icon',
  'file',
]);

interface MediaLibraryCardProps {
  isSelected?: boolean;
  displayURL: MediaLibraryDisplayURL;
  path: string;
  text: string;
  draftText: string;
  type?: string;
  isViewableImage: boolean;
  isDraft?: boolean;
  isDirectory?: boolean;
  collection?: Collection;
  field?: MediaField;
  currentFolder?: string;
  hasSelection: boolean;
  allowMultiple: boolean;
  onSelect: (action: 'add' | 'remove' | 'replace') => void;
  onDirectoryOpen: () => void;
  loadDisplayURL: () => void;
  onDelete: () => void;
}

const MediaLibraryCard: FC<MediaLibraryCardProps> = ({
  isSelected = false,
  displayURL,
  path,
  text,
  draftText,
  type,
  isViewableImage,
  isDraft,
  isDirectory,
  collection,
  field,
  currentFolder,
  hasSelection,
  allowMultiple,
  onSelect,
  onDirectoryOpen,
  loadDisplayURL,
  onDelete,
}) => {
  const t = useTranslate();

  const entry = useAppSelector(selectEditingDraft);
  const url = useMediaAsset(path, collection, field, entry, currentFolder, isDirectory);

  const handleDownload = useCallback(() => {
    const url = displayURL.url;
    if (!url) {
      return;
    }

    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', text);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }, [displayURL.url, text]);

  useEffect(() => {
    if (!displayURL.url) {
      loadDisplayURL();
    }
  }, [displayURL.url, loadDisplayURL]);

  const shortenedText = useMemo(
    () =>
      text.length <= MAX_LINK_DISPLAY_LENGTH
        ? text
        : `${text.slice(0, MAX_LINK_DISPLAY_LENGTH / 2)}\u2026${text.slice(
            -(MAX_LINK_DISPLAY_LENGTH / 2) + 1,
          )}`,
    [text],
  );

  const handleOnKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        onSelect('replace');
      }
    },
    [onSelect],
  );

  const handleClick = useCallback(() => {
    onSelect('replace');
  }, [onSelect]);

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      event.preventDefault();
      onSelect(event.target.checked ? 'add' : 'remove');
    },
    [onSelect],
  );

  return (
    <div className={classes.root} tabIndex={-1}>
      <div
        onClick={handleClick}
        onDoubleClick={isDirectory ? onDirectoryOpen : undefined}
        data-testid={`media-card-${displayURL.url}`}
        className={classes.action}
      >
        <div
          key="handle"
          onKeyUp={handleOnKeyUp}
          data-testid={`media-card-handle-${displayURL.url}`}
          tabIndex={0}
          className={classes.handle}
        />
        {isSelected ? <div key="selected" className={classes.outline} /> : null}
        <div className={classes['controls-overlay']}>
          {!isDirectory ? (
            <div className={classes.controls}>
              <CopyToClipBoardButton path={displayURL.url} name={text} draft={isDraft} />
              <Button
                variant="text"
                onClick={handleDownload}
                title={t('mediaLibrary.mediaLibraryModal.download')}
                className={classes['download-button']}
              >
                <DownloadIcon className={classes['control-icon']} />
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={onDelete}
                title={t('mediaLibrary.mediaLibraryModal.deleteSelected')}
                className={classes['delete-button']}
              >
                <DeleteIcon className={classes['control-icon']} />
              </Button>
            </div>
          ) : null}
        </div>
        <div className={classes.details}>
          <div className={classes['selection-overlay']}>
            {hasSelection && allowMultiple ? (
              <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
            ) : null}
            {isDraft ? (
              <Pill data-testid="draft-text" color="primary" className={classes['draft-pill']}>
                {draftText}
              </Pill>
            ) : null}
          </div>
          {url && isViewableImage ? (
            <Image src={url} className={classes.image} />
          ) : isDirectory ? (
            <div data-testid="card-folder-icon" className={classes.folder}>
              <FolderOpenIcon className={classes['folder-icon']} />
            </div>
          ) : (
            <div data-testid="card-file-icon" className={classes.file}>
              <span>{type}</span>
            </div>
          )}
        </div>
        <div className={classes.text}>{shortenedText}</div>
      </div>
    </div>
  );
};

export default MediaLibraryCard;
