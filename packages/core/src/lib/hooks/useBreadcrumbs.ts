import { useEffect, useMemo } from 'react';

import { loadEntries } from '@staticcms/core/actions/entries';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { selectEntryCollectionTitle, selectFolderEntryExtension } from '../util/collection.util';
import { addFileTemplateFields } from '../widgets/stringTemplate';
import useEntries from './useEntries';
import {getTreeNodeIndexFile} from "@staticcms/core/lib/util/nested.util";

import type { Breadcrumb, Collection, Entry } from '@staticcms/core/interface';
import type { t } from 'react-polyglot';

interface EntryDetails {
  isNewEntry: boolean;
  summary: string;
  t: t;
}

export default function useBreadcrumbs(
  collection: Collection,
  filterTerm: string | undefined | null,
  entryDetails?: EntryDetails,
) {
  const entries = useEntries(collection);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!entries || entries.length === 0) {
      dispatch(loadEntries(collection));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => {
    const crumbs: Breadcrumb[] = [
      {
        name: collection.label,
        to: `/collections/${collection.name}?noredirect`,
      },
    ];

    if ('nested' in collection && collection.nested?.path && filterTerm) {
      const entriesByPath = entries.reduce((acc, entry) => {
        acc[entry.path] = entry;
        return acc;
      }, {} as Record<string, Entry>);

      const path = filterTerm.split('/');
      if (path.length > 0) {
        const extension = selectFolderEntryExtension(collection);

        for (let i = 0; i < path.length; i++) {
          const pathSoFar = path.slice(0, i + 1).join('/');

          let entry =
            entriesByPath[
              `${collection.folder}/${pathSoFar}/${collection.nested.path.index_file}.${extension}`
            ];

          let title = path[i];
          if (entry) {
            entry = {
              ...entry,
              data: addFileTemplateFields(entry.path, entry.data as Record<string, string>),
            };
            title = selectEntryCollectionTitle(collection, entry);
          }

          const index = getTreeNodeIndexFile(collection, entry);

          let to;
          if (index) {
            to = `/collections/${collection.name}/entries/${index.slug}`;
          } else if (entry) {
            to = `/collections/${collection.name}/entries/${entry.slug}`;
          } else {
            to = `/collections/${collection.name}/filter/${pathSoFar}`;
          }

          crumbs.push({
            name: title,
            to,
          });
        }

        return crumbs;
      }
    }

    if (entryDetails) {
      const { isNewEntry, summary, t } = entryDetails;
      crumbs.push({
        name: isNewEntry
          ? t('collection.collectionTop.newButton', {
              collectionLabel: collection.label_singular || collection.label,
            })
          : summary,
      });
    }

    return crumbs;
  }, [collection, entries, entryDetails, filterTerm]);
}
