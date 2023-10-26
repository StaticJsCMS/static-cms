import { useCallback, useEffect, useMemo, useState } from 'react';

import { emptyAsset, getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { isNotEmpty } from '../util/string.util';
import useDebounce from './useDebounce';

import type {
  BaseField,
  CollectionWithDefaults,
  Entry,
  MediaField,
  UnknownField,
} from '@staticcms/core/interface';

export function useGetMediaAsset<T extends MediaField, EF extends BaseField = UnknownField>(
  collection?: CollectionWithDefaults<EF>,
  field?: T,
  entry?: Entry,
  currentFolder?: string,
  isDirectory = false,
): (url: string | undefined | null) => Promise<string | undefined | null> {
  const dispatch = useAppDispatch();

  return useCallback(
    async (url: string | undefined | null): Promise<string | undefined | null> => {
      const isAbsolute = isNotEmpty(url) ? /^(?:[a-z+]+:)?\/\//g.test(url) : false;

      if (!url || isAbsolute || url.startsWith('blob:') || isDirectory) {
        return url;
      }

      const asset = await dispatch(getAsset<T, EF>(collection, entry, url, field, currentFolder));

      if (asset !== emptyAsset) {
        return asset?.toString() ?? '';
      }

      return '';
    },
    [collection, currentFolder, dispatch, entry, field, isDirectory],
  );
}

export default function useMediaAsset<T extends MediaField, EF extends BaseField = UnknownField>(
  url: string | undefined | null,
  collection?: CollectionWithDefaults<EF>,
  field?: T,
  entry?: Entry,
  currentFolder?: string,
  isDirectory?: boolean,
): string {
  const isAbsolute = useMemo(
    () => (isNotEmpty(url) ? /^(?:[a-z+]+:)?\/\//g.test(url) : false),
    [url],
  );

  const dispatch = useAppDispatch();
  const [assetSource, setAssetSource] = useState(isAbsolute ? url : '');
  const debouncedUrl = useDebounce(url, 200);

  useEffect(() => {
    if (!debouncedUrl || isAbsolute || debouncedUrl.startsWith('blob:') || isDirectory) {
      return;
    }

    let alive = true;

    const fetchMedia = async () => {
      const asset = await dispatch(
        getAsset<T, EF>(collection, entry, debouncedUrl, field, currentFolder),
      );

      if (alive) {
        setAssetSource(asset?.toString() ?? '');
      }
    };

    fetchMedia();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUrl]);

  return useMemo(
    () => (debouncedUrl?.startsWith('blob:') ? debouncedUrl : assetSource ?? ''),
    [assetSource, debouncedUrl],
  );
}
