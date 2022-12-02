import transform from './deserializeMarkdown';

import type { Plugin } from 'unified';
import type { MdastNode } from './ast-types';

const toSlatePlugin: Plugin = function () {
  const compiler = (node: { children: Array<MdastNode> }) => {
    return node.children.map(c => transform(c, {}));
  };

  this.Compiler = compiler;
};

export default toSlatePlugin;
