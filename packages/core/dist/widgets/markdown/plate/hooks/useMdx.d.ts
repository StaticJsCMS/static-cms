import { VFile } from 'vfile';
export interface UseMdxState {
    file: VFile | null;
}
export default function useMdx(name: string, input: string): [UseMdxState, (value: string) => void];
