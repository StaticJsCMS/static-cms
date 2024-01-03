import { CONFIG_SUCCESS } from '../constants';

import type { ConfigAction } from '../actions/config';
import type {
  BaseField,
  CollectionWithDefaults,
  CollectionsWithDefaults,
  UnknownField,
} from '../interface';

export type CollectionsState<EF extends BaseField = UnknownField> = CollectionsWithDefaults<EF>;

const defaultState: CollectionsState = {};

function collections(
  state: CollectionsState = defaultState,
  action: ConfigAction,
): CollectionsState {
  switch (action.type) {
    case CONFIG_SUCCESS: {
      const collections = action.payload.config.collections;
      return collections.reduce(
        (acc, collection) => {
          acc[collection.name] = collection as CollectionWithDefaults;
          return acc;
        },
        {} as Record<string, CollectionWithDefaults>,
      );
    }
    default:
      return state;
  }
}

export default collections;
