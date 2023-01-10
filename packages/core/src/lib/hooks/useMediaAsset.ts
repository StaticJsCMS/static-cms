import { useEffect, useState } from 'react';

import { getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import { isNotEmpty } from '../util/string.util';

import type { Field, Collection, Entry } from '@staticcms/core/interface';

export default function useMediaAsset<T extends Field>(
  url: string | undefined,
  collection?: Collection<T>,
  field?: T,
  entry?: Entry,
): string {
  const dispatch = useAppDispatch();
  const [assetSource, setAssetSource] = useState(url);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchMedia = async () => {
      const asset = (await dispatch(getAsset<T>(collection, entry, url, field)))?.toString() ?? '';
      setAssetSource(asset);
    };

    fetchMedia();
  }, [collection, dispatch, entry, field, url]);

  return isNotEmpty(assetSource) ? assetSource : url ?? '';
}
