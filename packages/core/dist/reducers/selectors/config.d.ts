import type { Config } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
export declare function selectLocale(config?: Config): string;
export declare function selectConfig(state: RootState): Config<import("@staticcms/core/interface").UnknownField> | undefined;
export declare function selectIsSearchEnabled(state: RootState): boolean;
export declare function selectDisplayUrl(state: RootState): string | undefined;
