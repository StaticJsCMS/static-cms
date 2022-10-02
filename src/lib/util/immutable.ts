import { List, Map } from 'immutable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isList<T>(input: any | List<T>): input is List<T> {
  return List.isList(input);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMap<T>(input: any | Map<string, T>): input is Map<string, T> {
  return Map.isMap(input);
}
