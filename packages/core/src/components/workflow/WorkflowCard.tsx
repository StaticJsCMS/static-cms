import { useDraggable } from '@dnd-kit/core';
import React, { useMemo } from 'react';

import {
  COLLECTION_CARD_HEIGHT,
  COLLECTION_CARD_HEIGHT_WITHOUT_IMAGE,
} from '@staticcms/core/constants/views';
import { getPreviewCard } from '@staticcms/core/lib/registry';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectInferredField, selectTemplateName } from '@staticcms/core/lib/util/collection.util';
import { isNotNullish, isNullish } from '@staticcms/core/lib/util/null.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import EntryCard from '../collections/entries/EntryCard';

import type { Entry } from '@staticcms/core/interface';
import type { FC } from 'react';

import './WorkflowCard.css';

const classes = generateClassNames('WorkflowCard', ['root', 'dragging']);

export interface WorkflowCardProps {
  entry: Entry;
}

const WorkflowCard: FC<WorkflowCardProps> = ({ entry }) => {
  const { isDragging, setNodeRef, listeners } = useDraggable({
    id: `${entry.collection}|${entry.slug}`,
  });

  const collection = useAppSelector(selectCollection(entry.collection));
  const imageFieldName = selectInferredField(collection, 'image');

  const height = useMemo(() => {
    let result = null;

    if (collection) {
      const templateName = selectTemplateName(collection, entry.slug);

      result = getPreviewCard(templateName)?.getHeight?.({ collection, entry }) ?? null;
    }

    if (isNullish(result)) {
      result = isNotNullish(imageFieldName)
        ? COLLECTION_CARD_HEIGHT
        : COLLECTION_CARD_HEIGHT_WITHOUT_IMAGE;
    }

    return result;
  }, [collection, entry, imageFieldName]);

  return collection ? (
    <div
      ref={setNodeRef}
      className={classNames(classes.root, isDragging && classes.dragging)}
      style={{
        height,
        opacity: isDragging ? 0 : undefined,
      }}
      {...listeners}
    >
      <EntryCard
        entry={entry}
        imageFieldName={imageFieldName}
        collection={collection}
        backTo="/dashboard"
        noMargin
      />
    </div>
  ) : null;
};

export default WorkflowCard;
