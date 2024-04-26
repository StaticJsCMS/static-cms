import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';

import {
  COLLECTION_CARD_DATE_HEIGHT,
  COLLECTION_CARD_HEIGHT,
  COLLECTION_CARD_HEIGHT_WITHOUT_IMAGE,
  COLLECTION_CARD_MARGIN,
  COLLECTION_CARD_WIDTH,
} from '@staticcms/core/constants/views';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { getPreviewCard } from '@staticcms/core/lib/registry';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectTemplateName } from '@staticcms/core/lib/util/collection.util';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { selectUseWorkflow } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import entriesClasses from './Entries.classes';
import EntryCard from './EntryCard';

import type { CollectionEntryData } from '@staticcms/core';
import type { FC } from 'react';
import type { GridChildComponentProps } from 'react-window';

export interface EntryListingCardGridProps {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  entryData: CollectionEntryData[];
  onScroll: () => void;
}

export interface CardGridItemData {
  columnCount: number;
  cardHeights: number[];
  entryData: CollectionEntryData[];
  useWorkflow: boolean;
}

const CardWrapper: FC<GridChildComponentProps<CardGridItemData>> = ({
  rowIndex,
  columnIndex,
  style,
  data: { columnCount, cardHeights, entryData, useWorkflow },
}) => {
  const left = useMemo(
    () =>
      parseFloat(
        `${
          typeof style.left === 'number'
            ? style.left ?? COLLECTION_CARD_MARGIN * columnIndex
            : style.left
        }`,
      ) + 4,
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
    index < cardHeights.length ? cardHeights[index] + COLLECTION_CARD_MARGIN * 2 : style.height;

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
        descriptionFieldName={data.descriptionFieldName}
        dateFieldName={data.dateFieldName}
        dateFormats={data.dateFormats}
        useWorkflow={useWorkflow}
      />
    </div>
  );
};

const EntryListingCardGrid: FC<EntryListingCardGridProps> = ({
  entryData,
  scrollContainerRef,
  onScroll,
}) => {
  const t = useTranslate();

  const useWorkflow = useAppSelector(selectUseWorkflow);

  const [version, setVersion] = useState(0);

  const handleResize = useCallback(() => {
    setVersion(oldVersion => oldVersion + 1);
  }, []);

  const getHeightFn = useCallback((data: CollectionEntryData) => {
    const templateName = selectTemplateName(data.collection, data.entry.slug);

    return getPreviewCard(templateName)?.getHeight ?? null;
  }, []);

  const getDefaultHeight = useCallback((data?: CollectionEntryData) => {
    const base = isNotNullish(data?.imageFieldName)
      ? COLLECTION_CARD_HEIGHT
      : COLLECTION_CARD_HEIGHT_WITHOUT_IMAGE;

    if (isNotNullish(data?.dateFieldName)) {
      return base + COLLECTION_CARD_DATE_HEIGHT;
    }

    return base;
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
    <div className={entriesClasses['entry-listing-cards']}>
      <AutoSizer onResize={handleResize}>
        {({ height = 0, width = 0 }) => {
          const calculatedWidth = width - 4;
          const columnWidthWithGutter = COLLECTION_CARD_WIDTH + COLLECTION_CARD_MARGIN;
          const columnCount = Math.max(Math.floor(calculatedWidth / columnWidthWithGutter), 1);
          const nonGutterSpace =
            (calculatedWidth - COLLECTION_CARD_MARGIN * columnCount) / calculatedWidth;
          const columnWidth = (1 / columnCount) * nonGutterSpace;

          const rowCount = Math.ceil(entryData.length / columnCount);

          return (
            <div
              key={version}
              className={entriesClasses['entry-listing-cards-grid-wrapper']}
              style={{
                width: calculatedWidth,
                height,
              }}
            >
              <Grid
                columnCount={columnCount}
                columnWidth={index =>
                  index + 1 === columnCount
                    ? calculatedWidth * columnWidth
                    : calculatedWidth * columnWidth + COLLECTION_CARD_MARGIN
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
                      rowHeight = cardHeights[i] + COLLECTION_CARD_MARGIN * 2;
                    }
                  }

                  if (rowHeight === 0) {
                    rowHeight = getDefaultHeight() + COLLECTION_CARD_MARGIN * 2;
                  }

                  return rowHeight;
                }}
                width={calculatedWidth}
                height={height}
                itemData={
                  {
                    entryData,
                    cardHeights,
                    columnCount,
                    useWorkflow,
                    t,
                  } as CardGridItemData
                }
                outerRef={scrollContainerRef}
                onScroll={onScroll}
                className={classNames(
                  entriesClasses['entry-listing-cards-grid'],
                  'CMS_Scrollbar_root',
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
