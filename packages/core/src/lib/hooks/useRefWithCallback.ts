import { useCallback, useRef } from 'react';

export default function useRefWithCallback<T>(cb: (node: T) => void) {
  const ref = useRef<T>(null);
  const setRef = useCallback(
    (node: T | null) => {
      if (node) {
        cb(node);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref as any).current = node;
    },
    [cb],
  );

  return setRef;
}
