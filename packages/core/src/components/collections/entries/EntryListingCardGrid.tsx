import React, { useCallback, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';

import {
  COLLECTION_CARD_HEIGHT,
  COLLECTION_CARD_IMAGE_HEIGHT,
  COLLECTION_CARD_MARGIN,
  COLLECTION_CARD_WIDTH,
} from '@staticcms/core/constants/views';
import classNames from '@staticcms/core/lib/util/classNames.util';
import EntryCard from './EntryCard';

import type { CollectionEntryData } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { t } from 'react-polyglot';
import type { GridChildComponentProps } from 'react-window';

export interface EntryListingCardGridProps {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  entryData: CollectionEntryData[];
  onScroll: () => void;
  hasImage: boolean;
  t: t;
}

export interface CardGridItemData {
  columnCount: number;
  entryData: CollectionEntryData[];
  t: t;
}

const CardWrapper = ({
  rowIndex,
  columnIndex,
  style,
  data: { columnCount, entryData, t },
}: GridChildComponentProps<CardGridItemData>) => {
  const left = useMemo(
    () =>
      parseFloat(
        `${
          typeof style.left === 'number'
            ? style.left ?? COLLECTION_CARD_MARGIN * columnIndex
            : style.left
        }`,
      ),
    [columnIndex, style.left],
  );

  const top = useMemo(
    () => parseFloat(`${typeof style.top === 'number' ? style.top ?? 0 : style.top}`) + 4,
    [style.top],
  );

  const index = rowIndex * columnCount + columnIndex;
  if (index >= entryData.length) {
    return null;
  }
  const data = entryData[index];

  return (
    <div
      style={{
        ...style,
        left,
        top,
        width: style.width,
        height: style.height,
        paddingRight: `${columnIndex + 1 === columnCount ? 0 : COLLECTION_CARD_MARGIN}px`,
        paddingBottom: `${COLLECTION_CARD_MARGIN}px`,
      }}
    >
      <EntryCard
        key={data.key}
        collection={data.collection}
        entry={data.entry}
        imageFieldName={data.imageFieldName}
        t={t}
      />
    </div>
  );
};

const EntryListingCardGrid: FC<EntryListingCardGridProps> = ({
  entryData,
  scrollContainerRef,
  onScroll,
  hasImage,
  t,
}) => {
  const [version, setVersion] = useState(0);

  const handleResize = useCallback(() => {
    setVersion(oldVersion => oldVersion + 1);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AutoSizer onResize={handleResize}>
        {({ height = 0, width = 0 }) => {
          const columnWidthWithGutter = COLLECTION_CARD_WIDTH + COLLECTION_CARD_MARGIN;
          const rowHeightWithGutter =
            (hasImage
              ? COLLECTION_CARD_HEIGHT
              : COLLECTION_CARD_HEIGHT - COLLECTION_CARD_IMAGE_HEIGHT) + COLLECTION_CARD_MARGIN;
          const columnCount = Math.floor(width / columnWidthWithGutter);
          const nonGutterSpace = (width - COLLECTION_CARD_MARGIN * columnCount) / width;
          const columnWidth = (1 / columnCount) * nonGutterSpace;

          const rowCount = Math.ceil(entryData.length / columnCount);

          return (
            <div
              key={version}
              className={classNames(
                `
                  overflow-hidden
                `,
              )}
              style={{
                width,
                height,
              }}
            >
              <Grid
                columnCount={columnCount}
                columnWidth={index =>
                  index + 1 === columnCount
                    ? width * columnWidth
                    : width * columnWidth + COLLECTION_CARD_MARGIN
                }
                rowCount={rowCount}
                rowHeight={() => rowHeightWithGutter}
                width={width}
                height={height}
                itemData={
                  {
                    entryData,
                    columnCount,
                    t,
                  } as CardGridItemData
                }
                outerRef={scrollContainerRef}
                onScroll={onScroll}
                className={classNames(
                  `
                    overflow-hidden
                    overflow-y-auto
                    styled-scrollbars
                  `,
                )}
                style={{ position: 'unset' }}
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

export default EntryListingCardGrid;
