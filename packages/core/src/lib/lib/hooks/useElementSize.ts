import { useCallback, useEffect, useState } from 'react';

import { useWindowEvent } from '../util/window.util';

import type { Ref } from 'react';

interface Size {
  width: number;
  height: number;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(
  providedRef: Ref<T | null> = null,
): Size {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  useWindowEvent('resize', handleSize);

  useEffect(() => {
    setRef(typeof providedRef !== 'function' ? providedRef?.current ?? null : null);
  }, [providedRef]);

  useEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return size;
}

export default useElementSize;
