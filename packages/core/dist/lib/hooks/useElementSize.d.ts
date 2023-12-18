import type { Ref } from 'react';
interface Size {
    width: number;
    height: number;
}
declare function useElementSize<T extends HTMLElement = HTMLDivElement>(providedRef?: Ref<T | null>): Size;
export default useElementSize;
