import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Waypoint } from 'react-waypoint';
import { VariableSizeGrid as Grid } from 'react-window';

import MediaLibraryCard from './MediaLibraryCard';
import {
  MEDIA_CARD_HEIGHT,
  MEDIA_CARD_MARGIN,
  MEDIA_CARD_WIDTH,
  MEDIA_LIBRARY_PADDING_LEFT,
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
    gutter,
    collection,
    field,
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
            `${typeof style.left === 'number' ? style.left ?? gutter * columnIndex : style.left}`,
          ) + MEDIA_LIBRARY_PADDING_LEFT,
        top: style.top,
        width: typeof style.width === 'number' ? style.width - gutter : style.width,
        height: typeof style.height === 'number' ? style.height - gutter : style.height,
      }}
    >
      <MediaLibraryCard
        key={file.key}
        isSelected={isSelectedFile(file)}
        text={file.name}
        onClick={() => onAssetClick(file)}
        isDraft={file.draft}
        draftText={cardDraftText}
        width={MEDIA_CARD_WIDTH}
        height={MEDIA_CARD_HEIGHT}
        margin={'0px'}
        displayURL={displayURLs[file.id] ?? (file.url ? { url: file.url } : {})}
        loadDisplayURL={() => loadDisplayURL(file)}
        type={file.type}
        isViewableImage={file.isViewableImage ?? false}
        collection={collection}
        field={field}
      />
    </div>
  );
};

const MediaLibraryCardGrid: FC<MediaLibraryCardGridProps> = props => {
  const { mediaItems, scrollContainerRef } = props;

  return (
    <div className="relative w-full h-full">
      <AutoSizer>
        {({ height, width }) => {
          const cardWidth = parseInt(MEDIA_CARD_WIDTH, 10);
          const cardHeight = parseInt(MEDIA_CARD_HEIGHT, 10);
          const gutter = parseInt(MEDIA_CARD_MARGIN, 10);
          const columnWidth = cardWidth;
          const columnWidthWithGutter = columnWidth + gutter;
          const rowHeight = cardHeight;
          const rowHeightWithGutter = rowHeight + gutter;
          const columnCount = Math.floor(width / columnWidth);
          const rowCount = Math.ceil(mediaItems.length / columnCount);

          return (
            <div ref={scrollContainerRef}>
              {/* TODO $width={width} $height={height} */}
              <Grid
                columnCount={columnCount}
                columnWidth={index =>
                  index + 1 === rowCount ? columnWidth : columnWidthWithGutter
                }
                rowCount={rowCount}
                rowHeight={index => (index + 1 === rowCount ? rowHeight : rowHeightWithGutter)}
                width={width}
                height={height}
                itemData={
                  {
                    ...props,
                    gutter,
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
