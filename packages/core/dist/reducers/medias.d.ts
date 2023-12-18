import type { MediasAction } from '../actions/media';
import type AssetProxy from '../valueObjects/AssetProxy';
export type MediasState = Record<string, {
    asset: AssetProxy | undefined;
    isLoading: boolean;
    error: Error | null;
}>;
declare const medias: (state: MediasState | undefined, action: MediasAction) => MediasState;
export default medias;
