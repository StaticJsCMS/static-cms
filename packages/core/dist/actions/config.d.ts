import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { BaseField, Config, LocalBackend, UnknownField } from '../interface';
import type { RootState } from '../store';
export declare function applyDefaults<EF extends BaseField = UnknownField>(originalConfig: Config<EF>): Config<EF>;
export declare function parseConfig(data: string): Config<UnknownField>;
export declare function configLoaded(config: Config): {
    readonly type: "CONFIG_SUCCESS";
    readonly payload: Config<UnknownField>;
};
export declare function configLoading(): {
    readonly type: "CONFIG_REQUEST";
};
export declare function configFailed(err: Error): {
    readonly type: "CONFIG_FAILURE";
    readonly error: "Error loading config";
    readonly payload: Error;
};
export declare function detectProxyServer(localBackend?: boolean | LocalBackend): Promise<{
    proxyUrl?: undefined;
    type?: undefined;
} | {
    proxyUrl: string;
    type: string;
}>;
export declare function handleLocalBackend(originalConfig: Config): Promise<Config<UnknownField>>;
export declare function loadConfig(manualConfig: Config | undefined, onLoad: (config: Config) => unknown): {
    readonly type: "CONFIG_SUCCESS";
    readonly payload: Config<UnknownField>;
} | ((dispatch: ThunkDispatch<RootState, {}, AnyAction>) => Promise<void>);
export type ConfigAction = ReturnType<typeof configLoading | typeof configLoaded | typeof configFailed>;
