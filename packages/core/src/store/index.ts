import { configureStore } from '@reduxjs/toolkit';

import createRootReducer from '../reducers/combinedReducer';
import { waitUntilAction } from './middleware/waitUntilAction';

import type { BaseField, UnknownField } from '../interface';
import type { CollectionsState } from '../reducers/collections';
import type { ConfigState } from '../reducers/config';

const store = configureStore({
  reducer: createRootReducer(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(waitUntilAction),
});

export { store };
export type RootState<EF extends BaseField = UnknownField> = Omit<
  ReturnType<typeof store.getState>,
  'collection' | 'config'
> & {
  collection: CollectionsState<EF>;
  config: ConfigState<EF>;
};
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
