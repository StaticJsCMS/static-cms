export default function useMemoCompare<T>(next: T, compare: (prev: T, next: T) => boolean): T;
