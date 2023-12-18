import type { DragEvent } from 'react';
export default function useDragHandlers(onDrop: (event: DragEvent) => void): {
    dragOverActive: boolean;
    handleDragEnter: (event: DragEvent) => void;
    handleDragOver: (event: DragEvent) => void;
    handleDragLeave: (event: DragEvent) => void;
    handleDrop: (event: DragEvent) => void;
};
