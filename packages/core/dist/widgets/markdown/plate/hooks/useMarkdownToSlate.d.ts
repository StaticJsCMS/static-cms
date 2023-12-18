import type { ShortcodeConfig } from '../../../../interface';
import type { MdValue } from '../plateTypes';
export interface UseMarkdownToSlateOptions {
    shortcodeConfigs?: Record<string, ShortcodeConfig>;
    useMdx: boolean;
    mode: 'rich' | 'raw';
}
export declare const markdownToSlate: (markdownValue: string, { useMdx, shortcodeConfigs }: UseMarkdownToSlateOptions) => Promise<MdValue>;
declare const useMarkdownToSlate: (markdownValue: string, options: UseMarkdownToSlateOptions) => [MdValue, boolean];
export default useMarkdownToSlate;
