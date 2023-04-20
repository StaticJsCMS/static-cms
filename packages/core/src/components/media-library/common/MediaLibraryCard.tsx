import { Delete as DeleteIcon } from '@styled-icons/material/Delete';
import { Download as DownloadIcon } from '@styled-icons/material/Download';
import { FolderOpen as FolderOpenIcon } from '@styled-icons/material/FolderOpen';
import React, { useCallback, useEffect, useMemo } from 'react';
import { translate } from 'react-polyglot';

import { MAX_LINK_DISPLAY_LENGTH } from '@staticcms/core/constants/mediaLibrary';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../../common/button/Button';
import Image from '../../common/image/Image';
import Pill from '../../common/pill/Pill';
import CopyToClipBoardButton from './CopyToClipBoardButton';

import type {
  BaseField,
  Collection,
  MediaField,
  MediaLibraryDisplayURL,
  TranslatedProps,
  UnknownField,
} from '@staticcms/core/interface';
import type { FC, KeyboardEvent } from 'react';

interface MediaLibraryCardProps<T extends MediaField, EF extends BaseField = UnknownField> {
  isSelected?: boolean;
  displayURL: MediaLibraryDisplayURL;
  path: string;
  text: string;
  draftText: string;
  type?: string;
  isViewableImage: boolean;
  isDraft?: boolean;
  isDirectory?: boolean;
  collection?: Collection<EF>;
  field?: T;
  currentFolder?: string;
  onSelect: () => void;
  onDirectoryOpen: () => void;
  loadDisplayURL: () => void;
  onDelete: () => void;
}

const MediaLibraryCard = <T extends MediaField, EF extends BaseField = UnknownField>({
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
  onSelect,
  onDirectoryOpen,
  loadDisplayURL,
  onDelete,
  t,
}: TranslatedProps<MediaLibraryCardProps<T, EF>>) => {
  const entry = useAppSelector(selectEditingDraft);
  const url = useMediaAsset(path, collection, field, entry, currentFolder);

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
      if (event.key === 'Enter') {
        onSelect();
      }
    },
    [onSelect],
  );

  return (
    <div
      className="
        relative
        w-media-card
        h-media-card
      "
      tabIndex={-1}
    >
      <div
        onClick={onSelect}
        onDoubleClick={isDirectory ? onDirectoryOpen : undefined}
        data-testid={`media-card-${displayURL.url}`}
        className="
          w-media-card
          h-media-card
          rounded-md
          shadow-sm
          overflow-hidden
          group/media-card
          cursor-pointer
          border
          bg-gray-50/75
          border-gray-200/75
          dark:bg-slate-800
          dark:border-slate-600/75
        "
      >
        <div
          key="handle"
          onKeyUp={handleOnKeyUp}
          data-testid={`media-card-handle-${displayURL.url}`}
          tabIndex={0}
          className="
            absolute
            inset-0
            rounded-md
            z-20
            overflow-visible
            focus:ring-4
            focus:ring-gray-200
            dark:focus:ring-slate-700
            focus-visible:outline-none
          "
        />
        {isSelected ? (
          <div
            key="selected"
            className="
              absolute
              inset-0
              rounded-md
              border-2
              border-blue-500
              z-20
            "
          />
        ) : null}
        <div
          className="
            absolute
            inset-0
            invisible
            transition-all
            rounded-md
            group-hover/media-card:visible
            group-hover/media-card:bg-blue-200/25
            dark:group-hover/media-card:bg-blue-400/60
            z-20
          "
        >
          {!isDirectory ? (
            <div
              className="
              absolute
              top-2
              right-2
              flex
              gap-1
            "
            >
              <CopyToClipBoardButton path={displayURL.url} name={text} draft={isDraft} />
              <Button
                variant="text"
                onClick={handleDownload}
                title={t('mediaLibrary.mediaLibraryModal.download')}
                className="
                text-white
                dark:text-white
                bg-gray-900/25
                dark:hover:text-blue-100
                dark:hover:bg-blue-800/80
              "
              >
                <DownloadIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={onDelete}
                title={t('mediaLibrary.mediaLibraryModal.deleteSelected')}
                className="
                position: relative;
                text-red-400
                bg-gray-900/25
                dark:hover:text-red-600
                dark:hover:bg-red-800/40
                z-30
              "
              >
                <DeleteIcon className="w-5 h-5" />
              </Button>
            </div>
          ) : null}
        </div>
        <div className="relative">
          {isDraft ? (
            <Pill data-testid="draft-text" color="primary" className="absolute top-3 left-3 z-20">
              {draftText}
            </Pill>
          ) : null}
          {url && isViewableImage ? (
            <Image src={url} className="w-media-card h-media-card-image rounded-md" />
          ) : isDirectory ? (
            <div
              data-testid="card-file-icon"
              className="
                w-media-card
                h-media-card-image
                bg-gray-500
                dark:bg-slate-700
                text-gray-200
                dark:text-slate-400
                font-bold
                flex
                items-center
                justify-center
                text-5xl
              "
            >
              <FolderOpenIcon className="w-24 h-24" />
            </div>
          ) : (
            <div
              data-testid="card-file-icon"
              className="
                w-media-card
                h-media-card-image
                bg-gray-500
                dark:bg-slate-700
                text-gray-200
                dark:text-slate-400
                font-bold
                flex
                items-center
                justify-center
                text-5xl
              "
            >
              <span>{type}</span>
            </div>
          )}
        </div>
        <div
          className="
            p-3
            w-full
            flex
            text-sm
            font-bold
            dark:font-semibold
            text-slate-600
            dark:text-gray-100
            whitespace-nowrap
            overflow-hidden
          "
        >
          {shortenedText}
        </div>
      </div>
    </div>
  );
};

export default translate()(MediaLibraryCard) as FC<MediaLibraryCardProps<MediaField, UnknownField>>;
