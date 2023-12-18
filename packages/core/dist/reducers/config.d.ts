import type { ConfigAction } from '../actions/config';
import type { BaseField, Config, UnknownField } from '../interface';
export interface ConfigState<EF extends BaseField = UnknownField> {
    config?: Config<EF>;
    isFetching: boolean;
    error?: string;
}
declare const config: (state: ConfigState<UnknownField> | undefined, action: ConfigAction) => ConfigState<UnknownField>;
export default config;
