import React, { useMemo } from 'react';

import { useInferredFields } from '@staticcms/core/lib/util/collection.util';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import EntryCard from '../collections/entries/EntryCard';
import { useDatetimeFormats } from '@staticcms/datetime/datetime.util';

import type { DateTimeField, Entry } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface WorkflowCardProps {
  entry: Entry;
}

const WorkflowCard: FC<WorkflowCardProps> = ({ entry }) => {
  const collection = useAppSelector(selectCollection(entry.collection));
  const inferredFields = useInferredFields(collection);

  const dateField = useMemo(
    () =>
      collection && 'fields' in collection
        ? (collection.fields?.find(
            f => f.name === inferredFields.date && f.widget === 'image',
          ) as DateTimeField)
        : undefined,
    [collection, inferredFields.date],
  );

  const formats = useDatetimeFormats(dateField);

  return collection ? (
    <EntryCard
      entry={entry}
      imageFieldName={inferredFields.image}
      descriptionFieldName={inferredFields.description}
      dateFieldName={inferredFields.date}
      dateFormats={formats}
      collection={collection}
      useWorkflow
      noMargin
    />
  ) : null;
};

export default WorkflowCard;
