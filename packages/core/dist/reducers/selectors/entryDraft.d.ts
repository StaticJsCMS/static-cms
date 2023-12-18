import type { I18nSettings } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
export declare const getEntryDataPath: (i18n: I18nSettings | undefined, isMeta: boolean | undefined) => string[];
export declare const selectFieldErrors: (path: string, i18n: I18nSettings | undefined, isMeta: boolean | undefined) => (state: RootState) => import("@staticcms/core/interface").FieldError[];
export declare const selectAllFieldErrors: (state: RootState) => import("@staticcms/core/interface").FieldsErrors;
export declare function selectEditingDraft(state: RootState): import("@staticcms/core/interface").Entry<import("@staticcms/core/interface").ObjectValue> | undefined;
export declare function selectDraftMediaFiles(state: RootState): import("@staticcms/core/interface").MediaFile[] | undefined;
