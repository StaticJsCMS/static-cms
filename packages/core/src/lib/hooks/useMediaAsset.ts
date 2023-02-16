import { useEffect, useMemo, useState } from 'react';

import { emptyAsset, getAsset } from '@staticcms/core/actions/media';
import { useAppDispatch } from '@staticcms/core/store/hooks';

import type { Collection, Entry, MediaField } from '@staticcms/core/interface';

export default function useMediaAsset<T extends MediaField>(
  url: string | undefined,
  collection?: Collection<T>,
  field?: T,
  entry?: Entry,
): string {
  const dispatch = useAppDispatch();
  const [assetSource, setAssetSource] = useState('');

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchMedia = async () => {
      const asset = await dispatch(getAsset<T>(collection, entry, url, field));
      if (asset !== emptyAsset) {
        setAssetSource(asset?.toString() ?? '');
      }
    };

    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return useMemo(() => assetSource ?? '', [assetSource]);
}
