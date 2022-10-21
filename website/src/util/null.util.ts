export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== undefined && value !== null;
}

export function isNullish<T>(value: T | null | undefined): value is null | undefined {
  return value === undefined || value === null;
}

export function filterNullish<T>(value: (T | null | undefined)[] | null | undefined): T[] {
  return value?.filter<T>(isNotNullish) ?? [];
}
