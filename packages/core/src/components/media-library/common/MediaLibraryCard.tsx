import ArrowDownTrayIcon from '@heroicons/react/20/solid/ArrowDownTrayIcon';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import React, { useCallback, useEffect } from 'react';
import { translate } from 'react-polyglot';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../../common/button/Button';
import Image from '../../common/image/Image';
import CopyToClipBoardButton from './CopyToClipBoardButton';

import type { Collection, Field, TranslatedProps } from '@staticcms/core/interface';
import type { MediaLibraryDisplayURL } from '@staticcms/core/reducers/mediaLibrary';
import type { FC } from 'react';

interface MediaLibraryCardProps {
  isSelected?: boolean;
  displayURL: MediaLibraryDisplayURL;
  text: string;
  draftText: string;
  type?: string;
  isViewableImage: boolean;
  isDraft?: boolean;
  collection?: Collection;
  field?: Field;
  onClick: () => void;
  loadDisplayURL: () => void;
  onDelete: () => void;
}

const MediaLibraryCard: FC<TranslatedProps<MediaLibraryCardProps>> = ({
  isSelected = false,
  displayURL,
  text,
  draftText,
  type,
  isViewableImage,
  isDraft,
  collection,
  field,
  onClick,
  loadDisplayURL,
  onDelete,
  t,
}) => {
  const entry = useAppSelector(selectEditingDraft);
  const url = useMediaAsset(displayURL.url, collection, field, entry);

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

  return (
    <div
      onClick={onClick}
      tabIndex={-1}
      className="
        relative
        w-media-card
        h-media-card
        rounded-md
        shadow-sm
        bg-white
        dark:bg-slate-800
        overflow-hidden
        group/media-card
        cursor-pointer
      "
    >
      {isSelected ? (
        <div
          key="selected"
          className="
            absolute
            w-full
            h-full
            rounded-md
            border-2
            border-blue-500
          "
        />
      ) : null}
      <div
        className="
          absolute
          inset-0
          hidden
          group-hover/media-card:flex
          group-hover/media-card:bg-slate-900/20
          dark:group-hover/media-card:bg-slate-900/40
        "
      >
        <div
          className="
          absolute
          top-2
          right-2
        "
        >
          <CopyToClipBoardButton path={displayURL.url} name={text} draft={isDraft} />
          <Button
            variant="text"
            onClick={handleDownload}
            title={t('mediaLibrary.mediaLibraryModal.download')}
            className="text-white"
          >
            <ArrowDownTrayIcon className="w-6 h-6" />
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={onDelete}
            title={t('mediaLibrary.mediaLibraryModal.deleteSelected')}
            className="text-red-400"
          >
            <TrashIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div>
        {isDraft ? <p data-testid="draft-text">{draftText}</p> : null}
        {url && isViewableImage ? (
          <Image src={url} className="w-media-card h-media-card-image" />
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
          dark:text-slate-100
        "
      >
        {text}
      </div>
    </div>
  );
};

export default translate()(MediaLibraryCard) as FC<MediaLibraryCardProps>;
