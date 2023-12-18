export default function useDebouncedCallback<A extends any[], T = void>(callback: (...args: A) => T, wait: number): (...args: A) => void;
