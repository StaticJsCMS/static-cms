import { keyToPathArray } from '../widgets/stringTemplate';

function getInViaPath<T>(object: Record<string, unknown> | unknown, path: string[]): T | undefined {
  const key = path.shift();
  if (!key) {
    return object as T;
  }

  if (!object || typeof object !== 'object' || !(key in object)) {
    return undefined;
  }

  return getInViaPath((object as Record<string, unknown>)[key], path);
}

export function getIn(object: Record<string, unknown> | object, key: undefined): undefined;
export function getIn<T>(object: Record<string, unknown> | object, key: string): T | undefined;
export function getIn<T>(object: Record<string, unknown> | object, key: string[]): T | undefined;
export function getIn<T>(
  object: Record<string, unknown> | object,
  key: undefined | string | string[],
): T | undefined {
  if (!key) {
    return undefined;
  }

  let path: string[];
  if (Array.isArray(key)) {
    path = key;
  } else {
    path = keyToPathArray(key);
  }

  if (path.length > 0) {
    return getInViaPath<T>(object, path);
  }

  return undefined;
}

function setInViaPath(
  object: Record<string, unknown> | object,
  path: string[],
  value: unknown,
): unknown | undefined {
  const key = path.shift();
  if (!key) {
    return value;
  }

  object = {
    ...object,
    [key]: setInViaPath(
      ((object as Record<string, unknown>)?.[key] ?? {}) as Record<string, unknown>,
      path,
      value,
    ),
  };

  return object;
}

export function setIn<T extends Record<string, unknown> | object>(
  object: T,
  key: string,
  value: unknown,
): T;
export function setIn<T extends Record<string, unknown> | object>(
  object: T,
  key: string[],
  value: unknown,
): T;
export function setIn<T extends Record<string, unknown> | object>(
  object: T,
  key: string | string[],
  value: unknown,
): T {
  let path: string[];
  if (Array.isArray(key)) {
    path = key;
  } else {
    path = keyToPathArray(key);
  }

  if (path.length > 0) {
    return setInViaPath(object, path, value) as T;
  }

  return object as T;
}

export function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(
  target: Record<string, unknown>,
  ...sources: Record<string, unknown>[]
): Record<string, unknown> {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
