import { useEffect, useState } from 'react';

import { emptyAsset, getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { isEmpty, isNotEmpty } from '../util/string.util';
import useDebounce from './useDebounce';

import type {
  BaseField,
  Collection,
  Entry,
  MediaField,
  UnknownField,
} from '@staticcms/core/interface';

export default function useIsMediaAsset<T extends MediaField, EF extends BaseField = UnknownField>(
  url: string,
  collection: Collection<EF>,
  field: T,
  entry: Entry,
  currentFolder?: string,
): boolean {
  const dispatch = useAppDispatch();
  const [exists, setExists] = useState(false);
  const debouncedUrl = useDebounce(url, 200);

  useEffect(() => {
    if (isEmpty(debouncedUrl)) {
      return;
    }

    const checkMediaExistence = async () => {
      const asset = await dispatch(
        getAsset<T, EF>(collection, entry, debouncedUrl, field, currentFolder),
      );
      setExists(
        Boolean(asset && asset !== emptyAsset && isNotEmpty(asset.toString()) && asset.fileObj),
      );
    };

    checkMediaExistence();
  }, [collection, dispatch, entry, field, debouncedUrl, currentFolder]);

  return exists;
}
