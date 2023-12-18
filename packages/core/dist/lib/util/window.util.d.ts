import type AlertEvent from './events/AlertEvent';
import type ConfirmEvent from './events/ConfirmEvent';
import type DataUpdateEvent from './events/DataEvent';
import type LivePreviewLoadedEvent from './events/LivePreviewLoadedEvent';
import type MediaLibraryCloseEvent from './events/MediaLibraryCloseEvent';
interface EventMap {
    alert: AlertEvent;
    confirm: ConfirmEvent;
    mediaLibraryClose: MediaLibraryCloseEvent;
    'data:update': DataUpdateEvent;
    livePreviewLoaded: LivePreviewLoadedEvent;
}
export declare function useWindowEvent<K extends keyof WindowEventMap>(eventName: K, callback: (event: WindowEventMap[K]) => void): void;
export declare function useWindowEvent<K extends keyof EventMap>(eventName: K, callback: (event: EventMap[K]) => void): void;
export {};
