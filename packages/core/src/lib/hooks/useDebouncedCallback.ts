import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebouncedCallback = <T extends (...args: any) => any>(func: T, wait: number) => {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      const later = () => {
        clearTimeout(timeout.current);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait],
  );
};

export default useDebouncedCallback;
