import React, { useEffect } from 'react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';

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
}

const MediaLibraryCard = ({
  // isSelected = false,
  displayURL,
  text,
  onClick,
  draftText,
  // width,
  // height,
  // margin,
  type,
  isViewableImage,
  isDraft,
  loadDisplayURL,
}: MediaLibraryCardProps) => {
  const url = useMediaAsset(displayURL.url);

  useEffect(() => {
    if (!displayURL.url) {
      loadDisplayURL();
    }
  }, [displayURL.url, loadDisplayURL]);

  return (
    <div onClick={onClick} tabIndex={-1}>
      {/* TODO
      $isSelected={isSelected}
      $width={width}
      $height={height}
      $margin={margin} */}
      <div>
        {isDraft ? <p data-testid="draft-text">{draftText}</p> : null}
        {url && isViewableImage ? (
          <img src={url} />
        ) : (
          <div data-testid="card-file-icon">{type}</div>
        )}
      </div>
      <p>{text}</p>
    </div>
  );
};

export default MediaLibraryCard;
