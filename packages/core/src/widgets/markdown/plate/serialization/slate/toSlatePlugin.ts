import transform from './deserializeMarkdown';

import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { Plugin } from 'unified';
import type { MdastNode } from './ast-types';

export interface ToSlatePluginOptions {
  shortcodeConfigs: Record<string, ShortcodeConfig>;
  useMdx: boolean;
}

export const slateCompiler =
  ({ shortcodeConfigs, useMdx }: ToSlatePluginOptions) =>
  (node: MdastNode) => {
    return (
      node.children?.map((c, index) => transform(c, { shortcodeConfigs, useMdx, index })) ?? []
    );
  };

const toSlatePlugin = (options: ToSlatePluginOptions): Plugin =>
  function () {
    this.Compiler = slateCompiler(options);
  };

export default toSlatePlugin;
