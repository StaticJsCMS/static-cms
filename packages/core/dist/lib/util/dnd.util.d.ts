import { PointerSensor as LibPointerSensor, MouseSensor as LibMouseSensor, KeyboardSensor as LibKeyboardSensor } from '@dnd-kit/core';
import type { MouseEvent, KeyboardEvent, PointerEvent } from 'react';
export declare class PointerSensor extends LibPointerSensor {
    static activators: {
        eventName: "onPointerDown";
        handler: ({ nativeEvent: event }: PointerEvent) => boolean;
    }[];
}
export declare class MouseSensor extends LibMouseSensor {
    static activators: {
        eventName: "onMouseDown";
        handler: ({ nativeEvent: event }: MouseEvent) => boolean;
    }[];
}
export declare class KeyboardSensor extends LibKeyboardSensor {
    static activators: {
        eventName: "onKeyDown";
        handler: ({ nativeEvent: event }: KeyboardEvent<Element>) => boolean;
    }[];
}
