import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';
import { useParams } from 'react-router-dom';

import useEntries from '@staticcms/core/lib/hooks/useEntries';
import useIcon from '@staticcms/core/lib/hooks/useIcon';
import {
  selectEntryCollectionTitle,
  selectFolderEntryExtension,
} from '@staticcms/core/lib/util/collection.util';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { addFileTemplateFields } from '@staticcms/core/lib/widgets/stringTemplate';
import Button from '../common/button/Button';

import type { Collection, Entry, TranslatedProps } from '@staticcms/core/interface';

interface CollectionHeaderProps {
  collection: Collection;
  newEntryUrl?: string;
}

const CollectionHeader = ({
  collection,
  newEntryUrl,
  t,
}: TranslatedProps<CollectionHeaderProps>) => {
  const collectionLabel = collection.label;
  const collectionLabelSingular = collection.label_singular;

  const icon = useIcon(collection.icon);

  const params = useParams();
  const filterTerm = useMemo(() => params['*'], [params]);
  const entries = useEntries(collection);

  const pluralLabel = useMemo(() => {
    if ('nested' in collection && collection.nested?.path && filterTerm) {
      const entriesByPath = entries.reduce((acc, entry) => {
        acc[entry.path] = entry;
        return acc;
      }, {} as Record<string, Entry>);

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
    <>
      <div className="flex flex-grow gap-4">
        <h2
          className="
            text-xl
            font-semibold
            flex
            items-center
            text-gray-800
            dark:text-gray-300
            gap-2
          "
        >
          <div className="flex items-center">{icon}</div>
          {pluralLabel}
        </h2>
        {newEntryUrl ? (
          <Button to={newEntryUrl}>
            {t('collection.collectionTop.newButton', {
              collectionLabel: collectionLabelSingular || pluralLabel,
            })}
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default translate()(CollectionHeader);
