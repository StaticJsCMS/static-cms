import { useMemo } from 'react';

export default function useCursor(cursor: 'default' | 'pointer' | 'text', disabled: boolean) {
  return useMemo(() => {
    if (disabled) {
      return 'default';
    }

    return cursor;
  }, [cursor, disabled]);
}
