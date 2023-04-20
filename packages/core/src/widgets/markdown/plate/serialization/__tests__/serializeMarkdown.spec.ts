import {
  runSerializationTests,
  testShortcodeConfigs as shortcodeConfigs,
} from '../../tests-util/serializationTests.util';
import serializeMarkdown from '../serializeMarkdown';

import type { MdValue } from '../../plateTypes';

function expectMarkdown(nodes: MdValue, options: { useMdx: boolean }, markdown: string) {
  const result = serializeMarkdown(nodes, { ...options, shortcodeConfigs });
  expect(result).toBe(`${markdown}\n`);
}

describe('serializeMarkdown', () => {
  runSerializationTests((key, mode, data) => {
    it(`serializes ${key}`, async () => {
      await expectMarkdown(data.slate, { useMdx: mode === 'mdx' }, data.markdown);
    });
  });
});
