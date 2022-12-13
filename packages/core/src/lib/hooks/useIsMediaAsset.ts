import { useEffect, useState } from 'react';

import { emptyAsset, getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { isNotEmpty } from '../util/string.util';

import type { Collection, Entry, FileOrImageField, MarkdownField } from '@staticcms/core/interface';

export default function useIsMediaAsset<T extends FileOrImageField | MarkdownField>(
  url: string,
  collection: Collection<T>,
  field: T,
  entry: Entry,
): boolean {
  const dispatch = useAppDispatch();
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const checkMediaExistence = async () => {
      const asset = await dispatch(getAsset<T>(collection, entry, url, field));
      setExists(
        Boolean(asset && asset !== emptyAsset && isNotEmpty(asset.toString()) && asset.fileObj),
      );
    };

    checkMediaExistence();
  }, [collection, dispatch, entry, field, url]);

  return exists;
}
