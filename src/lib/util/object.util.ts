/* eslint-disable @typescript-eslint/no-explicit-any */
function setIn(target: any, path: string[], value: unknown): any {
  if (path.length === 0) {
    return value;
  }

  const pathSegment = path[0];
  const restOfPath = path.slice(1);

  const localTarget = target ?? {};

  return {
    ...localTarget,
    [pathSegment]: setIn(localTarget[pathSegment], restOfPath, value),
  };
}

export function set<T>(target: T, path: string | string[], value: unknown): T;
export function set(target: any, path: string | string[], value: unknown): any {
  return setIn(target, typeof path === 'string' ? path.split('.') : path, value);
}
