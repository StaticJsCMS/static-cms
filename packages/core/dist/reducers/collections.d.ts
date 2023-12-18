import type { ConfigAction } from '../actions/config';
import type { BaseField, Collections, UnknownField } from '../interface';
export type CollectionsState<EF extends BaseField = UnknownField> = Collections<EF>;
declare function collections(state: CollectionsState<UnknownField> | undefined, action: ConfigAction): CollectionsState;
export default collections;
