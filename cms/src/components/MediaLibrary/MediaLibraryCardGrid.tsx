import { styled } from '@mui/material/styles';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Waypoint } from 'react-waypoint';
import { FixedSizeGrid as Grid } from 'react-window';

import { transientOptions } from '../../lib';
import { colors } from '../../components/UI/styles';
import MediaLibraryCard from './MediaLibraryCard';

import type { GridChildComponentProps } from 'react-window';
import type { MediaLibraryDisplayURL, MediaLibraryState } from '../../reducers/mediaLibrary';
import type { MediaFile } from '../../interface';

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
  mediaItems: MediaFile[];
  isSelectedFile: (file: MediaFile) => boolean;
  onAssetClick: (asset: MediaFile) => void;
  canLoadMore?: boolean;
  onLoadMore: () => void;
  isPaginating?: boolean;
  paginatingMessage?: string;
  cardDraftText: string;
  cardWidth: string;
  cardHeight: string;
  cardMargin: string;
  loadDisplayURL: (asset: MediaFile) => void;
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

interface StyledCardGridContainerProps {
  $width?: number;
  $height?: number;
}

const StyledCardGridContainer = styled('div')<StyledCardGridContainerProps>(
  ({ $width, $height }) => `
    overflow-y: auto;
    overflow-x: hidden;
    width: ${$width ? `${$width}px` : '100%'};
    height: ${$height ? `${$height}px` : '100%'};ƒ
  `,
);

const CardGrid = styled('div')`
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
          <StyledCardGridContainer $width={width} $height={height} ref={setScrollContainerRef}>
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
          </StyledCardGridContainer>
        );
      }}
    </AutoSizer>
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

const PaginatedGrid = ({
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
}: MediaLibraryCardGridProps) => {
  return (
    <StyledCardGridContainer ref={setScrollContainerRef}>
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
    </StyledCardGridContainer>
  );
};

function MediaLibraryCardGrid(props: MediaLibraryCardGridProps) {
  const { canLoadMore, isPaginating } = props;
  if (canLoadMore || isPaginating) {
    return <PaginatedGrid {...props} />;
  }
  return <VirtualizedGrid {...props} />;
}

export default MediaLibraryCardGrid;
