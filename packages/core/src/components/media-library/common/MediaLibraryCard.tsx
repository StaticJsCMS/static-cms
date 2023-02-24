import React, { useEffect } from 'react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Image from '../../common/image/Image';

import type { Collection, Field } from '@staticcms/core/interface';
import type { MediaLibraryDisplayURL } from '@staticcms/core/reducers/mediaLibrary';

interface MediaLibraryCardProps {
  isSelected?: boolean;
  displayURL: MediaLibraryDisplayURL;
  text: string;
  onClick: () => void;
  draftText: string;
  width: string;
  height: string;
  margin: string;
  type?: string;
  isViewableImage: boolean;
  loadDisplayURL: () => void;
  isDraft?: boolean;
  collection?: Collection;
  field?: Field;
}

const MediaLibraryCard = ({
  // isSelected = false,
  displayURL,
  text,
  onClick,
  draftText,
  type,
  isViewableImage,
  isDraft,
  loadDisplayURL,
  collection,
  field,
}: MediaLibraryCardProps) => {
  const entry = useAppSelector(selectEditingDraft);
  const url = useMediaAsset(displayURL.url, collection, field, entry);

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
        w-media-card
        h-media-card
        rounded-md
        shadow-sm
        bg-white
        dark:bg-slate-800
        overflow-hidden
      "
    >
      {/* TODO $isSelected={isSelected} */}
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
          px-4
          py-3
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

export default MediaLibraryCard;
