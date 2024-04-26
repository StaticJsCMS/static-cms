import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import useEntries from '@staticcms/core/lib/hooks/useEntries';
import useIcon from '@staticcms/core/lib/hooks/useIcon';
import useNewEntryUrl from '@staticcms/core/lib/hooks/useNewEntryUrl';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import {
  selectEntryCollectionTitle,
  selectFolderEntryExtension,
} from '@staticcms/core/lib/util/collection.util';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { addFileTemplateFields } from '@staticcms/core/lib/widgets/stringTemplate';
import Button from '../common/button/Button';
import collectionClasses from './Collection.classes';

import type { CollectionWithDefaults, Entry } from '@staticcms/core';
import type { FC } from 'react';

interface CollectionHeaderProps {
  collection: CollectionWithDefaults;
}

const CollectionHeader: FC<CollectionHeaderProps> = ({ collection }) => {
  const t = useTranslate();

  const collectionLabel = collection.label;
  const collectionLabelSingular = collection.label_singular;

  const params = useParams();
  const filterTerm = useMemo(() => params['*'], [params]);
  const newEntryUrl = useNewEntryUrl(collection, filterTerm);

  const icon = useIcon(collection.icon);

  const entries = useEntries(collection);

  const pluralLabel = useMemo(() => {
    if ('nested' in collection && collection.nested?.path && filterTerm) {
      const entriesByPath = entries.reduce(
        (acc, entry) => {
          acc[entry.path] = entry;
          return acc;
        },
        {} as Record<string, Entry>,
      );

      if (isNotEmpty(filterTerm)) {
        const extension = selectFolderEntryExtension(collection);

        let entry =
          entriesByPath[
            `${collection.folder}/${filterTerm}/${collection.nested.path.index_file}.${extension}`
          ];

        if (entry) {
          entry = {
            ...entry,
            data: addFileTemplateFields(entry.path, entry.data as Record<string, string>),
          };
          const title = selectEntryCollectionTitle(collection, entry);

          return title;
        }
      }
    }

    return collectionLabel;
  }, [collection, collectionLabel, entries, filterTerm]);

  return (
    <div className={collectionClasses['header-wrapper']}>
      <h2 className={collectionClasses.header}>
        <div className={collectionClasses['header-icon']}>{icon}</div>
        <div className={collectionClasses['header-label']}>{pluralLabel}</div>
      </h2>
      {newEntryUrl ? (
        <Button to={newEntryUrl} className={collectionClasses['new-entry-button']}>
          <div className={collectionClasses['new-entry-button-text']}>
            {t('collection.collectionTop.newButton', {
              collectionLabel: collectionLabelSingular ?? pluralLabel,
            })}
          </div>
        </Button>
      ) : null}
    </div>
  );
};

export default CollectionHeader;
