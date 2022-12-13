import yaml, { isNode, isMap } from 'yaml';

import { sortKeys } from './helpers';
import FileFormatter from './FileFormatter';
import { isNotNullish } from '../lib/util/null.util';

import type { Pair, YAMLMap, Node } from 'yaml';

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
  fromFile(content: string) {
    if (content && content.trim().endsWith('---')) {
      content = content.trim().slice(0, -3);
    }
    return yaml.parse(content);
  }

  toFile(data: object, sortedKeys: string[] = [], comments: Record<string, string> = {}) {
    const doc = new yaml.Document();
    const contents = doc.createNode(data) as YAMLMap<Node>;

    addComments(contents.items as Pair<Node>[], comments);

    contents.items.sort(sortKeys(sortedKeys, item => item.key?.toString()));
    doc.contents = contents;

    return doc.toString();
  }
}

export default new YamlFormatter();
