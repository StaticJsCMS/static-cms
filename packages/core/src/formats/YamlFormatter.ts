import yaml, { isMap, isNode } from 'yaml';

import { isNotNullish } from '../lib/util/null.util';
import FileFormatter from './FileFormatter';
import { sortKeys } from './helpers';

import type { Node, Pair, YAMLMap } from 'yaml';
import type { ConfigWithDefaults } from '../interface';

function addComments(items: Array<Pair>, comments: Record<string, string>, prefix = '') {
  items.forEach(item => {
    if (isNotNullish(item.key)) {
      const itemKey = item.key?.toString() ?? '';
      const key = prefix ? `${prefix}.${itemKey}` : itemKey;
      if (isNode(item.key) && comments[key]) {
        const value = comments[key].split('\\n').join('\n ');
        item.key.commentBefore = ` ${value}`;
      }
      if (isMap(item.value)) {
        addComments(item.value.items, comments, key);
      }
    }
  });
}

class YamlFormatter extends FileFormatter {
  name = 'yaml';

  fromFile(content: string, config: ConfigWithDefaults) {
    if (content && content.trim().endsWith('---')) {
      content = content.trim().slice(0, -3);
    }
    return yaml.parse(content, {
      ...(config.yaml?.parseOptions ?? {}),
      ...(config.yaml?.documentOptions ?? {}),
      ...(config.yaml?.schemaOptions ?? {}),
      ...(config.yaml?.toJsOptions ?? {}),
    });
  }

  toFile(
    data: object,
    config: ConfigWithDefaults,
    sortedKeys: string[] = [],
    comments: Record<string, string> = {},
  ) {
    const doc = new yaml.Document({
      aliasDuplicateObjects: false,
      ...(config.yaml?.documentOptions ?? {}),
      ...(config.yaml?.schemaOptions ?? {}),
      ...(config.yaml?.parseOptions ?? {}),
      ...(config.yaml?.createNodeOptions ?? {}),
    });
    const contents = doc.createNode(data, {
      aliasDuplicateObjects: false,
      ...(config.yaml?.createNodeOptions ?? {}),
    }) as YAMLMap<Node>;

    addComments(contents.items as Pair<Node>[], comments);

    contents.items.sort(sortKeys(sortedKeys, item => item.key?.toString()));
    doc.contents = contents;

    return doc.toString(config.yaml?.toStringOptions);
  }
}

export default new YamlFormatter();
