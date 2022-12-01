import yaml from 'yaml';

import { sortKeys } from './helpers';
import FileFormatter from './FileFormatter';

import type { Pair, YAMLMap, YAMLSeq } from 'yaml/types';

function addComments(items: Array<Pair>, comments: Record<string, string>, prefix = '') {
  items.forEach(item => {
    if (item.key !== undefined) {
      const itemKey = item.key.toString();
      const key = prefix ? `${prefix}.${itemKey}` : itemKey;
      if (comments[key]) {
        const value = comments[key].split('\\n').join('\n ');
        item.commentBefore = ` ${value}`;
      }
      if (Array.isArray(item.value?.items)) {
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
    const contents = yaml.createNode(data) as YAMLMap | YAMLSeq;

    addComments(contents.items, comments);

    contents.items.sort(sortKeys(sortedKeys, item => item.key?.toString()));
    const doc = new yaml.Document();
    doc.contents = contents;

    return doc.toString();
  }
}

export default new YamlFormatter();
