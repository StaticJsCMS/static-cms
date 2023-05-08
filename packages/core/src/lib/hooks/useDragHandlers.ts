import { useCallback, useMemo, useState } from 'react';

import type { DragEvent } from 'react';

interface UseDragHandlersState {
  dragOverActive: boolean;
  counter: number;
}

export default function useDragHandlers(onDrop: (event: DragEvent) => void) {
  const [{ dragOverActive }, setState] = useState<UseDragHandlersState>({
    dragOverActive: false,
    counter: 0,
  });

  const handleDragEnter = useCallback((event: DragEvent) => {
    event.preventDefault();
    setState(old => ({
      dragOverActive: true,
      counter: old.counter + 1,
    }));
  }, []);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    setState(old => ({
      dragOverActive: old.counter - 1 <= 0 ? false : old.dragOverActive,
      counter: old.counter - 1,
    }));
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      setState({
        dragOverActive: false,
        counter: 0,
      });
      onDrop(event);
    },
    [onDrop],
  );

  return useMemo(
    () => ({
      dragOverActive,
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    }),
    [dragOverActive, handleDragEnter, handleDragLeave, handleDragOver, handleDrop],
  );
}
