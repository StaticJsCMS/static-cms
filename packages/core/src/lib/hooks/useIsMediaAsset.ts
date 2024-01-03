import { useEffect, useState } from 'react';

import { emptyAsset, getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { isEmpty, isNotEmpty } from '../util/string.util';
import useDebounce from './useDebounce';

import type {
  BaseField,
  CollectionWithDefaults,
  Entry,
  MediaField,
  UnknownField,
} from '@staticcms/core';

export default function useIsMediaAsset<T extends MediaField, EF extends BaseField = UnknownField>(
  url: string,
  collection: CollectionWithDefaults<EF>,
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

    let alive = true;

    const checkMediaExistence = async () => {
      const asset = await dispatch(
        getAsset<T, EF>(collection, entry, debouncedUrl, field, currentFolder),
      );

      if (alive) {
        setExists(
          Boolean(asset && asset !== emptyAsset && isNotEmpty(asset.toString()) && asset.fileObj),
        );
      }
    };

    checkMediaExistence();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUrl]);

  return exists;
}
