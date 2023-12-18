import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { BaseMdastNode, MdastNode } from './ast-types';
export declare function processShortcodeConfigsToSlate(configs: Record<string, ShortcodeConfig>, nodes: BaseMdastNode[]): MdastNode[];
export declare function processShortcodeConfigToMdx(configs: Record<string, ShortcodeConfig>, markdown: string): string;
