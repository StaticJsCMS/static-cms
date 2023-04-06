import React, { useCallback, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Waypoint } from 'react-waypoint';
import { VariableSizeGrid as Grid } from 'react-window';

import {
  MEDIA_CARD_HEIGHT,
  MEDIA_CARD_MARGIN,
  MEDIA_CARD_WIDTH,
  MEDIA_LIBRARY_PADDING,
} from '@staticcms/core/constants/mediaLibrary';
import MediaLibraryCard from './MediaLibraryCard';

import type {
  Collection,
  Field,
  MediaFile,
  MediaLibraryDisplayURL,
} from '@staticcms/core/interface';
import type { MediaLibraryState } from '@staticcms/core/reducers/mediaLibrary';
import type { FC } from 'react';
import type { GridChildComponentProps } from 'react-window';
import { selectMediaFilePath } from '@staticcms/core/lib/util/media.util';

export interface MediaLibraryCardItem {
  displayURL?: MediaLibraryDisplayURL;
  id: string;
  key: string;
  name: string;
  type: string;
  draft: boolean;
  isViewableImage?: boolean;
  isDirectory?: boolean;
  url?: string;
}

export interface MediaLibraryCardGridProps {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  mediaItems: MediaFile[];
  isSelectedFile: (file: MediaFile) => boolean;
  onAssetSelect: (asset: MediaFile) => void;
  canLoadMore?: boolean;
  onLoadMore: () => void;
  onDirectoryOpen: (dir: string) => void;
  currentFolder?: string,
  isPaginating?: boolean;
  paginatingMessage?: string;
  cardDraftText: string;
  loadDisplayURL: (asset: MediaFile) => void;
  displayURLs: MediaLibraryState['displayURLs'];
  collection?: Collection;
  field?: Field;
  onDelete: (file: MediaFile) => void;
}

export type CardGridItemData = MediaLibraryCardGridProps & {
  columnCount: number;
  gutter: number;
};

const CardWrapper = ({
  rowIndex,
  columnIndex,
  style,
  data: {
    mediaItems,
    isSelectedFile,
    onAssetSelect,
    onDirectoryOpen,
    currentFolder,
    cardDraftText,
    displayURLs,
    loadDisplayURL,
    columnCount,
    collection,
    field,
    onDelete,
  },
}: GridChildComponentProps<CardGridItemData>) => {
  const left = useMemo(
    () =>
      parseFloat(
        `${
          typeof style.left === 'number'
            ? style.left ?? MEDIA_CARD_MARGIN * columnIndex
            : style.left
        }`,
      ) + MEDIA_LIBRARY_PADDING,
    [columnIndex, style.left],
  );

  const top = useMemo(
    () =>
      parseFloat(`${typeof style.top === 'number' ? style.top ?? 0 : style.top}`) +
      MEDIA_LIBRARY_PADDING,
    [style.top],
  );

  const index = rowIndex * columnCount + columnIndex;
  if (index >= mediaItems.length) {
    return null;
  }
  const file = mediaItems[index];

  return (
    <div
      style={{
        ...style,
        left,
        top,
        width: style.width,
        height: style.height,
      }}
    >
      <MediaLibraryCard
        key={file.key}
        isSelected={isSelectedFile(file)}
        text={file.name}
        onSelect={() => onAssetSelect(file)}
        onDirectoryOpen={() => onDirectoryOpen(file.path)}
        currentFolder={currentFolder}
        isDraft={file.draft}
        draftText={cardDraftText}
        displayURL={displayURLs[file.id] ?? (file.url ? { url: file.url } : {})}
        loadDisplayURL={() => loadDisplayURL(file)}
        type={file.type}
        isViewableImage={file.isViewableImage ?? false}
        isDirectory={file.isDirectory ?? false}
        collection={collection}
        field={field}
        onDelete={() => onDelete(file)}
      />
    </div>
  );
};

const MediaLibraryCardGrid: FC<MediaLibraryCardGridProps> = props => {
  const { mediaItems, scrollContainerRef, canLoadMore, onLoadMore } = props;

  const [version, setVersion] = useState(0);

  const handleResize = useCallback(() => {
    setVersion(oldVersion => oldVersion + 1);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AutoSizer onResize={handleResize}>
        {({ height = 0, width = 0 }) => {
          const columnWidthWithGutter = MEDIA_CARD_WIDTH + MEDIA_CARD_MARGIN;
          const rowHeightWithGutter = MEDIA_CARD_HEIGHT + MEDIA_CARD_MARGIN;
          const columnCount = Math.floor(
            (width - MEDIA_LIBRARY_PADDING * 2) / columnWidthWithGutter,
          );
          const rowCount = Math.ceil(mediaItems.length / columnCount);

          return (
            <div key={version} ref={scrollContainerRef}>
              <Grid
                columnCount={columnCount}
                columnWidth={index =>
                  index + 1 === columnCount ? MEDIA_CARD_WIDTH : columnWidthWithGutter
                }
                rowCount={rowCount}
                rowHeight={() => rowHeightWithGutter}
                width={width}
                height={height}
                itemData={
                  {
                    ...props,
                    columnCount,
                  } as CardGridItemData
                }
                className="
                  px-5
                  py-4
                  overflow-hidden
                  overflow-y-auto
                  styled-scrollbars
                "
                style={{ position: 'unset' }}
              >
                {CardWrapper}
              </Grid>
              {!canLoadMore ? null : <Waypoint onEnter={onLoadMore} />}
            </div>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default MediaLibraryCardGrid;
