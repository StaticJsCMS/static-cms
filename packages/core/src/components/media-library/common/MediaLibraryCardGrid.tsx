import React, { useCallback, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Waypoint } from 'react-waypoint';
import { VariableSizeGrid as Grid } from 'react-window';

import MediaLibraryCard from './MediaLibraryCard';
import {
  MEDIA_CARD_HEIGHT,
  MEDIA_CARD_MARGIN,
  MEDIA_CARD_WIDTH,
  MEDIA_LIBRARY_PADDING,
} from '@staticcms/core/constants/mediaLibrary';

import type { Collection, Field, MediaFile } from '@staticcms/core/interface';
import type {
  MediaLibraryDisplayURL,
  MediaLibraryState,
} from '@staticcms/core/reducers/mediaLibrary';
import type { GridChildComponentProps } from 'react-window';
import type { FC } from 'react';

export interface MediaLibraryCardItem {
  displayURL?: MediaLibraryDisplayURL;
  id: string;
  key: string;
  name: string;
  type: string;
  draft: boolean;
  isViewableImage?: boolean;
  url?: string;
}

export interface MediaLibraryCardGridProps {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  mediaItems: MediaFile[];
  isSelectedFile: (file: MediaFile) => boolean;
  onAssetClick: (asset: MediaFile) => void;
  canLoadMore?: boolean;
  onLoadMore: () => void;
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
    onAssetClick,
    cardDraftText,
    displayURLs,
    loadDisplayURL,
    columnCount,
    collection,
    field,
    onDelete,
  },
}: GridChildComponentProps<CardGridItemData>) => {
  const index = rowIndex * columnCount + columnIndex;
  if (index >= mediaItems.length) {
    return null;
  }
  const file = mediaItems[index];

  return (
    <div
      style={{
        ...style,
        left:
          parseFloat(
            `${
              typeof style.left === 'number'
                ? style.left ?? MEDIA_CARD_MARGIN * columnIndex
                : style.left
            }`,
          ) + MEDIA_LIBRARY_PADDING,
        top: style.top,
        width: style.width,
        height: style.height,
      }}
    >
      <MediaLibraryCard
        key={file.key}
        isSelected={isSelectedFile(file)}
        text={file.name}
        onClick={() => onAssetClick(file)}
        isDraft={file.draft}
        draftText={cardDraftText}
        displayURL={displayURLs[file.id] ?? (file.url ? { url: file.url } : {})}
        loadDisplayURL={() => loadDisplayURL(file)}
        type={file.type}
        isViewableImage={file.isViewableImage ?? false}
        collection={collection}
        field={field}
        onDelete={() => onDelete(file)}
      />
    </div>
  );
};

const MediaLibraryCardGrid: FC<MediaLibraryCardGridProps> = props => {
  const { mediaItems, scrollContainerRef } = props;

  const [version, setVersion] = useState(0);

  const handleResize = useCallback(() => {
    setVersion(oldVersion => oldVersion + 1);
  }, []);

  console.log('mediaItems.length', mediaItems.length);

  return (
    <div className="relative w-full h-full">
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => {
          const columnWidthWithGutter = MEDIA_CARD_WIDTH + MEDIA_CARD_MARGIN;
          const rowHeightWithGutter = MEDIA_CARD_HEIGHT + MEDIA_CARD_MARGIN;
          const columnCount = Math.floor(
            (width - MEDIA_LIBRARY_PADDING * 2) / columnWidthWithGutter,
          );
          const rowCount = Math.ceil(mediaItems.length / columnCount);

          console.log('rowCount', rowCount, 'columnCount', columnCount);

          return (
            <div key={version} ref={scrollContainerRef}>
              <Grid
                columnCount={columnCount}
                columnWidth={index =>
                  index + 1 === columnCount ? MEDIA_CARD_WIDTH : columnWidthWithGutter
                }
                rowCount={rowCount}
                rowHeight={index =>
                  index + 1 === rowCount ? MEDIA_CARD_HEIGHT : rowHeightWithGutter
                }
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
                  pb-4
                  overflow-hidden
                  overflow-y-auto
                "
              >
                {CardWrapper}
              </Grid>
            </div>
          );
        }}
      </AutoSizer>
    </div>
  );
};

// const PaginatedGrid = ({
//   scrollContainerRef,
//   mediaItems,
//   isSelectedFile,
//   onAssetClick,
//   cardDraftText,
//   cardWidth,
//   cardHeight,
//   cardMargin,
//   displayURLs,
//   loadDisplayURL,
//   canLoadMore,
//   onLoadMore,
//   isPaginating,
//   paginatingMessage,
//   collection,
//   field,
// }: MediaLibraryCardGridProps) => {
//   return (
//     <div ref={scrollContainerRef}>
//       <div>
//         {mediaItems.map(file => (
//           <MediaLibraryCard
//             key={file.key}
//             isSelected={isSelectedFile(file)}
//             text={file.name}
//             onClick={() => onAssetClick(file)}
//             isDraft={file.draft}
//             draftText={cardDraftText}
//             width={cardWidth}
//             height={cardHeight}
//             margin={cardMargin}
//             displayURL={displayURLs[file.id] ?? (file.url ? { url: file.url } : {})}
//             loadDisplayURL={() => loadDisplayURL(file)}
//             type={file.type}
//             isViewableImage={file.isViewableImage ?? false}
//             collection={collection}
//             field={field}
//           />
//         ))}
//         {!canLoadMore ? null : <Waypoint onEnter={onLoadMore} />}
//       </div>
//       {!isPaginating ? null : <h1>{paginatingMessage}</h1>}
//     </div>
//   );
// };

export default MediaLibraryCardGrid;
