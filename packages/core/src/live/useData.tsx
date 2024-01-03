import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ValueOrNestedValue } from '@staticcms/core';

export default function useData<I extends ValueOrNestedValue, O extends ValueOrNestedValue>(
  value: O,
  path?: string,
  preprocessor?: (value: I) => O | Promise<O>,
) {
  const [data, setData] = useState(value);

  const isCms = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('useCmsData') === 'true';
  }, []);

  const onDataChange = useCallback(
    async (event: MessageEvent) => {
      if (!isCms || !path || event.data.message !== 'data:update') {
        return;
      }

      const { fieldPath, value } = event.data.value;

      if (fieldPath === path) {
        setData(preprocessor ? await preprocessor(value) : value);
      }
    },
    [isCms, path, preprocessor],
  ) as unknown as EventListenerOrEventListenerObject;

  useEffect(() => {
    if (!isCms || typeof window === 'undefined') {
      return;
    }

    window.addEventListener('message', onDataChange);

    return () => {
      window.removeEventListener('message', onDataChange);
    };
  }, [isCms, onDataChange]);

  return data ?? value;
}
