import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';
import { useParams } from 'react-router-dom';
import { Add as AddIcon } from '@styled-icons/material/Add';

import useEntries from '@staticcms/core/lib/hooks/useEntries';
import useIcon from '@staticcms/core/lib/hooks/useIcon';
import {
  selectEntryCollectionTitle,
  selectFolderEntryExtension,
} from '@staticcms/core/lib/util/collection.util';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { addFileTemplateFields } from '@staticcms/core/lib/widgets/stringTemplate';
import Button from '../common/button/Button';
import IconButton from '../common/button/IconButton';

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
      <div className="flex flex-grow gap-4 justify-normal xs:justify-between w-full sm:justify-normal">
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
          <div className="max-w-collection-title">{pluralLabel}</div>
        </h2>
        {newEntryUrl ? (
          <>
            <Button to={newEntryUrl} className="hidden xs:flex">
              {t('collection.collectionTop.newButton', {
                collectionLabel: collectionLabelSingular || pluralLabel,
              })}
            </Button>
            <IconButton to={newEntryUrl} className="flex xs:hidden">
              <AddIcon className="w-5 h-5" />
            </IconButton>
          </>
        ) : null}
      </div>
    </>
  );
};

export default translate()(CollectionHeader);
