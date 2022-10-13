/* eslint-disable @typescript-eslint/no-explicit-any */
function setIn(target: any, path: (string | number)[], value: unknown): any {
  if (path.length === 0) {
    return value;
  }

  const pathSegment = path[0];
  const restOfPath = path.slice(1);

  if (Array.isArray(target)) {
    const localTarget = [...(target ?? [])];
    if (Number.isNaN(+pathSegment)) {
      return localTarget;
    }

    const index = +pathSegment;
    if (index < 0 || index >= localTarget.length) {
      return localTarget;
    }

    localTarget[index] = setIn(localTarget[index], restOfPath, value)
    return localTarget;
  }

  const localTarget = target ?? {};
  return {
    ...localTarget,
    [pathSegment]: setIn(localTarget[pathSegment], restOfPath, value),
  };
}

export function set<T>(target: T, path: string | (string | number)[], value: unknown): T;
export function set(target: any, path: string | (string | number)[], value: unknown): any {
  return setIn(
    target,
    typeof path === 'string'
      ? path.split('.').map(part => {
          if (Number.isNaN(+part)) {
            return part;
          }

          return +part;
        })
      : path,
    value,
  );
}
