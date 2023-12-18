import type { ShortcodeConfig } from '../../../../interface';
import type { MdValue } from '../plateTypes';
import type { BlockType, LeafType } from './slate/ast-types';
export interface MdLeafType extends LeafType {
    superscript?: boolean;
    subscript?: boolean;
    underline?: boolean;
    color?: string;
    backgroundColor?: string;
}
export interface MdBlockType extends Omit<BlockType, 'children'> {
    children: Array<MdBlockType | MdLeafType>;
}
export interface SerializeMarkdownOptions {
    useMdx: boolean;
    shortcodeConfigs?: Record<string, ShortcodeConfig<{}>>;
}
export default function serializeMarkdown(slateValue: MdValue, { useMdx, shortcodeConfigs }: SerializeMarkdownOptions): string;
