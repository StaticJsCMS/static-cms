/* eslint-disable import/prefer-default-export */

import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { NodeTypes } from './ast-types';

import type { BaseMdastNode, MdastNode } from './ast-types';

export function autoLinkToSlate(nodes: BaseMdastNode[]) {
  const output: MdastNode[] = [];

  for (const node of nodes) {
    if (node.type === 'text' && node.value) {
      const regex =
        /([\w\W]*?)((?:http(?:s)?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_+.~#?&//=]*))([\w\W]*)/g;
      let matches: RegExpExecArray | null;
      let rest = node.value;
      while (isNotEmpty(rest) && (matches = regex.exec(rest)) !== null && matches.length === 4) {
        if (isNotEmpty(matches[1])) {
          output.push({
            type: 'text',
            value: matches[1],
          });
        }
        output.push({
          type: NodeTypes.link,
          url: matches[2],
          children: [{ text: matches[2] }],
        });
        rest = matches[3];
        regex.lastIndex = 0;
      }
      if (isNotEmpty(rest)) {
        output.push({
          type: 'text',
          value: rest,
        });
      }
      continue;
    }

    output.push(node);
  }

  return output;
}
