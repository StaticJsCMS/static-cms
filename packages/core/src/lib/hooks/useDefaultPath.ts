import { useMemo } from 'react';

import { selectUseWorkflow } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { getDefaultPath } from '../util/collection.util';

import type { Collections } from '@staticcms/core/interface';

export default function useDefaultPath(collections: Collections) {
  const useWorkflow = useAppSelector(selectUseWorkflow);

  return useMemo(() => getDefaultPath(collections, useWorkflow), [collections, useWorkflow]);
}
