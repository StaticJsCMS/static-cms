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
import useNewEntryUrl from '@staticcms/core/lib/hooks/useNewEntryUrl';

import type { Collection, Entry, TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

interface CollectionHeaderProps {
  collection: Collection;
}

const CollectionHeader: FC<TranslatedProps<CollectionHeaderProps>> = ({ collection, t }) => {
  const collectionLabel = collection.label;
  const collectionLabelSingular = collection.label_singular;

  const params = useParams();
  const filterTerm = useMemo(() => params['*'], [params]);
  const newEntryUrl = useNewEntryUrl(collection, filterTerm);

  const icon = useIcon(collection.icon);

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
      <div
        className="
          flex
          flex-grow
          gap-4
          justify-normal
          xs:justify-between
          sm:justify-normal
          w-full
          overflow-hidden
          whitespace-nowrap
          text-ellipsis
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            flex
            items-center
            text-gray-800
            dark:text-gray-300
            gap-2
            flex-grow
            w-full
            md:grow-0
            md:w-auto
          "
        >
          <div className="flex items-center">{icon}</div>
          <div
            className="
              w-collection-header
              flex-grow
              overflow-hidden
              whitespace-nowrap
              text-ellipsis
            "
          >
            {pluralLabel}
          </div>
        </h2>
        {newEntryUrl ? (
          <Button to={newEntryUrl} className="hidden md:flex">
            {t('collection.collectionTop.newButton', {
              collectionLabel: collectionLabelSingular || pluralLabel,
            })}
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default translate()(CollectionHeader) as FC<CollectionHeaderProps>;
