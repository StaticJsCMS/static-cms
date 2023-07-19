import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ValueOrNestedValue } from '@staticcms/core/interface';

export default function useData(value: ValueOrNestedValue, path: string) {
  const [data, setData] = useState(value);

  const isCms = useMemo(() => {
    if (!window) {
      return false;
    }

    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('useCmsData') === 'true';
  }, []);

  const onDataChange = useCallback(
    (event: MessageEvent) => {
      if (!isCms || event.data.message !== 'data:update') {
        return;
      }

      const { fieldPath, value } = event.data.value;

      if (fieldPath === path) {
        setData(value);
      }
    },
    [isCms, path],
  ) as EventListenerOrEventListenerObject;

  useEffect(() => {
    if (!isCms) {
      return;
    }

    window?.addEventListener('message', onDataChange);

    return () => {
      window?.removeEventListener('message', onDataChange);
    };
  }, [isCms, onDataChange]);

  return data ?? null;
}
