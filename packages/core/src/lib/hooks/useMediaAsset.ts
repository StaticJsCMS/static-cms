import { useEffect, useMemo, useState } from 'react';

import { emptyAsset, getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { isNotEmpty } from '../util/string.util';
import useDebounce from './useDebounce';

import type {
  BaseField,
  Collection,
  Entry,
  MediaField,
  UnknownField,
} from '@staticcms/core/interface';

export default function useMediaAsset<T extends MediaField, EF extends BaseField = UnknownField>(
  url: string | undefined | null,
  collection?: Collection<EF>,
  field?: T,
  entry?: Entry,
  currentFolder?: string,
): string {
  const isAbsolute = useMemo(
    () => (isNotEmpty(url) ? /^(?:[a-z+]+:)?\/\//g.test(url) : false),
    [url],
  );

  const dispatch = useAppDispatch();
  const [assetSource, setAssetSource] = useState(isAbsolute ? url : '');
  const debouncedUrl = useDebounce(url, 200);

  useEffect(() => {
    if (!debouncedUrl || isAbsolute || debouncedUrl.startsWith('blob:')) {
      return;
    }

    const fetchMedia = async () => {
      const asset = await dispatch(
        getAsset<T, EF>(collection, entry, debouncedUrl, field, currentFolder),
      );
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
