import transform from './deserializeMarkdown';

import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { Plugin } from 'unified';
import type { MdastNode } from './ast-types';

export interface ToSlatePluginOptions {
  shortcodeConfigs: Record<string, ShortcodeConfig>;
  useMdx: boolean;
}

const toSlatePlugin = ({ shortcodeConfigs, useMdx }: ToSlatePluginOptions): Plugin =>
  function () {
    const compiler = (node: { children: Array<MdastNode> }) => {
      return node.children.map((c, index) => transform(c, { shortcodeConfigs, useMdx, index }));
    };

    this.Compiler = compiler;
  };

export default toSlatePlugin;
