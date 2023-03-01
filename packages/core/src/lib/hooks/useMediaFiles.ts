import { useMemo } from 'react';

import { selectMediaFiles } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { MediaField, MediaFile } from '@staticcms/core/interface';

export default function useMediaFiles(field?: MediaField): MediaFile[] {
  const selector = useMemo(() => selectMediaFiles(field), [field]);

  return useAppSelector(selector);
}
