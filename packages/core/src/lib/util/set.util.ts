import { setIn } from 'immutable';

export default function set<T>(object: T, path: string, value: unknown): T {
  return setIn(object, path.split('.'), value);
}
