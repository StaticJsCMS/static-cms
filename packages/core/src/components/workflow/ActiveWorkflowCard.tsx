import React from 'react';

import { selectInferredField } from '@staticcms/core/lib/util/collection.util';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import EntryCard from '../collections/entries/EntryCard';

import type { Entry } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface WorkflowCardProps {
  entry: Entry;
}

const WorkflowCard: FC<WorkflowCardProps> = ({ entry }) => {
  const collection = useAppSelector(selectCollection(entry.collection));
  const imageFieldName = selectInferredField(collection, 'image');

  return collection ? (
    <EntryCard entry={entry} imageFieldName={imageFieldName} collection={collection} noMargin />
  ) : null;
};

export default WorkflowCard;
