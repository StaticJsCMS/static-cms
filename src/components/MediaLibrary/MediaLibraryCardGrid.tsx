import styled from '@emotion/styled';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Waypoint } from 'react-waypoint';
import { FixedSizeGrid as Grid } from 'react-window';

import { transientOptions } from '../../lib';
import { colors } from '../../ui';
import MediaLibraryCard from './MediaLibraryCard';

import type { GridChildComponentProps } from 'react-window';
import type { MediaLibraryDisplayURL, MediaLibraryState } from '../../reducers/mediaLibrary';

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
  setScrollContainerRef: () => void;
  mediaItems: MediaLibraryCardItem[];
  isSelectedFile: (file: MediaLibraryCardItem) => boolean;
  onAssetClick: (file: MediaLibraryCardItem) => void;
  canLoadMore?: boolean;
  onLoadMore: () => void;
  isPaginating?: boolean;
  paginatingMessage?: string;
  cardDraftText: string;
  cardWidth: string;
  cardHeight: string;
  cardMargin: string;
  loadDisplayURL: (file: MediaLibraryCardItem) => void;
  isPrivate?: boolean;
  displayURLs: MediaLibraryState['displayURLs'];
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
    cardWidth,
    cardHeight,
    isPrivate,
    displayURLs,
    loadDisplayURL,
    columnCount,
    gutter,
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
        left: typeof style.left === 'number' ? style.left ?? +gutter * columnIndex : style.left,
        top: typeof style.top === 'number' ? style.top + gutter : style.top,
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
        width={cardWidth}
        height={cardHeight}
        margin={'0px'}
        isPrivate={isPrivate}
        displayURL={displayURLs[file.id] ?? (file.url ? { url: file.url } : {})}
        loadDisplayURL={() => loadDisplayURL(file)}
        type={file.type}
        isViewableImage={file.isViewableImage ?? false}
      />
    </div>
  );
};

const CardGridContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-left: -10px;
  margin-right: -10px;
`;

const VirtualizedGrid = (props: MediaLibraryCardGridProps) => {
  const {
    cardWidth: inputCardWidth,
    cardHeight: inputCardHeight,
    cardMargin,
    mediaItems,
    setScrollContainerRef,
  } = props;

  return (
    <CardGridContainer ref={setScrollContainerRef}>
      <AutoSizer>
        {({ height, width }) => {
          const cardWidth = parseInt(inputCardWidth, 10);
          const cardHeight = parseInt(inputCardHeight, 10);
          const gutter = parseInt(cardMargin, 10);
          const columnWidth = cardWidth + gutter;
          const rowHeight = cardHeight + gutter;
          const columnCount = Math.floor(width / columnWidth);
          const rowCount = Math.ceil(mediaItems.length / columnCount);
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              height={height}
              itemData={
                {
                  ...props,
                  gutter,
                  columnCount,
                } as CardGridItemData
              }
            >
              {CardWrapper}
            </Grid>
          );
        }}
      </AutoSizer>
    </CardGridContainer>
  );
};

interface PaginatingMessageProps {
  $isPrivate: boolean;
}

const PaginatingMessage = styled(
  'h1',
  transientOptions,
)<PaginatingMessageProps>(
  ({ $isPrivate }) => `
    ${$isPrivate ? `color: ${colors.textFieldBorder};` : ''}
  `,
);

function PaginatedGrid({
  setScrollContainerRef,
  mediaItems,
  isSelectedFile,
  onAssetClick,
  cardDraftText,
  cardWidth,
  cardHeight,
  cardMargin,
  isPrivate = false,
  displayURLs,
  loadDisplayURL,
  canLoadMore,
  onLoadMore,
  isPaginating,
  paginatingMessage,
}: MediaLibraryCardGridProps) {
  return (
    <CardGridContainer ref={setScrollContainerRef}>
      <CardGrid>
        {mediaItems.map(file => (
          <MediaLibraryCard
            key={file.key}
            isSelected={isSelectedFile(file)}
            text={file.name}
            onClick={() => onAssetClick(file)}
            isDraft={file.draft}
            draftText={cardDraftText}
            width={cardWidth}
            height={cardHeight}
            margin={cardMargin}
            isPrivate={isPrivate}
            displayURL={displayURLs[file.id] ?? (file.url ? { url: file.url } : {})}
            loadDisplayURL={() => loadDisplayURL(file)}
            type={file.type}
            isViewableImage={file.isViewableImage ?? false}
          />
        ))}
        {!canLoadMore ? null : <Waypoint onEnter={onLoadMore} />}
      </CardGrid>
      {!isPaginating ? null : (
        <PaginatingMessage $isPrivate={isPrivate}>{paginatingMessage}</PaginatingMessage>
      )}
    </CardGridContainer>
  );
}

function MediaLibraryCardGrid(props: MediaLibraryCardGridProps) {
  const { canLoadMore, isPaginating } = props;
  if (canLoadMore || isPaginating) {
    return <PaginatedGrid {...props} />;
  }
  return <VirtualizedGrid {...props} />;
}

export default MediaLibraryCardGrid;
