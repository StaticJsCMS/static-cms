/* eslint-disable no-case-declarations */
import { isEmpty, isNotEmpty } from '@staticcms/core/lib/util/string.util';

import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { BaseMdastNode, MdastNode } from './ast-types';

function cleanRegex(str: string) {
  return str
    .replace('[', '\\[')
    .replace(']', '\\]')
    .replace('(', '\\(')
    .replace(')', '\\)')
    .replace('|', '\\|');
}

function createShortcodeRegex(name: string, config: ShortcodeConfig) {
  return `${cleanRegex(config.openTag)}(${name})${cleanRegex(
    config.separator,
  )}?([\\w\\W]*?)${cleanRegex(config.closeTag)}`;
}

function processShortcodeConfigToSlate(
  name: string,
  config: ShortcodeConfig,
  nodes: BaseMdastNode[],
) {
  const output: MdastNode[] = [];

  for (const node of nodes) {
    if (node.value) {
      const regex = new RegExp(`([\\w\\W]*?)${createShortcodeRegex(name, config)}([\\w\\W]*)`, 'g');

      let matches: RegExpExecArray | null;
      let rest = node.value;
      while (isNotEmpty(rest) && (matches = regex.exec(rest)) !== null && matches.length === 5) {
        const args = matches[3].trim();
        if (isNotEmpty(matches[1])) {
          output.push({
            type: 'text',
            value: matches[1],
          });
        }

        output.push({
          type: 'shortcode',
          shortcode: name,
          args: isEmpty(args) ? [] : args.split(config.separator),
          children: [{ text: '' }],
        });

        rest = matches[4];
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

export function processShortcodeConfigsToSlate(
  configs: Record<string, ShortcodeConfig>,
  nodes: BaseMdastNode[],
) {
  let finalNodes: MdastNode[] = nodes;

  for (const shortcode in configs) {
    finalNodes = processShortcodeConfigToSlate(shortcode, configs[shortcode], finalNodes);
  }

  return finalNodes;
}

export function processShortcodeConfigToMdx(
  configs: Record<string, ShortcodeConfig>,
  markdown: string,
) {
  if (isEmpty(markdown)) {
    return '';
  }

  let output = markdown;

  for (const name in configs) {
    const config = configs[name];
    const regex = new RegExp(createShortcodeRegex(name, config), 'g');

    let matches: RegExpExecArray | null;
    while ((matches = regex.exec(markdown)) !== null && matches.length === 3) {
      const args = isEmpty(matches[2]) ? [] : matches[2]?.split(config.separator);
      const argsOutput = args?.length > 0 ? `'${args.join("', '")}'` : '';

      output = output.replace(
        matches[0],
        `<Shortcode shortcode="${matches[1]}" args={[${argsOutput}]} />`,
      );
    }
  }

  return output;
}
