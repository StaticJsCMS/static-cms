import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export default function useUUID() {
  return useMemo(() => uuid(), []);
}
