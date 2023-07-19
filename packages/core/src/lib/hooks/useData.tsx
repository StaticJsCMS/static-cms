import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { ValueOrNestedValue } from '@staticcms/core/interface';
import type DataUpdateEvent from '../util/events/DataEvent';

export default function useData(value: ValueOrNestedValue, path: string) {
  const [data, setData] = useState(value);

  const [searchParams] = useSearchParams();
  const isCms = searchParams.get('useCmsData') === 'true';

  const onDataChange = useCallback(
    (event: DataUpdateEvent) => {
      if (!isCms) {
        return;
      }

      if (event.detail.fieldPath === path) {
        setData(event.detail.value);
      }
    },
    [isCms, path],
  ) as EventListenerOrEventListenerObject;

  useEffect(() => {
    if (!isCms) {
      return;
    }

    window.addEventListener('data:update', onDataChange);

    return () => {
      window.removeEventListener('data:update', onDataChange);
    };
  }, [isCms, onDataChange]);

  return data ?? null;
}
