import { useMemo } from 'react';

import { selectMediaFiles } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { MediaField } from '@staticcms/core/interface';

export default function useMediaFiles(field?: MediaField) {
  const selector = useMemo(() => selectMediaFiles(field), [field]);

  return useAppSelector(selector);
}
