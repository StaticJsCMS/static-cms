import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';

import {
  COLLECTION_CARD_HEIGHT,
  COLLECTION_CARD_HEIGHT_WITHOUT_IMAGE,
  COLLECTION_CARD_MARGIN,
  COLLECTION_CARD_WIDTH,
} from '@staticcms/core/constants/views';
import { getPreviewCard } from '@staticcms/core/lib/registry';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectTemplateName } from '@staticcms/core/lib/util/collection.util';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import EntryCard from './EntryCard';

import type { CollectionEntryData } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { t } from 'react-polyglot';
import type { GridChildComponentProps } from 'react-window';

export interface EntryListingCardGridProps {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  entryData: CollectionEntryData[];
  onScroll: () => void;
  t: t;
}

export interface CardGridItemData {
  columnCount: number;
  cardHeights: number[];
  entryData: CollectionEntryData[];
  t: t;
}

const CardWrapper = ({
  rowIndex,
  columnIndex,
  style,
  data: { columnCount, cardHeights, entryData, t },
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
  const cardHeight =
    index < cardHeights.length ? cardHeights[index] + COLLECTION_CARD_MARGIN : style.height;

  return (
    <div
      style={{
        ...style,
        left,
        top,
        width: style.width,
        height: cardHeight,
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
  t,
}) => {
  const [version, setVersion] = useState(0);

  const handleResize = useCallback(() => {
    setVersion(oldVersion => oldVersion + 1);
  }, []);

  const getHeightFn = useCallback((data: CollectionEntryData) => {
    const templateName = selectTemplateName(data.collection, data.entry.slug);

    return getPreviewCard(templateName)?.getHeight ?? null;
  }, []);

  const getDefaultHeight = useCallback((data?: CollectionEntryData) => {
    return isNotNullish(data?.imageFieldName)
      ? COLLECTION_CARD_HEIGHT
      : COLLECTION_CARD_HEIGHT_WITHOUT_IMAGE;
  }, []);

  const [prevCardHeights, setPrevCardHeight] = useState<number[]>([]);
  const cardHeights: number[] = useMemo(() => {
    const newCardHeights = [...prevCardHeights];
    const startIndex = newCardHeights.length;
    const endIndex = entryData.length;

    for (let i = startIndex; i < endIndex; i++) {
      const data = entryData[i];
      const getHeight = getHeightFn(data);
      if (getHeight) {
        newCardHeights.push(getHeight({ collection: data.collection, entry: data.entry }));
        continue;
      }

      newCardHeights.push(getDefaultHeight(data));
    }

    return newCardHeights;
  }, [entryData, getDefaultHeight, getHeightFn, prevCardHeights]);

  useEffect(() => {
    if (cardHeights.length !== prevCardHeights.length) {
      setPrevCardHeight(cardHeights);
    }
  }, [cardHeights, prevCardHeights.length]);

  return (
    <div className="relative w-full h-full">
      <AutoSizer onResize={handleResize}>
        {({ height = 0, width = 0 }) => {
          const columnWidthWithGutter = COLLECTION_CARD_WIDTH + COLLECTION_CARD_MARGIN;
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
                rowHeight={index => {
                  const rowStart = index * columnCount;
                  const rowEnd = (index + 1) * columnCount - 1;
                  let rowHeight = 0;
                  for (let i = rowStart; i <= rowEnd; i++) {
                    if (cardHeights.length <= i) {
                      break;
                    }

                    if (cardHeights[i] > rowHeight && cardHeights[i]) {
                      rowHeight = cardHeights[i] + COLLECTION_CARD_MARGIN;
                    }
                  }

                  if (rowHeight === 0) {
                    rowHeight = getDefaultHeight() + COLLECTION_CARD_MARGIN;
                  }

                  return rowHeight;
                }}
                width={width}
                height={height}
                itemData={
                  {
                    entryData,
                    cardHeights,
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
                overscanRowCount={5}
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
