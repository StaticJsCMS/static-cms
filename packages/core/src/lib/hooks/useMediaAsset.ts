import { useEffect, useMemo, useState } from 'react';

import { emptyAsset, getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { isNotEmpty } from '../util/string.util';
import useDebounce from './useDebounce';

import type { Collection, Entry, MediaField } from '@staticcms/core/interface';

export default function useMediaAsset<T extends MediaField>(
  url: string | undefined | null,
  collection?: Collection<T>,
  field?: T,
  entry?: Entry,
): string {
  const isAbsolute = useMemo(
    () => (isNotEmpty(url) ? /^(?:[a-z+]+:)?\/\//g.test(url) : false),
    [url],
  );

  const dispatch = useAppDispatch();
  const [assetSource, setAssetSource] = useState(isAbsolute ? url : '');
  const debouncedUrl = useDebounce(url, 200);

  useEffect(() => {
    if (!debouncedUrl || isAbsolute) {
      return;
    }

    const fetchMedia = async () => {
      const asset = await dispatch(getAsset<T>(collection, entry, debouncedUrl, field));
      if (asset !== emptyAsset) {
        setAssetSource(asset?.toString() ?? '');
      }
    };

    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUrl]);

  return useMemo(
    () => (debouncedUrl?.startsWith('blob:') ? debouncedUrl : assetSource ?? ''),
    [assetSource, debouncedUrl],
  );
}
